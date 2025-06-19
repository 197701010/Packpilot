// app/api/image-proxy/route.js
// Fixed proxy that properly handles BFL URLs

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const imageUrl = searchParams.get('url');
    
    console.log('🔍 Image proxy called with URL:', imageUrl);
    
    if (!imageUrl) {
      console.log('❌ No URL provided');
      return new Response('No URL provided', { status: 400 });
    }

    // Don't decode the URL - use it exactly as provided
    console.log('🖼️ Fetching image from URL (no decoding)');
    
    const response = await fetch(imageUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/*,*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    console.log('📡 Response status:', response.status);
    console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      console.log('❌ Failed to fetch image:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('❌ Error response:', errorText);
      return new Response(`Failed to fetch image: ${response.status}`, { status: response.status });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageBuffer = await response.arrayBuffer();
    
    console.log('✅ Image fetched successfully, size:', imageBuffer.byteLength, 'bytes');
    console.log('📋 Content-Type:', contentType);

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (error) {
    console.error('❌ Image proxy error:', error);
    return new Response(`Proxy error: ${error.message}`, { status: 500 });
  }
}