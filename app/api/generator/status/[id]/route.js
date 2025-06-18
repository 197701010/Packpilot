// app/api/status/[id]/route.js
// Complete status route met Replicate API

// Expliciet .env.local laden
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function GET(request, { params }) {
  try {
    const { id } = params;
    
    console.log('🔍 Status route called for ID:', id);
    console.log('🔧 Environment check - REPLICATE_API_TOKEN present:', !!process.env.REPLICATE_API_TOKEN);
    
    if (!id) {
      return Response.json(
        { error: 'ID parameter is required' },
        { status: 400 }
      );
    }
    
    // Bepaal service type op basis van ID format
    if (id.includes('-') && id.length === 36) {
      console.log('🌲 Using BFL API for ID:', id);
      return await checkBFLStatus(id);
    } else {
      console.log('🎯 Using Replicate API for ID:', id);
      return await checkReplicateStatus(id);
    }
    
  } catch (error) {
    console.error('❌ Status route error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

async function checkReplicateStatus(id) {
  try {
    console.log('📤 Fetching Replicate status for:', id);
    
    const response = await fetch(`https://api.replicate.com/v1/predictions/${id}`, {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('📥 Replicate status response:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Replicate status error:', errorText);
      return Response.json(
        { error: `Replicate API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('✅ Replicate status result:', {
      id: result.id,
      status: result.status,
      hasOutput: !!result.output,
      outputType: Array.isArray(result.output) ? 'array' : typeof result.output
    });
    
    return Response.json({
      id: result.id,
      status: result.status,
      output: result.output,
      error: result.error,
      logs: result.logs,
      metrics: result.metrics,
      service: 'replicate',
      completed: result.status === 'succeeded' || result.status === 'failed',
      urls: result.urls || {},
      created_at: result.created_at,
      completed_at: result.completed_at
    });
    
  } catch (error) {
    console.error('❌ Replicate status check failed:', error);
    return Response.json(
      { error: 'Failed to check Replicate status', details: error.message },
      { status: 500 }
    );
  }
}

async function checkBFLStatus(id) {
  try {
    console.log('📤 Fetching BFL status for:', id);
    
    const response = await fetch(`https://api.bfl.ml/v1/get_result?id=${id}`, {
      headers: {
        'X-Key': process.env.BFL_API_KEY
      }
    });

    console.log('📥 BFL status response:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ BFL status error:', errorText);
      return Response.json(
        { error: `BFL API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const result = await response.json();
    console.log('✅ BFL status result:', {
      id: id,
      hasResult: !!result.result,
      status: result.status
    });
    
    const isCompleted = !!result.result || result.status === 'ready';
    
    return Response.json({
      id: id,
      status: result.status || (isCompleted ? 'completed' : 'processing'),
      output: result.result,
      service: 'bfl',
      completed: isCompleted,
      error: result.error
    });
    
  } catch (error) {
    console.error('❌ BFL status check failed:', error);
    return Response.json(
      { error: 'Failed to check BFL status', details: error.message },
      { status: 500 }
    );
  }
}