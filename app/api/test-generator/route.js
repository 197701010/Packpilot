// app/api/test-generator/route.js
// Mock generator that returns a working image immediately

export async function POST(request) {
  const body = await request.json();
  
  // Generate a fake ID
  const testId = 'test-' + Date.now();
  
  console.log('🧪 TEST GENERATOR - Creating mock result for:', testId);
  
  // Return immediate success with the old working image
  return Response.json({
    success: true,
    id: testId,
    redirect_url: `/generator/results/${testId}`,
    service: 'test',
    aiService: 'test'
  });
}