'use server';

import { GoogleGenAI } from '@google/genai';

// Basic Üyeler İçin Lokal Kelime Havuzu & Simülasyon Motoru
function generateSimulatedPlan(promptText: string) {
  const lowerPrompt = promptText.toLowerCase();

  // 1. Saat / Süre Tespiti
  let timeSlot = '14:00 - 15:00'; // Varsayılan
  if (lowerPrompt.includes('yatmadan') || lowerPrompt.includes('gece') || lowerPrompt.includes('akşam')) {
    timeSlot = '21:30 - 22:30';
  } else if (lowerPrompt.includes('sabah') || lowerPrompt.includes('erken')) {
    timeSlot = '08:30 - 09:30';
  } else if (lowerPrompt.includes('öğle')) {
    timeSlot = '12:30 - 13:30';
  }

  // 2. Zihinsel Odak / Beyin Yükü Tespiti
  let effortLevel = 'Beyin Yükü: Sev. 3';
  const highFocusWords = ['kod', 'ders', 'matematik', 'sınav', 'proje', 'analiz', 'fizik', 'yazılım'];
  const lowFocusWords = ['kitap', 'yürüyüş', 'müzik', 'dinlenme', 'dizi', 'film', 'su', 'mola'];

  if (highFocusWords.some((word) => lowerPrompt.includes(word))) {
    effortLevel = 'Beyin Yükü: Sev. 5';
  } else if (lowFocusWords.some((word) => lowerPrompt.includes(word))) {
    effortLevel = 'Beyin Yükü: Sev. 1';
  }

  return {
    success: true,
    data: {
      timeSlot,
      effortLevel,
      taskTip: null, // Basic üyelerde AI Tip kartı yok
      isSimulated: true,
    },
  };
}

export async function generateGeminiPlan(promptText: string, userPlan: string = 'basic') {
  // BASIC ÜYE: Gerçek API'ye gitmeden illüzyon motorunu çalıştır
  if (userPlan === 'basic') {
    return generateSimulatedPlan(promptText);
  }

  // PRO / PLUS ÜYE: Gerçek Gemini API + Task-Tip Üretimi
  const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (!apiKey) {
    return generateSimulatedPlan(promptText); // Fallback
  }

  const ai = new GoogleGenAI({ apiKey });

  const systemPrompt = `
    Gelen görev: "${promptText}"
    Lütfen bu göreve uygun bir zaman planı ve bu planın altına eklenecek, plandan dışarı çıkmayacak, kullanıcının odaklanmasını sağlayacak kısa ve pratik bir 'Task-Tip' (İpucu) üret.
    Yanıtı tam olarak şu JSON formatında ver:
    {
      "timeSlot": "21:00 - 22:00",
      "effortLevel": "Beyin Yükü: Sev. 3",
      "taskTip": "Görevin odağını bozmamak için telefonunu sessize alıp ilk 25 dakikalık bloğu tek bir konuya ayır."
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: systemPrompt,
    });

    if (response.text) {
      const cleanJson = response.text.replace(/```json|```/g, '').trim();
      const parsedData = JSON.parse(cleanJson);

      return {
        success: true,
        data: {
          ...parsedData,
          isSimulated: false,
        },
      };
    }

    return generateSimulatedPlan(promptText);
  } catch (error: any) {
    // Hata durumunda da kullanıcıya hissettirmeden simüle yanıt dön
    return generateSimulatedPlan(promptText);
  }
}