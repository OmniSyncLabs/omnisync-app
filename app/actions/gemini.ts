'use server';

import { GoogleGenAI } from '@google/genai';

export async function generateGeminiPlan(promptText: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'GEMINI_API_KEY bulunamadı.' };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Yoğunluk anında sırayla denenecek modeller
  const modelsToTry = [
    'gemini-1.5-flash',
    'gemini-1.5-pro',
    'gemini-2.0-flash-exp'
  ];

  // Her model için maksimum 3 defa otomatik tekrar deneme (Retry)
  for (const modelName of modelsToTry) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptText,
        });

        if (response.text) {
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
        }
      } catch (error: any) {
        // 503 veya Yoğunluk hatası alındığında 1.5 saniye bekleyip tekrar dene
        if (attempt < 3) {
          await new Promise((resolve) => setTimeout(resolve, 1500));
        }
      }
    }
  }

  return {
    success: false,
    error: 'Google AI sunucuları şu an aşırı yoğun. Lütfen 10-15 saniye sonra tekrar deneyin.',
  };
}