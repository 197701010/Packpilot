if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function GET(request, { params }) {
  console.log('✅ BRAND NEW STATUS ROUTE WORKS!');
  const { id } = params;
  
  if (id.includes('-') && id.length === 36) {
    try {
      const response = await fetch(`https://api.bfl.ml/v1/get_result?id=${id}`, {
        headers: { 'X-Key': process.env.BFL_API_KEY }
      });
      
      const result = await response.json();
      
      return Response.json({
        id: id,
        status: result.status || 'processing',
        output: result.result,
        service: 'bfl',
        completed: !!result.result,
        raw_result: result
      });
      
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }
  }
  
  return Response.json({ error: 'Unknown ID format' }, { status: 400 });
}