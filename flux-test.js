// flux-test.js - Direct test van Black Forest Labs API
// Run: node flux-test.js

require('dotenv').config({ path: '.env.local' });

async function testFlux() {
  console.log('🌲 Testing Black Forest Labs Flux API...');
  console.log('BFL_API_KEY present:', !!process.env.BFL_API_KEY);
  
  try {
    const requestBody = {
      prompt: "A professional, photorealistic packaging design of a vintage advent calendar. High quality, studio lighting, 8k.",
      width: 1024,
      height: 1024,
      steps: 25
    };

    console.log('📤 Sending request to Flux:', JSON.stringify(requestBody, null, 2));

    const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Key': process.env.BFL_API_KEY
      },
      body: JSON.stringify(requestBody)
    });

    console.log('📥 Flux response status:', response.status);
    console.log('📥 Response headers:', Object.fromEntries(response.headers));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Flux API error:', errorText);
      return;
    }

    const result = await response.json();
    console.log('✅ Flux success:', result);
    
    if (result.id) {
      console.log('\n🔍 Now checking status...');
      
      // Wacht 5 seconden en check status
      setTimeout(async () => {
        try {
          const statusResponse = await fetch(`https://api.bfl.ml/v1/get_result?id=${result.id}`, {
            headers: {
              'X-Key': process.env.BFL_API_KEY
            }
          });
          
          console.log('Status response:', statusResponse.status);
          if (statusResponse.ok) {
            const statusResult = await statusResponse.json();
            console.log('Status result:', statusResult);
          }
        } catch (error) {
          console.error('Status check error:', error.message);
        }
      }, 5000);
    }

  } catch (error) {
    console.error('❌ Test error:', error.message);
  }
}

testFlux();