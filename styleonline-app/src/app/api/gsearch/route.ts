import { NextRequest, NextResponse } from 'next/server';
import { GoogleCustomImageSearchResponse } from '@/types/imageSearchTypes';

interface gsearchMapper {
  id: number;
  url: string;
  alt: string;
}

export type gsearchAPIResponse = gsearchMapper[];

export async function POST(req: NextRequest): Promise<NextResponse<gsearchAPIResponse>> {
  const apiURL = process.env.API_URL || '';

  try {
    const { query } = await req.json();  // リクエストボディから `query` を取得

    if (!query) {
      throw new Error('Query parameter is missing');
    }

    const fetchURL = `${apiURL}&q=${encodeURIComponent(query)}`;
    const res = await fetch(fetchURL);
    if (!res.ok) {
      throw new Error(`Failed to fetch data from external API: ${res.statusText}`);
    }

    const data: GoogleCustomImageSearchResponse = await res.json();
    const result = data.items.map((elem, idx) => ({
      id: idx,
      url: elem.link,
      alt: elem.title,
    }));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
    // return NextResponse.json({ message: 'Error', error: errorMessage }, { status: 500 });
  }
}
