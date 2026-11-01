'use server';

export async function generateGeminiPlan(promptText: string) {
  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY ortam değişkeni bulunamadı.');
    }

    // Google REST API v1beta güncel endpoint formatı
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptText }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return { success: false, error: `API Yanıt Hatası: ${response.status} - ${errorData}` };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Bilinmeyen bir hata oluştu.' };
  }
}