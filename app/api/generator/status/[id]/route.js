import { NextResponse } from 'next/server';
import Replicate from 'replicate';

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN });

export async function GET(request, { params }) {
  try {
    const prediction = await replicate.predictions.get(params.id);
    
    if (prediction.error) {
      return NextResponse.json({ detail: prediction.error }, { status: 500 });
    }
    
    return NextResponse.json(prediction, { status: 200 });

  } catch (error) {
    console.error('[API Status] Fout bij ophalen van status:', error);
    return NextResponse.json({ detail: error.message }, { status: 500 });
  }
}