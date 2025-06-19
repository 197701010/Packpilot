// app/api/generator/create/route.js
// Optimized with intelligent prompt enhancer for better AI results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env.local' });
}

// Intelligent Prompt Enhancer for better AI results
function enhancePrompt(basePrompt, customDetails = '', companyName = '', slogan = '') {
  const enhancements = {
    // Religious/Symbol mappings
    'kruis': 'prominent cross symbol centrally placed, embossed cross design, religious branding element, sacred geometry',
    'gouden kruis': 'golden cross symbol prominently displayed on front center, embossed metallic gold cross detail, luxury religious packaging, divine golden finish',
    'zilveren kruis': 'silver cross symbol, metallic silver cross detail, elegant religious branding, chrome cross element',
    'logo': 'brand logo prominently displayed, clear brand identity, professional logo placement, corporate branding',
    'ster': 'star symbol prominently featured, decorative star element, stellar design motif, celestial branding',
    'hart': 'heart shape design element, love symbol, romantic packaging theme, affectionate branding',
    'diamant': 'diamond shape element, premium gem-like design, luxury crystalline motif',
    'vleugels': 'wing design elements, angelic motifs, freedom symbolism, elevated branding',
    
    // Style enhancements
    'luxe': 'premium luxury design, high-end materials, sophisticated aesthetic, elegant finish, upscale presentation',
    'vintage': 'retro design elements, aged appearance, classic typography, nostalgic feel, timeless aesthetic',
    'modern': 'contemporary clean design, minimalist approach, sleek lines, current trends, cutting-edge style',
    'bold': 'strong visual impact, vibrant colors, dramatic design elements, eye-catching, powerful presence',
    'elegant': 'refined sophistication, graceful design, tasteful aesthetics, classy presentation',
    'playful': 'fun design elements, cheerful colors, whimsical details, joyful aesthetic, entertaining design',
    'minimalistisch': 'clean simple design, white space, minimal elements, uncluttered, zen-like simplicity',
    'industrieel': 'raw materials, metal textures, utilitarian design, urban aesthetic, factory-inspired',
    'organic': 'natural elements, earth tones, botanical motifs, eco-friendly design, sustainable aesthetics',
    'professional': 'business-appropriate, corporate design, clean presentation, trustworthy appearance',
    
    // Material/Finish suggestions
    'goud': 'golden metallic finish, gold foil details, luxurious gold accents, shimmering gold elements',
    'zilver': 'silver metallic elements, chrome finish, sleek metallic design, polished silver details',
    'brons': 'bronze metallic finish, antique bronze details, warm metallic accents',
    'mat': 'matte finish, non-reflective surface, sophisticated texture, smooth matte coating',
    'glanzend': 'glossy finish, high-shine surface, reflective coating, mirror-like gleam',
    'transparant': 'clear transparent elements, see-through design, crystal-like clarity',
    'parelmoer': 'iridescent pearl finish, shimmering surface, mother-of-pearl effect',
    
    // Texture enhancements
    'fluweel': 'velvet texture, soft luxurious feel, plush surface treatment',
    'leder': 'leather texture, premium leather finish, sophisticated material',
    'hout': 'wood grain texture, natural wood elements, organic material feel',
    'steen': 'stone texture, marble effect, natural rock surface',
    
    // Color intensity
    'fel': 'bright vibrant colors, intense saturation, bold color palette',
    'pastel': 'soft pastel colors, gentle hues, subtle color palette',
    'donker': 'deep dark colors, rich shadows, moody color scheme',
    'licht': 'light bright colors, airy feel, illuminated design',
    
    // Special effects
    'glitter': 'sparkling glitter effect, shimmering particles, magical sparkle',
    'hologram': 'holographic effect, rainbow iridescence, futuristic finish',
    'neon': 'neon glow effect, electric colors, luminous design',
    'gradient': 'smooth color transitions, gradient effects, flowing color blend'
  };

  let enhancedPrompt = basePrompt;
  
  // Combine all text to search for keywords
  const allText = `${customDetails} ${companyName} ${slogan}`.toLowerCase();
  
  // Apply enhancements based on detected keywords
  Object.keys(enhancements).forEach(keyword => {
    if (allText.includes(keyword)) {
      enhancedPrompt += `, ${enhancements[keyword]}`;
      console.log(`🎨 Enhanced for keyword "${keyword}": ${enhancements[keyword]}`);
    }
  });
  
  // Add company name if provided
  if (companyName.trim()) {
    enhancedPrompt += `, featuring "${companyName}" brand name, corporate identity for ${companyName}`;
  }
  
  // Add slogan if provided
  if (slogan.trim()) {
    enhancedPrompt += `, with tagline "${slogan}", marketing message integration`;
  }
  
  // Add general quality boosters
  enhancedPrompt += ', photorealistic rendering, professional product photography, studio lighting, high detail, 8K quality, commercial packaging design, market-ready presentation, shelf-appeal design';
  
  // Add negative prompts to avoid common issues
  enhancedPrompt += '. Avoid: blurry details, distorted text, unclear symbols, poor lighting, amateur design, low resolution, pixelated elements';
  
  console.log('🚀 Original prompt:', basePrompt);
  console.log('✨ Enhanced prompt:', enhancedPrompt);
  
  return enhancedPrompt;
}

