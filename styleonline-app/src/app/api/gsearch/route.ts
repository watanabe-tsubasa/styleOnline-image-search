import { GoogleCustomImageSearchResponse } from '@/types/imageSearchTypes';
import { NextRequest, NextResponse } from 'next/server';

interface gsearchPOSTBody {
  query: string;
}

export async function POST(req: NextRequest) {
  const apiURL = process.env.API_URL || '';
  try {
    const query = await req.json() as gsearchPOSTBody
    const fetchURL = `${apiURL}&q=${query.query}`
    const res = await fetch(fetchURL);
    const data: GoogleCustomImageSearchResponse = await res.json()
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error reading body:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ message: 'Error', error: errorMessage }, { status: 400 });
  }
}