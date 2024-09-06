import { NextRequest, NextResponse } from "next/server";

const apiURL = process.env.SHELF_API_URL || '';

interface shelfObj {
  "janCode": string;
  "shelf": string;
  "column": string;
  "row": string;
}

export type shelfAPIResponseType = shelfObj[];

const fetcher = async (janCode: string): Promise<shelfAPIResponseType> => {
  try {
    let res = await fetch(`${apiURL}?janCode=${janCode}`, {
      redirect: 'manual', // 手動でリダイレクト処理を行う
    });

    // リダイレクトされているか確認
    if (res.status >= 300 && res.status < 400 && res.headers.get('location')) {
      const redirectURL = res.headers.get('location');
      res = await fetch(redirectURL as string); // リダイレクトされたURLに再度リクエストを送る
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('ネットワークエラー')
  }
};

export async function POST(req: NextRequest): Promise<NextResponse<shelfAPIResponseType>> {
  const { janCode } = await req.json()
  if (!janCode) {
    throw new Error('No JANCode');
  }
  try {
    const res = await fetcher(janCode);
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    throw new Error(`Failed to fetch: ${error}`)
  }
}