export async function POST(request) {
  try {
    console.log('🔧 API Route Environment Check:');
    console.log('REPLICATE_API_TOKEN present:', !!process.env.REPLICATE_API_TOKEN);
    console.log('BFL_API_KEY present:', !!process.env.BFL_API_KEY);

    const body = await request.json();
    console.log('Request body:', body);

    const {
      packagingType,
      companyName,
      slogan,
      logoFile,
      colors,
      prompt: customPrompt,
      packagingLook,
      styles,
      imageCount = 1,
      aiService = 'bfl'
    } = body;

    console.log('🎯 Selected AI Service:', aiService);
    console.log('📊 Image Count:', imageCount);

    // Limit max images to 3 for better performance
    const maxImages = Math.min(imageCount, 3);
    if (imageCount > 3) {
      console.log(`⚠️ Limiting ${imageCount} images to 3 for optimal performance`);
    }

    if (aiService === 'bfl') {
      return handleBFLRequest(body, maxImages);
    } else if (aiService === 'replicate') {
      return handleReplicateRequest(body, maxImages);
    } else {
      throw new Error(`Unsupported AI service: ${aiService}`);
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    return Response.json({
      success: false,
      error: error.message
    }, { status: 500 });
  }
}

async function handleBFLRequest(cleanData, imageCount) {
  console.log('🌲 Using Black Forest Labs API...');
  
  const {
    packagingType,
    companyName,
    slogan,
    colors,
    prompt: customPrompt,
    styles
  } = cleanData;

  console.log(`🎯 Generating ${imageCount} images with BFL...`);

  const results = [];
  const promises = [];

  for (let i = 0; i < imageCount; i++) {
    // Create variation prompts for different perspectives
    const variations = [
      'Creative variation 1, front-facing perspective',
      'Front view perspective, centered composition', 
      'Angled product shot, three-quarter view',
      'Side perspective with depth',
      'Top-down view composition'
    ];
    
    // Build base prompt
    const basePrompt = customPrompt || 
      `Een professioneel, fotorealistisch verpakkingsontwerp. Type: ${packagingType}. Stijl: ${styles?.join(', ')}. Hoofdkleuren: ${colors?.join(', ')}. Hoge kwaliteit, studioverlichting, 8k, productfotografie. ${variations[i] || `variatie ${i + 1}`}.`;

    // Enhance the prompt with intelligent keywords
    const enhancedPrompt = enhancePrompt(
      basePrompt, 
      customPrompt || '', 
      companyName || '', 
      slogan || ''
    );

    const requestData = {
      prompt: enhancedPrompt,
      width: 1024,
      height: 1024,
      steps: 4,  // Reduced from 30 for speed (flux-schnell optimization)
      seed: Math.floor(Math.random() * 1000000)
    };

    console.log(`📤 Sending BFL request ${i + 1}/${imageCount}:`);
    console.log(`🎨 Enhanced prompt: ${enhancedPrompt.substring(0, 150)}...`);

    // Try different BFL models in order of preference
    const bflModels = [
      'https://api.bfl.ai/v1/flux-pro-1.1',     // Original working model
      'https://api.bfl.ai/v1/flux-schnell',     // Fast model
      'https://api.bfl.ai/v1/flux-dev',         // Dev model
      'https://api.bfl.ai/v1/flux-pro'          // Alternative pro model
    ];

    let workingModel = null;
    let modelResponse = null;

    // Try each model until one works
    for (const modelUrl of bflModels) {
      console.log(`🧪 Testing BFL model: ${modelUrl}`);
      
      try {
        const testResponse = await fetch(modelUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Key': process.env.BFL_API_KEY
          },
          body: JSON.stringify(requestData)
        });

        console.log(`📊 Model ${modelUrl} response status:`, testResponse.status);

        if (testResponse.ok) {
          modelResponse = await testResponse.json();
          workingModel = modelUrl;
          console.log(`✅ Found working model: ${modelUrl}`);
          break;
        } else {
          const errorText = await testResponse.text();
          console.log(`❌ Model ${modelUrl} failed:`, testResponse.status, errorText);
        }
      } catch (error) {
        console.log(`❌ Model ${modelUrl} error:`, error.message);
        continue;
      }
    }

    if (!workingModel || !modelResponse) {
      console.log('❌ All BFL models failed for request', i + 1);
      results.push({
        error: `All BFL models failed`,
        id: null
      });
      continue;
    }

    console.log(`✅ BFL success ${i + 1} with model ${workingModel}:`, modelResponse);
    results.push(modelResponse);
  }

  // Execute requests sequentially to test each model
  try {
    for (let i = 0; i < imageCount; i++) {
      // Create variation prompts for different perspectives
      const variations = [
        'Creative variation 1, front-facing perspective',
        'Front view perspective, centered composition', 
        'Angled product shot, three-quarter view',
        'Side perspective with depth',
        'Top-down view composition'
      ];
      
      // Build more specific base prompt
      const packagingDescriptions = {
        'Pot': 'cylindrical jar container, wide opening, lid or cap',
        'Fles': 'bottle container, narrow neck, bottle shape',
        'Doos': 'rectangular box, cardboard packaging, box container',
        'Blik': 'metal can, aluminum container, cylindrical can',
        'Tube': 'tube container, squeeze tube, elongated cylinder',
        'Zakje': 'pouch packaging, flexible bag, soft container',
        'Karton': 'cardboard carton, rectangular carton box',
        'Wrapper': 'wrapper packaging, product wrap, flexible covering'
      };

      const colorDescriptions = {
        'Rood': 'bright red color, red dominant color scheme',
        'Blauw': 'blue color scheme, blue as primary color',
        'Groen': 'green coloring, natural green tones',
        'Geel': 'yellow color palette, bright yellow design',
        'Oranje': 'orange color scheme, vibrant orange design',
        'Paars': 'purple coloring, violet color palette',
        'Roze': 'pink color design, rose colored packaging',
        'Zwart': 'black design, dark color scheme',
        'Wit': 'white design, clean white packaging',
        'Grijs': 'grey color scheme, neutral grey design'
      };

      const specificPackaging = packagingDescriptions[packagingType] || packagingType.toLowerCase();
      const specificColors = colors?.map(color => colorDescriptions[color] || color).join(', ');

      const basePrompt = customPrompt || 
        `Professional product photography of a ${specificPackaging} packaging design. Style: ${styles?.join(', ')}. Color scheme: ${specificColors}. Clean studio lighting, white background, commercial product shot, realistic packaging, ${variations[i] || `variation ${i + 1}`}.`;

      // Enhance the prompt with intelligent keywords
      const enhancedPrompt = enhancePrompt(
        basePrompt, 
        customPrompt || '', 
        companyName || '', 
        slogan || ''
      );

      const requestData = {
        prompt: enhancedPrompt,
        width: 1024,
        height: 1024,
        steps: 4,  // Fast generation
        seed: Math.floor(Math.random() * 1000000)
      };

      console.log(`📤 Sending BFL request ${i + 1}/${imageCount}:`);
      console.log(`🎨 Enhanced prompt: ${enhancedPrompt.substring(0, 150)}...`);

    }

    console.log(`🎉 Batch completed: ${results.filter(r => r.id).length}/${imageCount} successful`);

    // Filter successful results
    const successfulResults = results.filter(result => result.id);
    
    if (successfulResults.length === 0) {
      throw new Error('All BFL requests failed');
    }

    // For multiple successful images, create batch URL
    if (successfulResults.length > 1) {
      const batchIds = successfulResults.map(r => r.id).join(',');
      return Response.json({
        success: true,
        batch: true,
        total_images: successfulResults.length,
        service: 'bfl',
        redirect_url: `/generator/results/${successfulResults[0].id}?batch=${batchIds}&total=${successfulResults.length}`,
        requests: successfulResults,
        aiService: 'bfl'
      });
    }

    // For single image
    return Response.json({
      success: true,
      id: successfulResults[0].id,
      polling_url: successfulResults[0].polling_url,
      service: 'bfl',
      redirect_url: `/generator/results/${successfulResults[0].id}`,
      aiService: 'bfl'
    });

  } catch (error) {
    console.error('❌ BFL batch error:', error);
    throw new Error(`BFL request failed: ${error.message}`);
  }
}

