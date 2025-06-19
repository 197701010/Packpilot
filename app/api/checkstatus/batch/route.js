// app/api/checkstatus/batch/route.js
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function POST(request) {
  try {
    const { ids } = await request.json();
    console.log('🔍 Checking batch status for IDs:', ids);

    if (!ids || !Array.isArray(ids)) {
      return Response.json({ error: 'Invalid IDs array' }, { status: 400 });
    }

    const statusPromises = ids.map(async (id, index) => {
      try {
        if (id.includes('-') && id.length === 36) {
          const response = await fetch(`https://api.bfl.ml/v1/get_result?id=${id}`, {
            headers: { 'X-Key': process.env.BFL_API_KEY }
          });

          if (!response.ok) {
            return {
              id: id,
              index: index + 1,
              error: `BFL API error: ${response.status}`,
              service: 'bfl'
            };
          }

          const result = await response.json();
          return {
            id: id,
            index: index + 1,
            status: result.status || 'processing',
            output: result.result,
            service: 'bfl',
            completed: !!result.result,
            progress: result.status === 'Ready' ? 100 : 50
          };
        }
      } catch (error) {
        return {
          id: id,
          index: index + 1,
          error: error.message,
          service: 'unknown'
        };
      }
    });

    const results = await Promise.all(statusPromises);
    const completedCount = results.filter(r => r.completed).length;
    const totalCount = results.length;
    const overallProgress = Math.round((completedCount / totalCount) * 100);

    console.log(`📊 Batch status: ${completedCount}/${totalCount} completed (${overallProgress}%)`);

    return Response.json({
      batch: true,
      total_images: totalCount,
      completed_images: completedCount,
      progress: overallProgress,
      all_completed: completedCount === totalCount,
      results: results,
      service: 'bfl'
    });

  } catch (error) {
    console.error('❌ Batch status check error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}