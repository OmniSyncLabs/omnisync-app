'use server';

import { GoogleGenAI } from '@google/genai';

export async function generateGeminiPlan(promptText: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
      return { success: false, error: 'GEMINI_API_KEY bulunamadı.' };
    }

    const ai = new GoogleGenAI({ apiKey });

    // API'nin açıkça talep ettiği güncel model
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
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
      error: `SDK Hatası: ${error?.message || 'Bilinmeyen bir hata oluştu.'}`,
    };
  }
}