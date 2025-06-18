// API Test Script voor Replicate en Black Forest Labs
// Run dit script met: node api-test.js

// Zorg ervoor dat je een .env bestand hebt met:
// REPLICATE_API_TOKEN=r_xxx
// BFL_API_KEY=xxx

// Expliciet .env.local laden
require('dotenv').config({ path: '.env.local' });

console.log('🔧 Environment loaded from .env.local');
console.log('All env vars starting with BFL or REPLICATE:');
Object.keys(process.env).forEach(key => {
  if (key.startsWith('BFL') || key.startsWith('REPLICATE')) {
    console.log(`${key}: ${process.env[key] ? 'present' : 'missing'}`);
  }
});

// Test 1: Replicate API Test
async function testReplicate() {
  console.log('\n🔄 Testing Replicate API...');
  console.log('API Token aanwezig:', !!process.env.REPLICATE_API_TOKEN);
  
  try {
    // Eerst testen of we de account info kunnen ophalen
    const accountResponse = await fetch('https://api.replicate.com/v1/account', {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Account Status:', accountResponse.status);
    
    if (accountResponse.ok) {
      const accountData = await accountResponse.json();
      console.log('Account Info:', {
        username: accountData.username,
        type: accountData.type
      });
    } else {
      console.log('Account Error:', await accountResponse.text());
      return; // Stop hier als account niet werkt
    }

    // Test een simpele model listing
    console.log('\n📋 Testing model listing...');
    const modelsResponse = await fetch('https://api.replicate.com/v1/models', {
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`
      }
    });
    
    console.log('Models Status:', modelsResponse.status);
    if (modelsResponse.ok) {
      const models = await modelsResponse.json();
      console.log('Aantal beschikbare modellen:', models.results?.length);
    }

    // Test een eenvoudige prediction (met een zeer basic model)
    console.log('\n🎯 Testing simple prediction...');
    const predictionResponse = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        version: "ac732df83cea7fff18b8472768c88ad041fa750ff7682a21affe81863cbe77e4", // Stable basic model
        input: {
          prompt: "a simple red apple",
          width: 512,
          height: 512,
          num_inference_steps: 20
        }
      })
    });

    console.log('Prediction Status:', predictionResponse.status);
    console.log('Prediction Headers:', Object.fromEntries(predictionResponse.headers));
    
    if (!predictionResponse.ok) {
      const errorText = await predictionResponse.text();
      console.log('Prediction Error Body:', errorText);
    } else {
      const prediction = await predictionResponse.json();
      console.log('Prediction Success:', {
        id: prediction.id,
        status: prediction.status
      });
    }

  } catch (error) {
    console.error('Replicate Test Error:', error.message);
  }
}

// Test 2: Black Forest Labs API Test
async function testBFL() {
  console.log('\n🌲 Testing Black Forest Labs API...');
  console.log('API Key aanwezig:', !!process.env.BFL_API_KEY);
  
  try {
    // Test basis connectiviteit
    const response = await fetch('https://api.bfl.ml/v1/flux-pro', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Key': process.env.BFL_API_KEY
      },
      body: JSON.stringify({
        prompt: "a simple test image",
        width: 512,
        height: 512,
        steps: 20
      })
    });

    console.log('BFL Status:', response.status);
    console.log('BFL Headers:', Object.fromEntries(response.headers));
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log('BFL Error Body:', errorText);
    } else {
      const result = await response.json();
      console.log('BFL Success:', result);
    }

  } catch (error) {
    console.error('BFL Test Error:', error.message);
    console.error('Full error:', error);
  }
}

// Test 3: Basis netwerk connectiviteit
async function testConnectivity() {
  console.log('\n🌐 Testing basic connectivity...');
  
  try {
    // Test een simpele HTTP request
    const response = await fetch('https://httpbin.org/get');
    console.log('Basic HTTP works:', response.ok);
    
    // Test de domain bereikbaarheid
    const replicateTest = await fetch('https://replicate.com');
    console.log('Replicate.com bereikbaar:', replicateTest.ok);
    
    const bflTest = await fetch('https://api.bfl.ml');
    console.log('BFL API bereikbaar:', bflTest.status !== 0);
    
  } catch (error) {
    console.error('Connectivity Error:', error.message);
  }
}

// Test 4: Environment variabelen check
function testEnvironment() {
  console.log('\n⚙️ Environment Check:');
  console.log('REPLICATE_API_TOKEN length:', process.env.REPLICATE_API_TOKEN?.length || 0);
  console.log('REPLICATE_API_TOKEN starts with r_:', process.env.REPLICATE_API_TOKEN?.startsWith('r_'));
  console.log('REPLICATE_API_TOKEN value:', process.env.REPLICATE_API_TOKEN?.substring(0, 20) + '...');
  console.log('BFL_API_KEY length:', process.env.BFL_API_KEY?.length || 0);
  console.log('BFL_API_KEY value:', process.env.BFL_API_KEY?.substring(0, 20) + '...');
  console.log('Node version:', process.version);
}

// Main test functie
async function runAllTests() {
  console.log('🚀 Starting API Tests for Packpilot...');
  
  testEnvironment();
  await testConnectivity();
  await testReplicate();
  await testBFL();
  
  console.log('\n✅ All tests completed!');
}

// Run de tests
runAllTests().catch(console.error);