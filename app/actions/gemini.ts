'use server';

import { GoogleGenAI } from '@google/genai';

export async function generateGeminiPlan(promptText: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ortam değişkeni bulunamadı.');
    }

    // Google GenAI SDK başlatma
    const ai = new GoogleGenAI({ apiKey });

    // AI isteği
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: promptText,
    });

    return {
      success: true,
      data: {
        candidates: [
          {
            content: {
              parts: [{ text: response.text }],
            },
          },
        ],
      },
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Gemini bağlantı hatası oluştu.',
    };
  }
}