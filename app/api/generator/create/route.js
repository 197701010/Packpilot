// app/api/generator/create/route.js
// Updated versie die de AI service keuze respecteert

// Expliciet .env.local laden voor development
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Debug logging
    console.log('🔧 API Route Environment Check:');
    console.log('REPLICATE_API_TOKEN present:', !!process.env.REPLICATE_API_TOKEN);
    console.log('BFL_API_KEY present:', !!process.env.BFL_API_KEY);
    console.log('Request body:', body);
    console.log('🎯 Selected AI Service:', body.aiService);
    
    // Kies welke AI service te gebruiken op basis van frontend keuze
    // MET DEZE (om altijd Flux te gebruiken):
const useReplicate = false; // Altijd Flux gebruiken
    
    if (useReplicate) {
      console.log('🎯 Using Replicate API...');
      
      // Voor meerdere images, maak meerdere requests
      const imageCount = body.imageCount || 1;
      const promises = [];
      
      for (let i = 0; i < imageCount; i++) {
        promises.push(handleSingleReplicateRequest(body, i));
      }
      
      const results = await Promise.all(promises);
      
      return Response.json({
        success: true,
        service: 'replicate',
        requests: results,
        total_images: imageCount,
        aiService: body.aiService
      });
      
    } else {
      console.log('🌲 Using Black Forest Labs API...');
      return await handleBFLRequest(body);
    }
    
  } catch (error) {
    console.error('❌ API Error:', error);
    return Response.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}

async function handleSingleReplicateRequest(body, index = 0) {
  // Bouw de prompt op uit alle data
  let fullPrompt = "A professional, photorealistic packaging design.";
  
  if (body.packagingType) {
    fullPrompt += ` Packaging type: ${body.packagingType}.`;
  }
  
  if (body.companyName) {
    fullPrompt += ` Brand name: "${body.companyName}".`;
  }
  
  if (body.slogan) {
    fullPrompt += ` Slogan: "${body.slogan}".`;
  }
  
  if (body.styles && body.styles.length > 0) {
    fullPrompt += ` Style: ${body.styles.join(', ')}.`;
  }
  
  if (body.colors && body.colors.length > 0) {
    fullPrompt += ` Main colors: ${body.colors.join(', ')}.`;
  }
  
  if (body.packagingLook) {
    fullPrompt += ` Design details: "${body.packagingLook}".`;
  }
  
  if (body.prompt) {
    fullPrompt += ` Additional: ${body.prompt}.`;
  }
  
  fullPrompt += " High quality, studio lighting, 8k, product photography.";

  const requestBody = {
    version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // Werkende versie
    input: {
      prompt: fullPrompt,
      width: body.width || 1024,
      height: body.height || 1024,
      num_inference_steps: body.steps || 30,
      guidance_scale: body.guidance || 7.5,
      negative_prompt: body.negative_prompt || "blurry, low quality, distorted, text, watermark, ugly, deformed",
      seed: Math.floor(Math.random() * 1000000) + index // Verschillende seed per image
    }
  };

  console.log(`📤 Sending request ${index + 1} to Replicate:`, JSON.stringify(requestBody, null, 2));

  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  });

  console.log(`📥 Replicate response ${index + 1} status:`, response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`❌ Replicate API error ${index + 1}:`, errorText);
    throw new Error(`Replicate API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log(`✅ Replicate success ${index + 1}:`, { id: result.id, status: result.status });

  return {
    id: result.id,
    status: result.status,
    urls: result.urls || {},
    created_at: result.created_at,
    index: index,
    service: 'replicate'
  };
}

async function handleBFLRequest(body) {
  // Voor BFL kunnen we maar 1 image per keer genereren
  
  // Bouw de prompt op (zelfde logica als Replicate)
  let fullPrompt = "A professional, photorealistic packaging design.";
  
  if (body.packagingType) {
    fullPrompt += ` Packaging type: ${body.packagingType}.`;
  }
  
  if (body.companyName) {
    fullPrompt += ` Brand name: "${body.companyName}".`;
  }
  
  if (body.slogan) {
    fullPrompt += ` Slogan: "${body.slogan}".`;
  }
  
  if (body.styles && body.styles.length > 0) {
    fullPrompt += ` Style: ${body.styles.join(', ')}.`;
  }
  
  if (body.colors && body.colors.length > 0) {
    fullPrompt += ` Main colors: ${body.colors.join(', ')}.`;
  }
  
  if (body.packagingLook) {
    fullPrompt += ` Design details: "${body.packagingLook}".`;
  }
  
  if (body.prompt) {
    fullPrompt += ` Additional: ${body.prompt}.`;
  }
  
  fullPrompt += " High quality, studio lighting, 8k, product photography.";

  const requestBody = {
    prompt: fullPrompt,
    width: body.width || 1024,
    height: body.height || 1024,
    steps: body.steps || 30
  };

  console.log('📤 Sending request to BFL:', JSON.stringify(requestBody, null, 2));

  const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Key': process.env.BFL_API_KEY
    },
    body: JSON.stringify(requestBody)
  });

  console.log('📥 BFL response status:', response.status);

  if (!response.ok) {
    const errorText = await response.text();
    console.error('❌ BFL API error:', errorText);
    throw new Error(`BFL API error: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  console.log('✅ BFL success:', { id: result.id });

  return Response.json({
    success: true,
    id: result.id,
    polling_url: result.polling_url,
    service: 'bfl',
    aiService: body.aiService
  });
}