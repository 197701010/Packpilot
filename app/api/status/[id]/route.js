// app/api/status/[id]/route.js
export async function GET(request, { params }) {
  console.log('🔍 Status route called!');
  console.log('ID parameter:', params.id);
  
  return Response.json({
    message: "Status route works!",
    id: params.id,
    timestamp: new Date().toISOString()
  });
}