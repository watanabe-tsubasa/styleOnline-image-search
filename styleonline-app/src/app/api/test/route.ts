// src/app/api/test/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const key = process.env.API_URL
  return NextResponse.json({ message: key });
}
