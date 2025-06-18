// app/api/image-proxy/route.js
// Proxy to display BFL images that are protected against direct access

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    console.log('🔍 Image proxy called with URL:', imageUrl);
    
    if (!imageUrl) {
      console.log('❌ No URL parameter provided');
      return new Response('Missing URL parameter', { status: 400 });
    }
    
    // DON'T decode the URL - keep it exactly as received to preserve signature
    console.log('🖼️ Attempting to fetch image from original URL (preserving signature)');
    
    // Try fetching the original URL without any modifications
    let response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*'
      },
      method: 'GET'
    });
    
    console.log('📡 Response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Failed to fetch image:', response.status, response.statusText);
      const errorText = await response.text();
      console.error('📄 Error response body:', errorText);
      return new Response(`Failed to fetch image: ${response.status} - ${errorText}`, { status: response.status });
    }
    
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/jpeg';
    
    console.log('✅ Image fetched successfully, size:', imageBuffer.byteLength, 'bytes');
    
    return new Response(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    console.error('❌ Image proxy error:', error.message);
    return new Response(`Image proxy error: ${error.message}`, { status: 500 });
  }
}