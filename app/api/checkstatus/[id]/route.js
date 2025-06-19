// app/api/checkstatus/[id]/route.js
// Fixed version with multi-endpoint support for BFL regional servers

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function GET(request, { params }) {
  const { id } = params;

  console.log(`🔍 REAL STATUS CHECK for: ${id}`);

  try {
    // Handle test IDs (for testing)
    if (id.startsWith('test-')) {
      console.log('🧪 Checking TEST status...');
      
      return Response.json({
        id: id,
        status: 'Ready',
        output: {
          sample: "https://picsum.photos/512/512?random=1"
        },
        service: 'test',
        completed: true,
        raw_result: {
          id: id,
          status: 'Ready',
          result: {
            sample: "https://picsum.photos/512/512?random=1"
          }
        }
      });
    }

    // Check if this looks like a valid BFL UUID
    const bflIdPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    
    if (!bflIdPattern.test(id)) {
      console.log(`❌ Invalid ID format: ${id}`);
      return Response.json({
        id: id,
        status: 'Error',
        error: `Invalid ID format: ${id}`,
        service: 'unknown',
        completed: false
      });
    }

    // Check BFL status using multiple regional endpoints
    console.log('🌲 Checking BFL status with multi-endpoint support...');
    
    // Try different regional endpoints in order of preference
    const endpoints = [
      `https://api.us1.bfl.ai/v1/get_result?id=${id}`,
      `https://api.eu1.bfl.ai/v1/get_result?id=${id}`, 
      `https://api.bfl.ai/v1/get_result?id=${id}`,
      `https://api.asia1.bfl.ai/v1/get_result?id=${id}`
    ];

    let bflResponse;
    let result;
    let lastError;
    let workingEndpoint;

    for (const endpoint of endpoints) {
      try {
        console.log(`🌍 Trying endpoint: ${endpoint}`);
        
        bflResponse = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'X-Key': process.env.BFL_API_KEY
          },
          timeout: 10000 // 10 second timeout
        });
        
        console.log(`📡 Response status for ${endpoint}:`, bflResponse.status);
        
        if (bflResponse.ok) {
          result = await bflResponse.json();
          workingEndpoint = endpoint;
          console.log(`✅ Found working endpoint: ${endpoint}`);
          console.log(`📊 BFL Raw Response:`, result);
          break;
        } else {
          const errorText = await bflResponse.text();
          console.log(`❌ Endpoint ${endpoint} failed:`, bflResponse.status, errorText);
          lastError = `${endpoint}: ${bflResponse.status} - ${errorText}`;
          
          // If we get 404 "Task not found", try next endpoint
          if (bflResponse.status === 404) {
            continue;
          }
        }
      } catch (error) {
        console.log(`❌ Endpoint ${endpoint} error:`, error.message);
        lastError = `${endpoint}: ${error.message}`;
        continue;
      }
    }

    // If no endpoint worked
    if (!result || !workingEndpoint) {
      console.log('❌ All BFL endpoints failed:', lastError);
      
      return Response.json({
        id: id,
        status: 'Error',
        error: `All BFL endpoints failed. Last error: ${lastError}`,
        service: 'bfl',
        completed: false,
        debug: {
          tried_endpoints: endpoints,
          last_error: lastError
        }
      });
    }

    // Map BFL response to our format
    const mappedResponse = {
      id: id,
      status: result.status || 'Pending',
      output: result.result ? {
        sample: result.result.sample,
        prompt: result.result.prompt,
        seed: result.result.seed,
        start_time: result.result.start_time,
        end_time: result.result.end_time,
        duration: result.result.duration
      } : null,
      service: 'bfl',
      completed: result.status === 'Ready',
      working_endpoint: workingEndpoint,
      raw_result: result
    };

    console.log('📋 Mapped Response:', mappedResponse);

    // Log completion status
    if (result.status === 'Ready') {
      console.log('✅ BFL IMAGE IS READY! Status:', result.status);
      if (result.result?.sample) {
        console.log('🖼️ Image URL found:', result.result.sample);
      }
    } else if (result.status === 'Error') {
      console.log('❌ BFL IMAGE FAILED! Status:', result.status);
      if (result.details) {
        console.log('❌ Error details:', result.details);
      }
    } else {
      console.log('⏳ BFL still processing... Status:', result.status, 'Progress:', result.progress);
    }

    return Response.json(mappedResponse);

  } catch (error) {
    console.error('❌ Status check error:', error);
    
    return Response.json({
      id: id,
      status: 'Error',
      error: `Status check failed: ${error.message}`,
      service: 'bfl',
      completed: false,
      debug: {
        error_stack: error.stack
      }
    });
  }
}