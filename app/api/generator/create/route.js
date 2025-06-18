import { NextResponse } from 'next/server';

export async function POST(request) {
    // We gebruiken nu de BFL_API_TOKEN
    const apiToken = process.env.BFL_API_TOKEN;
    if (!apiToken) {
        console.error('[API] Fout: BFL_API_TOKEN is niet ingesteld in .env.local');
        return NextResponse.json({ detail: "API token for bfl.ai is not configured." }, { status: 500 });
    }

    try {
        const formData = await request.json();
        const prompt = `A professional, photorealistic packaging design. Packaging type: ${formData.packagingType}. Brand name: "${formData.companyName}". Style: ${formData.styles.join(', ')}. Main colors: ${formData.colors.join(', ')}. Design details: "${formData.prompt}". High quality, studio lighting, 8k.`;
        
        const apiRequestBody = {
            prompt: prompt,
            aspect_ratio: "1:1",
        };

        console.log('[API] Request body die naar bfl.ai wordt verstuurd:', apiRequestBody);

        const apiResponse = await fetch("https://api.bfl.ai/flux-kontext-pro", {
            method: 'POST',
            headers: {
                'x-key': apiToken, // De correcte header naam
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(apiRequestBody),
        });

        if (!apiResponse.ok) {
            const errorBody = await apiResponse.json();
            console.error('[API] Fout ontvangen van bfl.ai:', errorBody);
            throw new Error(`API Error: ${errorBody.detail || apiResponse.statusText}`);
        }

        const prediction = await apiResponse.json();
        console.log('[API] Taak succesvol gestart bij bfl.ai! Prediction:', prediction);

        return NextResponse.json(prediction, { status: 201 });

    } catch (error) {
        console.error('[API] Algemene fout in create route:', error);
        return NextResponse.json({ detail: error.message }, { status: 500 });
    }
}