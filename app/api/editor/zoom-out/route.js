import { NextResponse } from 'next/server';
import Replicate from 'replicate';
import fs from 'fs/promises'; // Node.js module om bestanden te lezen
import path from 'path'; // Node.js module om met bestandspaden te werken

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function POST(request) {
  try {
    const { imageUrl } = await request.json(); // bv. "/preview-1.jpg"

    if (!imageUrl) {
      return NextResponse.json({ detail: "imageUrl is vereist." }, { status: 400 });
    }

    // 1. Bouw het volledige, lokale pad naar de afbeelding in de /public map
    const imagePath = path.join(process.cwd(), 'public', imageUrl);

    // 2. Lees het afbeeldingsbestand en zet het om naar een Base64 string
    const imageBuffer = await fs.readFile(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const dataUrl = `data:image/jpeg;base64,${base64Image}`;

    console.log(`[API ZoomOut] Start outpainting voor afbeelding: ${imageUrl}`);

    const model = "stability-ai/stable-diffusion-2-outpainting:429e80b707172718d73506161c5737c10b5234301511a7de40a7a0026e6f7535";
    const input = {
      image: dataUrl, // We sturen nu de data URL in plaats van het lokale pad
      prompt: "A wider view of the image, cinematic lighting, professional photography, 8k, high detail"
    };

    // De .run() functie is makkelijker voor snelle modellen, maar voor generaties
    // die lang kunnen duren, is het beter om de prediction te starten en de status te pollen.
    // Voor nu is .run() prima voor deze test.
    const output = await replicate.run(model, { input });

    console.log('[API ZoomOut] Nieuwe afbeelding gegenereerd:', output);

    return NextResponse.json({ newImageUrl: output[0] }, { status: 200 });

  } catch (error) {
    console.error('[API ZoomOut] Fout:', error);
    return NextResponse.json({ detail: "Serverfout bij het verwerken van de afbeelding." }, { status: 500 });
  }
}