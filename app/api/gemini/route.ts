import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { promptText } = await req.json();
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API Key bulunamadı.' }, { status: 500 });
    }

    // Doğrudan en güncel ve hızlı flash modelini kullanıyoruz
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error?.message || 'Gemini API Hatası' }, { status: response.status });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Sunucu hatası oluştu.' }, { status: 500 });
  }
}
