'use server';

import { GoogleGenAI } from '@google/genai';

export async function generateGeminiPlan(promptText: string) {
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return { success: false, error: 'GEMINI_API_KEY bulunamadı.' };
  }

  const ai = new GoogleGenAI({ apiKey });

  // Ana Model ve Yoğunluk Anında Yedek Model Listesi
  const modelsToTry = ['gemini-3.8-flash', 'gemini-1.5-flash'];

  for (const modelName of modelsToTry) {
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
      // Eğer 503 (yoğunluk) hatasıysa diğer modele geçmeyi dene
      console.warn(`${modelName} yanıt veremedi, yedek modele geçiliyor...`);
    }
  }

  return {
    success: false,
    error: 'Google AI sunucuları şu an çok yoğun (503). Lütfen birkaç saniye sonra tekrar deneyin.',
  };
}