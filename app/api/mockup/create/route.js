import { NextResponse } from 'next/server';
import sharp from 'sharp';
import path from 'path';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');
    const mockupId = data.get('mockupId');

    if (!file || !mockupId) {
      return NextResponse.json({ success: false, error: "Bestand of mockup ID ontbreekt." }, { status: 400 });
    }

    // 1. Converteer de geüploade afbeelding naar een buffer
    const uploadedImageBuffer = Buffer.from(await file.arrayBuffer());

    // 2. Vind het pad naar de basis-mockupafbeelding
    const baseImagePath = path.join(process.cwd(), 'public', 'mockups', `${mockupId}-base.png`);
    
    // 3. De magie van 'sharp': voeg de afbeeldingen samen
    const finalImageBuffer = await sharp(baseImagePath)
      .composite([
        {
          // Hier passen we het geüploade logo aan VOORDAT we het plakken
          input: await sharp(uploadedImageBuffer)
            .resize(300) // Verklein het logo naar een breedte van 150px (pas dit getal aan naar wens)
            .toBuffer(),
          top: 850,      // Nieuwe coördinaat van boven
          left: 870,     // Nieuwe coördinaat van links
        },
      ])
      .png()
      .toBuffer();

    // 4. Stuur de samengevoegde afbeelding terug als een Base64-string
    const base64Image = `data:image/png;base64,${finalImageBuffer.toString('base64')}`;

    return NextResponse.json({ success: true, imageUrl: base64Image });

  } catch (error) {
    console.error('[API Mockup] Fout:', error);
    if (error.code === 'ENOENT') {
         return NextResponse.json({ success: false, error: "Basis mockup-afbeelding niet gevonden op de server." }, { status: 500 });
    }
    return NextResponse.json({ success: false, error: "Serverfout bij het samenvoegen van de afbeeldingen." }, { status: 500 });
  }
}