import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request) {
  try {
    // We hebben de URL van de originele afbeelding en de nieuwe achtergrond-prompt nodig
    const { imageUrl, prompt } = await request.json();

    if (!imageUrl || !prompt) {
      return NextResponse.json({ detail: "imageUrl en prompt zijn vereist." }, { status: 400 });
    }

    console.log(`[API Background] Start achtergrondvervanging voor: ${imageUrl}`);
    console.log(`[API Background] Nieuwe prompt: ${prompt}`);

    // We gebruiken een 'inpainting' model, dat is goed in het vervangen van delen van een afbeelding.
    // We geven geen 'masker', dus het model zal proberen zelf het onderwerp van de achtergrond te scheiden.
    const model = "stability-ai/stable-diffusion-2-inpainting:3a1184395d9136151694f416752763b36dce16bb082a930b0c49861f96d1e5BF";
    const input = {
      image: imageUrl, // De originele afbeelding
      prompt: prompt,  // De beschrijving van de nieuwe achtergrond
    };

    const output = await replicate.run(model, { input });

    console.log('[API Background] Nieuwe afbeelding gegenereerd:', output);

    return NextResponse.json({ newImageUrl: output[0] }, { status: 200 });

  } catch (error) {
    console.error('[API Background] Fout:', error);
    return NextResponse.json({ detail: "Serverfout bij het vervangen van de achtergrond." }, { status: 500 });
  }
}