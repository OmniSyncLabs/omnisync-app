"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const isTr = locale === "tr";

  // TÜRKÇE / İNGİLİZCE DİNAMİK ÇEVİRİ SÖZLÜĞÜ
  const t = {
    overview: isTr ? "Genel Bakış" : "Overview",
    habits: isTr ? "Alışkanlıklar & AI Planlama" : "Habits & AI Schedule",
    analytics: isTr ? "Biyometri & HRV Analizi" : "Biometrics & HRV",
    group: isTr ? "Social Party (10 Kişi)" : "Social Party (10 People)",
    settings: isTr ? "Ayarlar & Tercihler" : "Settings & Preferences",
    welcome: isTr ? "Hoş geldin" : "Welcome",
    subTitle: isTr ? "bugün ritmini koruma zamanı." : "time to keep your rhythm today.",
    logOut: isTr ? "Çıkış Yap" : "Log Out",
    annual: isTr ? "Yıllık" : "Annual",
    monthly: isTr ? "Aylık" : "Monthly",
    save20: isTr ? "%20 Tasarruf Et" : "Save 20%",
    activePlan: isTr ? "Mevcut Plan" : "Active Plan",
    upgrade: isTr ? "Aboneliği Yönet / Yükselt" : "Manage / Upgrade Subscription",
    completedRoutines: isTr ? "Tamamlanan Rutinler" : "Completed Routines",
    focusLevelText: isTr ? "Zihinsel Odak Seviyesi" : "Mental Focus Level",
    addHabitTitle: isTr ? "Yapay Zeka ile Otomatik Zamanlanan Görev Ekle" : "Add Task Auto-Scheduled by AI",
    addHabitBtn: isTr ? "Yapay Zeka ile Otomatik Ekle" : "Add with AI Scheduler",
    addingAl: isTr ? "AI Süre Tahmini & Çakışmasız Saat Analizi Yapıyor..." : "AI Estimating Duration & Calculating Slot...",
    taskTitlePlaceholder: isTr ? "Görev Adı (Örn: 3 Saat Matematik Denemesi Çöz)" : "Task Title (e.g. 3h Math Exam)",
    category: isTr ? "Kategori" : "Category",
    productivity: isTr ? "Verimlilik" : "Productivity",
    sports: isTr ? "Spor" : "Sports",
    health: isTr ? "Sağlık" : "Health",
    personal: isTr ? "Kişisel" : "Personal",
    level1: isTr ? "Sev. 1 (Çok Hafif)" : "Lvl 1 (Very Light)",
    level2: isTr ? "Sev. 2 (Hafif)" : "Lvl 2 (Light)",
    level3: isTr ? "Sev. 3 (Orta)" : "Lvl 3 (Medium)",
    level4: isTr ? "Sev. 4 (Yoğun)" : "Lvl 4 (Heavy)",
    level5: isTr ? "Sev. 5 (Maksimum Odak)" : "Lvl 5 (Peak Focus)",
    groupTitle: isTr ? "10 Kişilik Odak Grubu Takibi" : "Social Party Focus Rooms & Live Sync",
    groupSub: isTr ? "Arkadaş grubunun gün içindeki canlı durumunu, odak seviyelerini ve rutinlerini incele." : "Track your friend group's live focus status, HRV, and active routines.",
    lockedTitle: isTr ? "Bu Özellik Plus Üyeliğe Özeldir" : "Feature Locked to Plus Members",
    lockedSub: isTr ? "Canlı grup odalarını ve arkadaşınızın anlık odak durumunu görmek için Plus planına yükseltin." : "Upgrade to Plus membership to view live focus rooms and real-time group sync.",
    getPlus: isTr ? "Plus Üyeliğe Geç" : "Upgrade to Plus",
    sec1Title: isTr ? "01 Biyometrik & Sağlık Senkronizasyonu" : "01 Biometric & Health Sync",
    appleHealth: isTr ? "Apple Health / Google Fit Entegrasyonu" : "Apple Health / Google Fit Integration",
    appleHealthSub: isTr ? "Aktif Sağlık verisi senkronize ediliyor" : "Active Health sync enabled",
    autoFocus: isTr ? "Otomatik Odak Modu Senkronizasyonu" : "Auto Focus Mode Sync",
    autoFocusSub: isTr ? "Rahatsız Etmeyin modunu odak saatleriyle eşitle" : "Sync Do Not Disturb with focus windows",
    wearableTitle: isTr ? "Birincil Giyilebilir Cihaz" : "Primary Wearable Device",
    swipeScroll: isTr ? "Seçmek için kaydırın veya seçin" : "Swipe, drag or scroll to choose",
    sec2Title: isTr ? "02 Sirkadiyen Ritim & Rutin Tercihleri" : "02 Circadian & Routine Preferences",
    sleepTargetTitle: isTr ? "Hedef Uyku Süresi" : "Sleep Target Hours",
    caffeineTitle: isTr ? "Kafein Kesme Limiti (Uykudan Önce)" : "Caffeine Cutoff Buffer",
    hoursBeforeSleep: isTr ? "Saat Öncesi" : "Hours before sleep",
    timezoneTitle: isTr ? "Zaman Dilimi (Timezone)" : "Timezone",
    aiVoiceTitle: isTr ? "Sesli Günlük AI Sabah Özeti" : "AI Daily Voice Morning Briefing",
    aiVoiceSub: isTr ? "08:00 Günün planı sesli senkronize edilir" : "8:00 AM Your day, in sync",
    sec3Title: isTr ? "03 Hesap & Güvenlik" : "03 Account & Security",
    linkedAccounts: isTr ? "Bağlı Hesaplar" : "Linked accounts",
    connectedAs: isTr ? "Google bağlantısı:" : "Google: connected as",
    demoSession: isTr ? "Demo oturumu Canlı kimlik doğrulama servisi pasif" : "Demo session. No live authentication service",
    notifications: isTr ? "Bildirim Tercihleri" : "Notifications",
    privacy: isTr ? "Gizlilik & Güvenlik" : "Privacy & Security",
    helpSupport: isTr ? "Yardım & Destek" : "Help & Support",
    membershipHeader: isTr ? "ABONELİK PAKETLERİNİZ" : "YOUR MEMBERSHIP",
    proTitle: "PRO",
    plusTitle: "PLUS",
    mostPopular: isTr ? "EN POPÜLER" : "★ MOST POPULAR",
    perMonth: isTr ? "/ ay" : "/ month",
    billedAnnuallyPro: isTr ? "Yıllık faturalandırılır ($48/yıl)" : "Billed annually ($48/year)",
    billedAnnuallyPlus: isTr ? "Yıllık faturalandırılır ($76.8/yıl)" : "Billed annually ($76.8/year)",
    proHeader: isTr ? "→ Basic paketteki her şey, ayrıca:" : "→ Everything in Basic, plus:",
    plusHeader: isTr ? "→ Pro paketteki her şey, ayrıca:" : "→ Everything in Pro, plus:",
    trialBtn: isTr ? "7 Günlük Ücretsiz Denemeyi Başlat" : "Start 7-Day Free Trial",
    getPlusBtn: isTr ? "Plus Üyeliği Al" : "Get Plus Membership",
  };

  const [userName, setUserName] = useState<string>("Kullanıcı");
  const [userEmail, setUserEmail] = useState<string>("demo@example.com");
  const [userPlan, setUserPlan] = useState<string>("free");
  const [userGoal, setUserGoal] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [updateMsg, setUpdateMsg] = useState<string>("");
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  const [healthSync, setHealthSync] = useState<boolean>(true);
  const [autoFocusSync, setAutoFocusSync] = useState<boolean>(true);
  const [aiVoiceBriefing, setAiVoiceBriefing] = useState<boolean>(true);
  const [sleepTarget, setSleepTarget] = useState<string>("8.0 Hours");
  const [caffeineBuffer, setCaffeineBuffer] = useState<string>("8.0 Hours before sleep");
  const [timezone, setTimezone] = useState<string>("Europe/Istanbul");
  const [wearableDevice, setWearableDevice] = useState<string>("Apple Watch Series 9");
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "habits" | "analytics" | "group" | "settings">("overview");
  const [focusLevel, setFocusLevel] = useState<number>(3);
  const [hrvScore] = useState<number>(68);

  // CANLI AI TIP STATE
  const [realtimeAiTip, setRealtimeAiTip] = useState<string>("");
  const [isTipLoading, setIsTipLoading] = useState<boolean>(false);

  // RUTİN DÜZENLEME (EDIT MODAL) STATE'LERİ
  const [editingHabit, setEditingHabit] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editTime, setEditTime] = useState("");

  // MANUEL SABİT BLOK FORM STATE'LERİ
  const [manualTitle, setManualTitle] = useState("");
  const [manualStart, setManualStart] = useState("08:00");
  const [manualEnd, setManualEnd] = useState("15:20");

  // ADMIN MODAL STATE'LERİ
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>("");
  const [selectedAdminPlan, setSelectedAdminPlan] = useState<"free" | "pro" | "plus">("pro");
  const [adminError, setAdminError] = useState<string>("");
  const [adminLoading, setAdminLoading] = useState<boolean>(false);

  const ADMIN_SECRET = "omni2026admin";

  const getPlanLimit = (plan: string) => {
    if (plan === "pro") return 10;
    if (plan === "plus") return 25;
    return 4;
  };

  const normalizeTime = (timeStr: string) => {
    if (!timeStr) return "00:00";
    return timeStr.replace(/\./g, ":").trim();
  };

  const [habits, setHabits] = useState<any[]>([]);
  const [isHabitsLoaded, setIsHabitsLoaded] = useState(false);

  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState("Verimlilik");
  const [newHabitLevel, setNewHabitLevel] = useState<number>(3);
  const [aiScheduling, setAiScheduling] = useState<boolean>(false);

  // 10 KİŞİLİK SOCIAL PARTY ÜYELERİ LİSTESİ
  const groupMembers = [
    { id: 1, name: "Yaren Ünlü", status: isTr ? "1.5 Saat Matematik Çalışıyor" : "1.5h Studying Math", focus: "Sev. 5", hrv: "72 bpm", online: true },
    { id: 2, name: "Ali Yılmaz", status: isTr ? "Paragraf Soru Çözümü" : "Solving Reading Tests", focus: "Sev. 4", hrv: "65 bpm", online: true },
    { id: 3, name: "Zeynep Kaya", status: isTr ? "Açık Hava Yürüyüşü" : "Outdoor Walk", focus: "Sev. 2", hrv: "80 bpm", online: false },
    { id: 4, name: "Mert Demir", status: isTr ? "Dinlenme / Mola" : "Rest & Break", focus: "Sev. 1", hrv: "58 bpm", online: true },
    { id: 5, name: "Ece Şahin", status: isTr ? "İngilizce Kelime Ezberi" : "English Vocabulary", focus: "Sev. 3", hrv: "70 bpm", online: true },
    { id: 6, name: "Can Öztürk", status: isTr ? "Fizik Soru Çözümü" : "Physics Practice", focus: "Sev. 5", hrv: "63 bpm", online: false },
    { id: 7, name: "Selin Arslan", status: isTr ? "Kitap Okuma Saati" : "Reading Time", focus: "Sev. 2", hrv: "76 bpm", online: true },
    { id: 8, name: "Burak Yıldız", status: isTr ? "Kodlama & Proje" : "Coding & Project", focus: "Sev. 4", hrv: "69 bpm", online: true },
    { id: 9, name: "Elif Aydın", status: isTr ? "Geometri Tekrarı" : "Geometry Review", focus: "Sev. 4", hrv: "67 bpm", online: false },
    { id: 10, name: "Deniz Kaan", status: isTr ? "Gece Çalışması" : "Night Session", focus: "Sev. 3", hrv: "71 bpm", online: true },
  ];

  // TAKILMAYAN CANLI AI İPUCU ÜRETİCİSİ
  const generateRealtimeTip = async (level: number) => {
    setIsTipLoading(true);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    
    if (apiKey) {
      try {
        const prompt = `Kullanıcının anlık zihinsel odak seviyesi: ${level}/5. Bu odak seviyesindeki öğrenci/çalışan için uygulanabilecek 1-2 cümlelik pratik, motivasyon verici bir odak tavsiyesi yaz. Yalnızca tavsiyeyi ver.`;
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (text) {
          setRealtimeAiTip(text);
          setIsTipLoading(false);
          return;
        }
      } catch (err) {
        console.error("AI Tip alma hatası:", err);
      }
    }

    const tipsPool: Record<number, string[]> = {
      1: ["Zihinsel enerjin düşük. Zor dersler yerine kısa yürüyüşler ve hafif okumalar yap.", "Düşük odak modundasın. Masanı düzenle ve 15 dakikalık mola ver."],
      2: ["Hafif odak modundasın. Kelime ezberi ve rutin tekrar yapmak için mükemmel zaman.", "Kavram tekrarları ve formül incelemeleri için 30 dakikalık bloklar tercih et."],
      3: ["Dengeli odak seviyesi. 45 dakikalık soru çözümü ve ardından 10 dakika mola ideal.", "Zihnin açık. Orta zorluktaki konuları bitirmek için zamanlayıcını başlat."],
      4: ["Yüksek zihinsel performans! Zorlandığın branş derslerine ve ağır problemlere odaklan.", "Analiz ve mantık yürütme gücün zirvede. Kesintisiz 1 saatlik derin çalışma yap."],
      5: ["MAKSİMUM AKIŞ (FLOW) MODU! Bildirimleri kapat, 2-3 saatlik deneme seansını başlat.", "Zihinsel odaklama tepe noktada. En zorlandığın projeyi hemen önceliklendir."]
    };

    const currentTips = tipsPool[level] || tipsPool[3];
    const randomTip = currentTips[Math.floor(Math.random() * currentTips.length)];
    setRealtimeAiTip(randomTip);
    setIsTipLoading(false);
  };

  useEffect(() => {
    generateRealtimeTip(focusLevel);
  }, [focusLevel]);

  useEffect(() => {
    const savedHabits = localStorage.getItem("omni_habits_dashboard");
    if (savedHabits) {
      try {
        setHabits(JSON.parse(savedHabits));
      } catch (err) {
        console.error("Habits yüklenemedi:", err);
      }
    }
    setIsHabitsLoaded(true);
  }, []);

  useEffect(() => {
    if (isHabitsLoaded) {
      localStorage.setItem("omni_habits_dashboard", JSON.stringify(habits));
    }
  }, [habits, isHabitsLoaded]);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "Kullanıcı");
        setUserEmail(user.email || "demo@example.com");
        setUserPlan(user.user_metadata?.plan || "free");
        setUserGoal(user.user_metadata?.onboarding_goal || "");
        setUserAvatar(user.user_metadata?.avatar_url || user.user_metadata?.picture || "");
      } else {
        setUserName(localStorage.getItem("omni_user_name") || "Kullanıcı");
        setUserEmail(localStorage.getItem("omni_user_email") || "demo@example.com");
        setUserPlan(localStorage.getItem("omni_user_plan") || "free");
        setUserAvatar(localStorage.getItem("omni_user_avatar") || "");
      }
      setLoading(false);
    };
    fetchUserData();
  }, []);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setUserAvatar(base64String);
        localStorage.setItem("omni_user_avatar", base64String);
        try {
          await supabase.auth.updateUser({ data: { avatar_url: base64String } });
          setUpdateMsg(isTr ? "Profil fotoğrafı güncellendi!" : "Profile picture updated!");
          setTimeout(() => setUpdateMsg(""), 3000);
        } catch (err) {
          console.error("Avatar kaydetme hatası:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChangePlan = async (targetPlan: "free" | "pro" | "plus") => {
    if (targetPlan === "free") {
      try {
        await supabase.auth.updateUser({ data: { plan: "free" } });
        setUserPlan("free");
        localStorage.setItem("omni_user_plan", "free");
        setShowUpgradeModal(false);
        setUpdateMsg(isTr ? "Planınız FREE olarak güncellendi!" : "Plan updated to FREE!");
      } catch (e) {
        console.error("Plan güncelleme hatası:", e);
      }
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      let checkoutUrl = '';
      if (targetPlan === 'plus') {
        checkoutUrl = isAnnual 
          ? 'https://omnisync-app.lemonsqueezy.com/checkout/buy/f46fcc91-f89d-4419-8b64-e9cf3675ee03' 
          : 'https://omnisync-app.lemonsqueezy.com/checkout/buy/7b45f0a0-e3ca-4226-a670-edd5bd97005b';
      } else if (targetPlan === 'pro') {
        checkoutUrl = isAnnual 
          ? 'https://omnisync-app.lemonsqueezy.com/checkout/buy/35c297b5-7c8a-41ee-a663-f566dae85e2a' 
          : 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';
      }

      if (user && user.email) {
        checkoutUrl += `?checkout[email]=${encodeURIComponent(user.email.trim())}&checkout[custom][user_id]=${user.id}`;
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      window.location.href = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.clear();
    router.push(`/${locale}`);
  };

  const toggleHabit = (id: number) => {
    setHabits(habits.map((h) => h.id === id ? { ...h, completed: !h.completed } : h));
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter((h) => h.id !== id));
  };

  // RUTİN DÜZENLEME (EDIT MODAL)
  const openEditModal = (habit: any) => {
    setEditingHabit(habit);
    setEditTitle(habit.title);
    setEditTime(habit.suggestedTime);
  };

  const handleSaveEdit = () => {
    if (!editingHabit) return;
    const cleanTime = normalizeTime(editTime);
    setHabits(
      habits.map((h) =>
        h.id === editingHabit.id ? { ...h, title: editTitle, suggestedTime: cleanTime } : h
      )
    );
    setEditingHabit(null);
  };

  const handleAddManualBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const maxAllowed = getPlanLimit(userPlan);
    if (habits.length >= maxAllowed) {
      alert(isTr 
        ? `${userPlan.toUpperCase()} planında en fazla ${maxAllowed} adet rutin ekleyebilirsiniz.` 
        : `Maximum ${maxAllowed} routines allowed for ${userPlan.toUpperCase()} plan.`);
      setShowUpgradeModal(true);
      return;
    }

    const cleanStart = normalizeTime(manualStart);
    const cleanEnd = normalizeTime(manualEnd);

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: manualTitle,
        category: isTr ? "Sabit Blok" : "Fixed Block",
        level: 3,
        suggestedTime: `${cleanStart} - ${cleanEnd}`,
        completed: false,
        isManual: true,
      }
    ]);

    setManualTitle("");
  };

  // TAM DÜZELTİLMİŞ METİN İÇİNDEN SÜRE ALGILAYAN ZAMANLAYICI (3 SAAT vb.)
  const handleAddHabitAl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;

    const maxAllowed = getPlanLimit(userPlan);
    if (habits.length >= maxAllowed) {
      alert(isTr 
        ? `${userPlan.toUpperCase()} planında en fazla ${maxAllowed} adet rutin ekleyebilirsiniz.` 
        : `Maximum ${maxAllowed} routines allowed for ${userPlan.toUpperCase()} plan.`);
      setShowUpgradeModal(true);
      return;
    }

    setAiScheduling(true);

    // METİNDEN SÜRE AYRIŞTIRMA (3 saat, 90 dk vs.)
    let extractedMinutes = 60;
    const titleLower = newHabitTitle.toLowerCase().replace(',', '.');

    const hourMatch = titleLower.match(/(\d+(?:\.\d+)?)\s*(?:saat|sa|hour|hr|h)/);
    const minMatch = titleLower.match(/(\d+)\s*(?:dakika|dk|min|m)/);

    if (hourMatch) {
      extractedMinutes = Math.round(parseFloat(hourMatch[1]) * 60);
    } else if (minMatch) {
      extractedMinutes = parseInt(minMatch[1]);
    } else {
      if (titleLower.includes("deneme") || titleLower.includes("sınav")) extractedMinutes = 120;
      else if (titleLower.includes("kitap") || titleLower.includes("özet")) extractedMinutes = 30;
      else if (titleLower.includes("yürüyüş") || titleLower.includes("mola")) extractedMinutes = 45;
    }

    const existingSlots = habits.map(h => `${h.title} (${h.suggestedTime})`).join(", ");
    let finalTimeSlot = "";

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const promptText = `
Sen OmniSync akıllı zamanlayıcısısın.
Dolu zamanlar: [${existingSlots}].
Görev: "${newHabitTitle}"
Bu etkinliğin süresi EXACTLY ${extractedMinutes} dakikadır. 
Lütfen tam ${extractedMinutes} dakikalık çakışmasız bir saat aralığı belirle (Örn: 3 saatlikse 14:00 - 17:00).
SADECE Saat Aralığını Yaz. Örnek: "14:00 - 17:00".
        `;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });

        const data = await res.json();
        const aiResponse = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        if (aiResponse && aiResponse.includes("-")) {
          finalTimeSlot = aiResponse.replace(/\./g, ":");
        }
      } catch (err) {
        console.error("API hatası:", err);
      }
    }

    if (!finalTimeSlot) {
      let startMin = 14 * 60;

      const isOverlapping = (testStart: number, testEnd: number) => {
        return habits.some(h => {
          const match = h.suggestedTime.replace(/\./g, ":").match(/(\d\d):(\d\d)\s*-\s*(\d\d):(\d\d)/);
          if (!match) return false;
          const hStart = parseInt(match[1]) * 60 + parseInt(match[2]);
          const hEnd = parseInt(match[3]) * 60 + parseInt(match[4]);
          return Math.max(testStart, hStart) < Math.min(testEnd, hEnd);
        });
      };

      while (isOverlapping(startMin, startMin + extractedMinutes) && startMin + extractedMinutes <= 24 * 60) {
        startMin += 30;
      }

      const formatTime = (totalMin: number) => {
        const h = Math.floor(totalMin / 60).toString().padStart(2, "0");
        const m = (totalMin % 60).toString().padStart(2, "0");
        return `${h}:${m}`;
      };

      finalTimeSlot = `${formatTime(startMin)} - ${formatTime(startMin + extractedMinutes)}`;
    }

    setHabits([
      ...habits,
      {
        id: Date.now(),
        title: newHabitTitle,
        category: newHabitCategory,
        level: newHabitLevel,
        suggestedTime: finalTimeSlot,
        completed: false,
        isManual: false,
      }
    ]);

    setNewHabitTitle("");
    setAiScheduling(false);
  };

  const handleAdminBypass = async () => {
    if (adminPassword !== ADMIN_SECRET) {
      setAdminError("Hatalı Admin Şifresi!");
      return;
    }
    setAdminLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.auth.updateUser({ data: { plan: selectedAdminPlan } });
      }
      localStorage.setItem("omni_user_plan", selectedAdminPlan);
      setUserPlan(selectedAdminPlan);
      alert(`Planınız "${selectedAdminPlan.toUpperCase()}" olarak değiştirildi.`);
      setIsAdminOpen(false);
      setAdminPassword("");
      window.location.reload();
    } catch (error) {
      setAdminError("Plan güncellenirken hata oluştu.");
    } finally {
      setAdminLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  const chartPoints = [
    { day: isTr ? "Pzt" : "Mon", score: "6/10", x: 10, y: 90 },
    { day: isTr ? "Sal" : "Tue", score: "8/10", x: 88, y: 50 },
    { day: isTr ? "Çar" : "Wed", score: "4/10", x: 166, y: 110 },
    { day: isTr ? "Per" : "Thu", score: "9/10", x: 244, y: 35 },
    { day: isTr ? "Cum" : "Fri", score: "10/10", x: 322, y: 20 },
    { day: isTr ? "Cmt" : "Sat", score: "7/10", x: 400, y: 65 },
    { day: isTr ? "Paz" : "Sun", score: "8/10", x: 480, y: 50 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans relative">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900/80 border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0">
        <div>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                OmniSync
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-1">
                {isTr ? "Kişisel Ritim & AI Disiplin" : "Personal Rhythm & AI Focus"}
              </p>
            </div>
            <button
              onClick={() => router.push(`/${isTr ? "en" : "tr"}/dashboard`)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-[10px] font-bold text-cyan-400 rounded-md transition shadow cursor-pointer"
            >
              {isTr ? "EN" : "TR"}
            </button>
          </div>

          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "overview" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>📊</span> {t.overview}
            </button>
            <button
              onClick={() => setActiveTab("habits")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "habits" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>⚡</span> {t.habits}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "analytics" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>📈</span> {t.analytics}
            </button>
            <button
              onClick={() => setActiveTab("group")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "group" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>👥</span> {t.group}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "settings" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>⚙️</span> {t.settings}
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <div className="flex items-center gap-3 mb-3">
            <label className="relative cursor-pointer group" title="Profil Fotoğrafını Değiştir">
              <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
              {userAvatar ? (
                <img src={userAvatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-cyan-500 shadow-md group-hover:opacity-80 transition" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md group-hover:opacity-80 transition">
                  {userName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-cyan-400 border-2 border-slate-900 rounded-full text-[8px] flex items-center justify-center text-slate-950 font-bold">+</span>
            </label>
            <div className="overflow-hidden">
              <div className="text-xs font-bold text-white truncate">{userName}</div>
              <div className="text-[10px] text-slate-400 truncate">{userEmail}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 bg-slate-950 hover:bg-red-500/10 hover:text-red-400 border border-slate-800 text-slate-400 rounded-xl text-xs font-semibold transition cursor-pointer"
          >
            {t.logOut}
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8">
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {activeTab === "overview" && t.overview}
              {activeTab === "habits" && t.habits}
              {activeTab === "analytics" && t.analytics}
              {activeTab === "group" && t.group}
              {activeTab === "settings" && t.settings}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {t.welcome} <span className="text-cyan-400 font-semibold">{userName}</span>, {t.subTitle}
            </p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="cursor-pointer hover:opacity-90 transition text-left"
          >
            {userPlan === "plus" ? (
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1.5 border border-purple-400/30">
                Plus Member ({habits.length}/{getPlanLimit(userPlan)})
              </span>
            ) : userPlan === "pro" ? (
              <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold text-xs rounded-full shadow-lg shadow-cyan-500/10 flex items-center gap-1.5">
                Pro Member ({habits.length}/{getPlanLimit(userPlan)})
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 font-medium text-xs rounded-full flex items-center gap-1">
                Basic ($0) ({habits.length}/{getPlanLimit(userPlan)})
              </span>
            )}
          </button>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {userGoal && (
              <div className="p-5 bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] text-cyan-400 uppercase font-black tracking-widest">
                    {isTr ? "Onboarding Hedefiniz" : "Onboarding Goal"}
                  </span>
                  <p className="text-base font-bold text-slate-100 mt-1">"{userGoal}"</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl">
                  🎯
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.completedRoutines}</span>
                  <span>✅</span>
                </div>
                <div className="text-2xl font-black text-cyan-400 mt-2">
                  {habits.filter((h) => h.completed).length} / {habits.length}
                </div>
              </div>
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>HRV Score (3-day)</span>
                  <span>❤️</span>
                </div>
                <div className="text-2xl font-black text-purple-400 mt-2">{hrvScore} bpm</div>
              </div>
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.focusLevelText}</span>
                  <span>🧠</span>
                </div>
                <div className="text-2xl font-black text-indigo-400 mt-2">Sev. {focusLevel}/5</div>
              </div>
            </div>

            {/* 00:00 - 24:00 SAAT ÇİZELGESİ */}
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    📊 Günlük 24 Saatlik Ritim Çizelgesi (00:00 - 24:00)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isTr ? "Tüm gününüzü 24 saatlik eksiksiz tablo üzerinde görün." : "Complete 24-hour daily schedule mapping."}
                  </p>
                </div>
                <div className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
                  {isTr ? `Kullanılan Limit: ${habits.length}/${getPlanLimit(userPlan)}` : `Used Limit: ${habits.length}/${getPlanLimit(userPlan)}`}
                </div>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="grid grid-cols-4 sm:grid-cols-8 border-b border-slate-800 bg-slate-900/90 text-[11px] font-bold text-cyan-400 text-center py-2.5">
                  <span className="border-r border-slate-800">Saatler</span>
                  <span className="col-span-3 sm:col-span-7">Planlar & Aktiviteler</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
                  {timeSlots.map((slot) => {
                    const currentHour = parseInt(slot.split(":")[0]);
                    const matchingHabits = habits.filter((h) => {
                      const normalizedSlot = h.suggestedTime.replace(/\./g, ":");
                      const match = normalizedSlot.match(/(\d\d):(\d\d)\s*-\s*(\d\d):(\d\d)/);
                      if (!match) return false;
                      const startH = parseInt(match[1]);
                      const endH = parseInt(match[3]);
                      return currentHour >= startH && currentHour < endH;
                    });

                    return (
                      <div key={slot} className="grid grid-cols-4 sm:grid-cols-8 text-xs py-2.5 px-3 items-center hover:bg-slate-900/40 transition">
                        <span className="font-mono text-slate-400 text-[11px] border-r border-slate-800/80 pr-2">{slot}</span>
                        <div className="col-span-3 sm:col-span-7 pl-3">
                          {matchingHabits.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {matchingHabits.map((h) => (
                                <div key={h.id} className="flex items-center justify-between bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 text-[11px]">
                                  <span className={`font-semibold ${h.isManual ? "text-amber-300" : "text-cyan-300"}`}>
                                    {h.isManual ? "📌 " : "⚡ "} {h.title}
                                  </span>
                                  <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded ml-2">
                                    {h.suggestedTime}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-600 italic text-[11px]">{isTr ? "— Boş Saat Dilimi —" : "— Empty Slot —"}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* MANUEL BLOK EKLEME */}
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
              <h3 className="text-sm font-bold text-amber-400 mb-1">🏫 Manuel Sabit Saat Ekle (Okul / İş / Dershane)</h3>
              <p className="text-xs text-slate-400 mb-4">Hem "14:00" hem "14.00" formatı desteklenir.</p>
              <form onSubmit={handleAddManualBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Etkinlik Adı (Örn: Okul / Dershane)"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="sm:col-span-2 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
                />
                <div className="flex items-center gap-1">
                  <input type="text" value={manualStart} onChange={(e) => setManualStart(e.target.value)} className="w-full text-center py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500" />
                  <span className="text-xs text-slate-500">-</span>
                  <input type="text" value={manualEnd} onChange={(e) => setManualEnd(e.target.value)} className="w-full text-center py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-mono focus:outline-none focus:border-amber-500" />
                </div>
                <button type="submit" className="py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer">
                  {isTr ? "Sabit Blok Ekle" : "Add Fixed Block"}
                </button>
              </form>
            </div>

            {/* RUTİNLER LİSTESİ VE DÜZENLEME MODALI */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-white">
                    {isTr ? "AI Tarafından Zamanlanmış Rutinler" : "AI Auto-Scheduled Routines"}
                  </h3>
                  <button onClick={() => setActiveTab("habits")} className="text-xs text-cyan-400 hover:underline font-semibold cursor-pointer">
                    {isTr ? "Tümünü Yönet →" : "Manage All →"}
                  </button>
                </div>
                
                {habits.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    {isTr ? "Henüz eklenmiş rutin bulunmuyor. Yukarıdan manuel veya AI ile ekleyebilirsiniz." : "No routines added yet."}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {habits.map((habit) => (
                      <div
                        key={habit.id}
                        className={`p-4 rounded-xl border transition flex items-center justify-between ${habit.completed ? "bg-slate-950/60 border-emerald-500/30 text-slate-400" : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200"}`}
                      >
                        <div 
                          onClick={() => toggleHabit(habit.id)}
                          className="flex items-center gap-3 cursor-pointer flex-1 min-w-0"
                        >
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border shrink-0 ${habit.completed ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-700 bg-slate-900 text-transparent"}`}>
                            ✓
                          </div>
                          <div className="min-w-0">
                            <div className={`text-xs font-semibold truncate flex items-center gap-1.5 ${habit.completed ? "line-through text-slate-500" : ""}`}>
                              {habit.isManual && <span className="text-amber-400 text-[10px] font-bold">[Sabit]</span>}
                              {habit.title}
                            </div>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                                {habit.category}
                              </span>
                              <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                                Beyin Yükü: Sev. {habit.level}
                              </span>
                              <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">
                                Saat: {habit.suggestedTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openEditModal(habit);
                            }}
                            title="Düzenle"
                            className="px-2.5 py-1 bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 rounded-lg text-xs font-bold transition cursor-pointer"
                          >
                            ✏️ Düzenle
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteHabit(habit.id);
                            }}
                            title="Rutini Sil"
                            className="text-slate-500 hover:text-red-400 p-1 rounded-lg hover:bg-red-500/10 transition cursor-pointer"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                  <h3 className="text-base font-bold text-white mb-2">ABONELİK DURUMU</h3>
                  <p className="text-xs text-slate-400 mb-4">{userEmail}</p>
                  
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.activePlan}:</span>
                      <span className="font-bold uppercase text-cyan-400">
                        {userPlan === "pro" && "PRO ($5)"}
                        {userPlan === "plus" && "PLUS ($8)"}
                        {(userPlan === "free" || userPlan === "basic") && "BASIC ($0)"}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-800">
                      <span className="text-slate-400">Rutin Kullanımı:</span>
                      <span className="font-bold text-amber-400">{habits.length} / {getPlanLimit(userPlan)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    {t.upgrade}
                  </button>

                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between">
                      <div>
                        <h4 className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">🛠️ Geliştirici Modu</h4>
                        <p className="text-[10px] text-slate-400">Admin Yetkili Geçiş</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsAdminOpen(true)}
                        className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[10px] rounded-lg transition cursor-pointer"
                      >
                        Plan Değiştir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HABITS TAB */}
        {activeTab === "habits" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{t.focusLevelText}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isTr ? "Zihinsel odak seviyesi eklenecek event saatini/seviyesini etkilemez." : "Focus rating does not alter event schedule."}
                  </p>
                </div>
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                  Sev. {focusLevel}
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setFocusLevel(lvl)}
                    className={`flex-1 py-3 rounded-xl border text-xs font-bold transition cursor-pointer ${focusLevel === lvl ? "bg-cyan-500 border-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/20" : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"}`}
                  >
                    Seviye {lvl}
                  </button>
                ))}
              </div>

              {/* DÜZELTİLEN YENİLEME BUTONLU CANLI AI İPUCU */}
              <div className="p-4 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-indigo-950/60 border border-cyan-500/40 rounded-xl shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤖</span>
                    <div>
                      <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">
                        {isTr ? "Canlı AI Üretimi Odak İpucu" : "Realtime AI Generated Tip"}
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {isTipLoading ? "AI anlık durumunuzu analiz ediyor..." : realtimeAiTip}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => generateRealtimeTip(focusLevel)}
                    title="İpucunu Yenile"
                    className="p-2 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs font-bold transition cursor-pointer shrink-0"
                  >
                    🔄 Yenile
                  </button>
                </div>
              </div>
            </div>

            {/* AI ETKİNLİK EKLEME */}
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <h3 className="text-base font-bold text-white">{t.addHabitTitle}</h3>
                </div>
                <span className="text-xs font-bold text-cyan-400">
                  ({habits.length}/{getPlanLimit(userPlan)} {isTr ? "Rutin" : "Routines"})
                </span>
              </div>
              <form onSubmit={handleAddHabitAl} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder={t.taskTitlePlaceholder}
                  value={newHabitTitle}
                  onChange={(e) => setNewHabitTitle(e.target.value)}
                  className="sm:col-span-2 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                />
                <select
                  value={newHabitCategory}
                  onChange={(e) => setNewHabitCategory(e.target.value)}
                  className="px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
                >
                  <option value="Verimlilik">{t.productivity}</option>
                  <option value="Spor">{t.sports}</option>
                  <option value="Sağlık">{t.health}</option>
                  <option value="Kişisel">{t.personal}</option>
                </select>
                <select
                  value={newHabitLevel}
                  onChange={(e) => setNewHabitLevel(Number(e.target.value))}
                  className="px-3 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition cursor-pointer"
                >
                  <option value={1}>{t.level1}</option>
                  <option value={2}>{t.level2}</option>
                  <option value={3}>{t.level3}</option>
                  <option value={4}>{t.level4}</option>
                  <option value={5}>{t.level5}</option>
                </select>
                <button
                  type="submit"
                  disabled={aiScheduling}
                  className="sm:col-span-4 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:opacity-50 mt-1 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {aiScheduling ? <span>{t.addingAl}</span> : <span>{t.addHabitBtn}</span>}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* BİYOMETRİ & HRV ANALİZİ SAYFASI */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg relative overflow-hidden">
              {wearableDevice === "No wearable" && (
                <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-2xl mb-3">
                    ⌚
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Giyilebilir Cihaz Bağlı Değil</h4>
                  <p className="text-xs text-slate-400 max-w-md mb-4">
                    Bu Biyometri & HRV Analizi alanı en az 1 giyilebilir cihaz (Apple Watch, Oura, WHOOP vb.) bağlı olmadığı sürece çalışamaz.
                  </p>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Ayarlardan Cihaz Ekle →
                  </button>
                </div>
              )}

              <h3 className="text-base font-bold text-white mb-1">Biyometrik & Günlük HRV Analiz Grafiği</h3>
              <p className="text-xs text-slate-400 mb-6">Gün sonunda AI tarafından analiz edilen HRV trend verileriniz.</p>
              
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 490 140">
                  <polyline
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="3.5"
                    points={chartPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  {chartPoints.map((pt, i) => (
                    <circle key={i} cx={pt.x} cy={pt.y} r="5" className="fill-cyan-400 stroke-slate-950 stroke-2" />
                  ))}
                </svg>
              </div>

              <div className="mt-6 p-4 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  🤖 AI Biyometri Özet ve Fayda Analizi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  HRV (Kalp Hızı Değişkenliği), otonom sinir sisteminizin stres ve toparlanma dengesini ölçer. Yüksek HRV değeri (68+ bpm) vücudunuzun fiziksel ve zihinsel yüklere uyum sağlama kapasitesinin yüksek olduğunu gösterir. Yapay zeka sistemimiz gün sonunda verilerinizi analiz ederek yarınki ideal çalışma seanslarınızı önerir.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SOCIAL PARTY (10 KİŞİ) TAB */}
        {activeTab === "group" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👥</span>
                    <h3 className="text-lg font-bold text-white">{t.groupTitle}</h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{t.groupSub}</p>
                </div>
                {userPlan !== "plus" && (
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 hover:opacity-90 transition cursor-pointer"
                  >
                    Get Plus Membership
                  </button>
                )}
              </div>

              <div className="relative">
                {userPlan !== "plus" && (
                  <div className="absolute inset-0 z-20 bg-slate-950/70 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center rounded-xl border border-purple-500/30">
                    <div className="w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-2xl mb-3 shadow-lg shadow-purple-500/20">
                      🔒
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{t.lockedTitle}</h4>
                    <p className="text-xs text-slate-400 max-w-md mb-5">{t.lockedSub}</p>
                    <button
                      onClick={() => setShowUpgradeModal(true)}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-xl shadow-purple-500/30 transition transform hover:scale-105 cursor-pointer"
                    >
                      {t.getPlus}
                    </button>
                  </div>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${userPlan !== "plus" ? "select-none filter blur-sm opacity-40 pointer-events-none" : ""}`}>
                  {groupMembers.map((member) => (
                    <div key={member.id} className="p-4 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white text-xs">
                            {member.name.charAt(0)}
                          </div>
                          {member.online && (
                            <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-950 absolute bottom-0 right-0" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{member.name}</h4>
                          <p className="text-[11px] text-cyan-400 font-medium mt-0.5">{member.status}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] bg-slate-900 text-slate-300 px-2 py-0.5 rounded border border-slate-800 block">
                          Odak: {member.focus}
                        </span>
                        <span className="text-[10px] text-purple-400 font-mono block mt-1">
                          {member.hrv}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-4xl">
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec1Title}</h3>
              <div className="pt-4 border-t border-slate-800/80">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-bold text-white">{t.wearableTitle}</h4>
                  <span className="text-xs text-cyan-400 font-semibold">{wearableDevice}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                  <select
                    value={wearableDevice}
                    onChange={(e) => setWearableDevice(e.target.value)}
                    className="bg-transparent text-xs text-cyan-400 font-bold text-center focus:outline-none w-full cursor-pointer"
                  >
                    <option value="No wearable" className="bg-slate-900 text-white">No wearable (Cihaz Yok)</option>
                    <option value="Apple Watch Series 9" className="bg-slate-900 text-white">Apple Watch Series 9</option>
                    <option value="Samsung Galaxy Watch 6" className="bg-slate-900 text-white">Samsung Galaxy Watch 6</option>
                    <option value="WHOOP 4.0" className="bg-slate-900 text-white">WHOOP 4.0</option>
                  </select>
                </div>
              </div>
            </div>

            {/* HESAP VE GÜVENLİK BUTONLARI */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec3Title}</h3>
              <div className="space-y-2 text-xs font-medium">
                <button
                  onClick={() => alert("Bildirim Tercihleri: E-posta ve Anlık Bildirimler Aktif.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer"
                >
                  <span className="text-slate-300">{t.notifications}</span>
                  <span className="text-cyan-400 font-bold">Yapılandır →</span>
                </button>
                <button
                  onClick={() => alert("Gizlilik & Güvenlik: Uçtan uca şifreleme aktif.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer"
                >
                  <span className="text-slate-300">{t.privacy}</span>
                  <span className="text-cyan-400 font-bold">İncele →</span>
                </button>
                <button
                  onClick={() => alert("Destek Ekibi: support@omnisync.app adresine e-posta atabilirsiniz.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer"
                >
                  <span className="text-slate-300">{t.helpSupport}</span>
                  <span className="text-cyan-400 font-bold">İletişim →</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* EDIT RUTİN MODAL */}
      {editingHabit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">✏️ Rutini Düzenle</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Görev Adı</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Saat Aralığı</label>
                <input
                  type="text"
                  value={editTime}
                  onChange={(e) => setEditTime(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-mono"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingHabit(null)}
                className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs cursor-pointer"
              >
                İptal
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer"
              >
                Kaydet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN MODAL */}
      {isAdminOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-white">⚡ Developer Admin Pass</h3>
            <div className="space-y-3">
              <select
                value={selectedAdminPlan}
                onChange={(e) => setSelectedAdminPlan(e.target.value as any)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-sm text-white cursor-pointer"
              >
                <option value="free">Basic (Max 4 Rutin)</option>
                <option value="pro">OmniSync Pro (Max 10 Rutin)</option>
                <option value="plus">OmniSync Plus (Max 25 Rutin)</option>
              </select>
              <input
                type="password"
                placeholder="Şifre..."
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-sm text-white"
              />
              {adminError && <p className="text-xs text-red-400">{adminError}</p>}
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsAdminOpen(false)} className="px-4 py-2 text-xs text-slate-400 cursor-pointer">İptal</button>
              <button onClick={handleAdminBypass} className="px-4 py-2 bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl cursor-pointer">Etkinleştir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}