async function handleReplicateRequest(cleanData, imageCount) {
  console.log('🔄 Using Replicate API...');
  
  const {
    packagingType,
    companyName,
    slogan,
    colors,
    prompt: customPrompt,
    styles
  } = cleanData;

  const basePrompt = customPrompt || 
    `Een professioneel, fotorealistisch verpakkingsontwerp. Type: ${packagingType}. Stijl: ${styles?.join(', ')}. Hoofdkleuren: ${colors?.join(', ')}. Hoge kwaliteit, studioverlichting, 8k, productfotografie.`;

  // Enhance prompt for Replicate too
  const enhancedPrompt = enhancePrompt(
    basePrompt, 
    customPrompt || '', 
    companyName || '', 
    slogan || ''
  );

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4",
        input: {
          width: 1024,
          height: 1024,
          prompt: enhancedPrompt,
          guidance: 3.5,
          num_outputs: Math.min(imageCount, 4),
          aspect_ratio: "1:1",
          output_format: "webp",
          output_quality: 90,
          num_inference_steps: 28
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Replicate API error: ${response.status} - ${errorData}`);
    }

    const prediction = await response.json();
    console.log('✅ Replicate prediction created:', prediction.id);

    return Response.json({
      success: true,
      id: prediction.id,
      polling_url: prediction.urls?.get,
      service: 'replicate',
      redirect_url: `/generator/results/${prediction.id}`,
      aiService: 'replicate'
    });

  } catch (error) {
    console.error('❌ Replicate error:', error);
    throw new Error(`Replicate request failed: ${error.message}`);
  }
}