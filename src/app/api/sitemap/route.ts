import { generateAllSitemaps } from '@/scripts/scripts';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await generateAllSitemaps();
    return NextResponse.json({ message: '✅ All sitemaps generated successfully.' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: '❌ Failed to generate sitemaps.' }, { status: 500 });
  }
}
