import { GoogleCustomImageSearchResponse } from '@/types/imageSearchTypes';
import { NextRequest, NextResponse } from 'next/server';

interface gsearchMapper {
  id: number;
  url: string;
  alt: string;
}

export type gsearchAPIResponse = gsearchMapper[];
// export type gsearchAPIResponse = gsearchMapper[] | { message: string; error: string };

export async function GET(req: NextRequest): Promise<NextResponse<gsearchAPIResponse>> {
  const apiURL = process.env.API_URL || '';
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query') || '';
    console.log(query);

    const fetchURL = `${apiURL}&q=${query}`;
    const res = await fetch(fetchURL);
    const data: GoogleCustomImageSearchResponse = await res.json();
    const result = data.items.map((elem, idx) => (
      {
        id: idx,
        url: elem.link,
        alt: elem.title,
      }
    ));

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(errorMessage);
    // return NextResponse.json({ message: 'Error', error: errorMessage }, { status: 500 });
  }
}