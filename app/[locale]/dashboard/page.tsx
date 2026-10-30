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
    focusLevelText: isTr ? "Zihinsel Odak Seviyesi (AI Belirlenir)" : "Mental Focus Level (AI Evaluated)",
    addHabitTitle: isTr ? "Yapay Zeka ile Otomatik Görev Ekle" : "Add Task Auto-Scheduled by AI",
    addHabitBtn: isTr ? "Yapay Zeka Akıllı Analiz Et ve Ekle" : "Add with AI Intelligent Scheduler",
    addingAl: isTr ? "AI Görevi Yorumluyor, Kategori & Seviye Belirliyor..." : "AI Analyzing Task, Category & Difficulty...",
    taskTitlePlaceholder: isTr ? "Görev Adı (Örn: 1.5 Saat Zor Fizik Denemesi Çöz)" : "Task Title (e.g. 1.5h Hard Physics Exam)",
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
    proF1: isTr ? "10 adede kadar otomatik zamanlanmış etkinlik & takvim eşitleme" : "Up to 10 auto-scheduled events & calendar sync",
    proF2: isTr ? "Otomatik DND & Odak Modu Eşitleme (Saat/Telefon)" : "Auto DND & Focus Mode Sync (Watch/Phone)",
    proF3: isTr ? "Günlük AI Sesli Sabah Özeti" : "Daily AI Voice Morning Briefing",
    proF4: isTr ? "Tükenmişlik Erken Uyarı Sistemi (3 günlük HRV)" : "Burnout Early Warning System (3-day HRV)",
    proF5: isTr ? "Sınırsız Pro AI Danışmanı" : "Unlimited Pro AI Advisor",
    proF6: isTr ? "Çoklu cihaz eşitleme (2+ cihaz)" : "Multi-device sync (2+ devices)",
    plusF1: isTr ? "25 etkinliğe kadar / sınırsız güç görevleri" : "Up to 25 events / unlimited power tasks",
    plusF2: isTr ? "Bio-Sync Partner Eşleşmesi" : "Bio-Sync Partner Matching",
    plusF3: isTr ? "Social Party Odak Odaları & Canlı Rutin Eşitleme" : "Social Party Focus Rooms & Live Routine Sync",
    plusF4: isTr ? "Öncelikli Sesli AI Danışmanı" : "Priority Voice Chat AI Consultant",
    plusF5: isTr ? "Dışa aktarılabilir HRV & Sağlık PDF Raporları" : "Exportable HRV & Health PDF Reports",
  };

  const daysOfWeek = [
    { id: "Pzt", label: isTr ? "Pazartesi" : "Monday", short: isTr ? "Pzt" : "Mon" },
    { id: "Sal", label: isTr ? "Salı" : "Tuesday", short: isTr ? "Sal" : "Tue" },
    { id: "Çar", label: isTr ? "Çarşamba" : "Wednesday", short: isTr ? "Çar" : "Wed" },
    { id: "Per", label: isTr ? "Perşembe" : "Thursday", short: isTr ? "Per" : "Thu" },
    { id: "Cum", label: isTr ? "Cuma" : "Friday", short: isTr ? "Cum" : "Fri" },
    { id: "Cmt", label: isTr ? "Cumartesi" : "Saturday", short: isTr ? "Cmt" : "Sat" },
    { id: "Paz", label: isTr ? "Pazar" : "Sunday", short: isTr ? "Paz" : "Sun" },
  ];

  // CİHAZ ANLIK SAAT VE TARİH BİLGİSİ
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [selectedDay, setSelectedDay] = useState<string>("Pzt");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString(isTr ? "tr-TR" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    setCurrentDateTime(formatted);

    // Cihazın bugünkü gününe otomatik eşitle
    const dayMap = [6, 0, 1, 2, 3, 4, 5]; // Pazar = 0 -> Paz
    const currentDayIndex = dayMap[now.getDay()];
    if (daysOfWeek[currentDayIndex]) {
      setSelectedDay(daysOfWeek[currentDayIndex].id);
    }
  }, []);

  const [userName, setUserName] = useState<string>("Kullanıcı");
  const [userEmail, setUserEmail] = useState<string>("demo@example.com");
  const [userPlan, setUserPlan] = useState<string>("free");
  const [userGoal, setUserGoal] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [updateMsg, setUpdateMsg] = useState<string>("");
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  // YAN MENÜ (HAMBURGER / DRAWER) STATE
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);

  const [healthSync, setHealthSync] = useState<boolean>(true);
  const [autoFocusSync, setAutoFocusSync] = useState<boolean>(true);
  const [aiVoiceBriefing, setAiVoiceBriefing] = useState<boolean>(true);
  const [sleepTarget, setSleepTarget] = useState<string>("8.0 Hours");
  const [caffeineBuffer, setCaffeineBuffer] = useState<string>("8.0 Hours before sleep");
  const [timezone, setTimezone] = useState<string>("Europe/Istanbul");
  const [wearableDevice, setWearableDevice] = useState<string>("No wearable");
  const [showUpgradeModal, setShowUpgradeModal] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"overview" | "habits" | "analytics" | "group" | "settings">("overview");

  // AI OTOMATİK ODAK SEVİYESİ VE ANALİZ STATE'LERİ
  const [aiEvaluatedFocus, setAiEvaluatedFocus] = useState<number | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState<boolean>(false);
  const [hrvScore] = useState<number>(68);

  // REAL-TIME CANLI AI TIP STATE
  const [realtimeAiTip, setRealtimeAiTip] = useState<string>("");
  const [isTipLoading, setIsTipLoading] = useState<boolean>(false);

  // RUTİN DÜZENLEME MODAL STATE'LERİ
  const [editingHabit, setEditingHabit] = useState<any | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editStart, setEditStart] = useState("08:00");
  const [editEnd, setEditEnd] = useState("09:00");

  // MANUEL OKUL/İŞ BLOKLARI İÇİN FORM STATE'LERİ
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

  // 🟢 24 SAAT MODÜLÜ DÜZELTMESİ (26:00 -> 02:00 HESAPLAMA)
  const formatTimeMinutes = (totalMin: number) => {
    const normalizedMin = ((totalMin % 1440) + 1440) % 1440;
    const h = Math.floor(normalizedMin / 60).toString().padStart(2, "0");
    const m = (normalizedMin % 60).toString().padStart(2, "0");
    return `${h}:${m}`;
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
        await supabase.auth.updateUser({
          data: { plan: selectedAdminPlan },
        });
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("omni_user_plan", selectedAdminPlan);
      }

      setUserPlan(selectedAdminPlan);
      alert(`Başarılı! Planınız "${selectedAdminPlan.toUpperCase()}" olarak değiştirildi.`);
      setIsAdminOpen(false);
      setAdminPassword("");
      setAdminError("");
      window.location.reload();
    } catch (error) {
      console.error("Admin bypass hatası:", error);
      setAdminError("Plan güncellenirken hata oluştu.");
    } finally {
      setAdminLoading(false);
    }
  };

  const [habits, setHabits] = useState<any[]>([]);
  const [isHabitsLoaded, setIsHabitsLoaded] = useState(false);

  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [aiScheduling, setAiScheduling] = useState<boolean>(false);

  // SEÇİLİ GÜNÜN RUTİNLERİ
  const currentDayHabits = habits.filter((h) => h.day === selectedDay);

  // 🟢 SUPABASE VE LOCAL STORAGE SYNC
  useEffect(() => {
    const fetchUserDataAndHabits = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || "Kullanıcı");
        setUserEmail(user.email || "demo@example.com");
        setUserPlan(user.user_metadata?.plan || "free");
        setUserGoal(user.user_metadata?.onboarding_goal || "");
        setUserAvatar(user.user_metadata?.avatar_url || user.user_metadata?.picture || "");
        
        if (user.user_metadata?.synced_habits) {
          setHabits(user.user_metadata.synced_habits);
        } else {
          const savedHabits = localStorage.getItem("omni_habits_dashboard");
          if (savedHabits) setHabits(JSON.parse(savedHabits));
        }
      } else {
        setUserName(localStorage.getItem("omni_user_name") || "Kullanıcı");
        setUserEmail(localStorage.getItem("omni_user_email") || "demo@example.com");
        setUserPlan(localStorage.getItem("omni_user_plan") || "free");
        setUserAvatar(localStorage.getItem("omni_user_avatar") || "");
        const savedHabits = localStorage.getItem("omni_habits_dashboard");
        if (savedHabits) setHabits(JSON.parse(savedHabits));
      }
      setIsHabitsLoaded(true);
      setLoading(false);
    };
    fetchUserDataAndHabits();
  }, []);

  const syncHabitsToCloud = async (updatedHabits: any[]) => {
    setHabits(updatedHabits);
    if (typeof window !== "undefined") {
      localStorage.setItem("omni_habits_dashboard", JSON.stringify(updatedHabits));
    }
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase.auth.updateUser({
          data: { synced_habits: updatedHabits }
        });
      }
    } catch (err) {
      console.error("Cloud sync hatası:", err);
    }
  };

  const evaluateFocusLevelWithAI = async (dayHabits: any[]) => {
    if (dayHabits.length < 4) {
      setAiEvaluatedFocus(null);
      return;
    }

    setIsAiEvaluating(true);
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const habitDescriptions = dayHabits.map(h => `${h.title} (Beyin Yükü: ${h.level}/5, Saat: ${h.suggestedTime})`).join(", ");
        const prompt = `
Sen OmniSync uygulamasının nöro-bilişsel AI analizörüsün.
Kullanıcının bugünkü görev listesi ve yoğunluğu: [${habitDescriptions}].
Günün görev çeşitliliğini, ders/iş yükünü, dinlenme aralıklarını ve zorluk derecelerini dikkate alarak kullanıcının bugünkü "Zihinsel Odak Seviyesini" (1 ile 5 arasında tam sayı) belirle.
SADECE RAKAM YAZ (Örn: 4). Başka hiçbir kelime veya açıklama yazma.
        `;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await res.json();
        const scoreStr = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        const parsed = parseInt(scoreStr, 10);
        if (!isNaN(parsed) && parsed >= 1 && parsed <= 5) {
          setAiEvaluatedFocus(parsed);
          setIsAiEvaluating(false);
          return;
        }
      } catch (err) {
        console.error("AI Odak Analiz hatası:", err);
      }
    }

    const totalLevel = dayHabits.reduce((acc, curr) => acc + (curr.level || 3), 0);
    const avg = Math.min(5, Math.max(1, Math.round(totalLevel / dayHabits.length)));
    setAiEvaluatedFocus(avg);
    setIsAiEvaluating(false);
  };

  useEffect(() => {
    if (isHabitsLoaded) {
      evaluateFocusLevelWithAI(currentDayHabits);
    }
  }, [selectedDay, habits, isHabitsLoaded]);

  const generateRealtimeTip = async (level: number | null) => {
    if (!level) return;
    setIsTipLoading(true);
    setRealtimeAiTip("");
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (apiKey) {
      try {
        const prompt = `Kullanıcının AI tarafından analiz edilmiş anlık zihinsel odak seviyesi: ${level}/5. Bu seviyedeki bir öğrenci/çalışan için tam şu an uygulanabilecek 1-2 cümlelik kişiselleştirilmiş, eyleme geçirici, özgün bir AI ritim ve odak tavsiyesi üret. Sadece tavsiye metnini yaz.`;
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
    const fallbackTips: Record<number, string> = {
      1: isTr ? "Anlık Analiz: Zihinsel enerjin bugün düşük seviyede. Hafif yürüyüş ve kitap okuma gibi düşük beyin yükü gerektiren rutinlere odaklan." : "AI Tip: Mental energy is low today. Focus on light activities like 15-minute walks or light reading.",
      2: isTr ? "Anlık Analiz: Hafif-orta zihinsel moddasın. Bugün rutin tekrar dersleri ve kelime ezberleri için harika bir gün." : "AI Tip: Light-moderate focus state. Ideal for vocabulary reviews and routine revision.",
      3: isTr ? "Anlık Analiz: Dengeli odak seviyesindesin. Pomodoro tekniği ile 1.5 saatlik verimli ders veya proje oturumunu kolayca tamamlayabilirsin." : "AI Tip: Balanced focus state. Use Pomodoro to comfortably complete study blocks.",
      4: isTr ? "Anlık Analiz: Yüksek zihinsel performans modundasın! Beyin karmaşık mantık yürütmeye ve ağır problem çözmeye hazır." : "AI Tip: High cognitive performance! Your brain is primed for complex logic and problem solving.",
      5: isTr ? "Anlık Analiz: MAKSİMUM DERİN ODAK! Bildirimleri kapat, DND moduna geç ve en az 2 saatlik kesintisiz deneme sınavı seansı başlat." : "AI Tip: PEAK FLOW STATE! Enable DND mode and initiate an uninterrupted deep study block."
    };
    setRealtimeAiTip(fallbackTips[level] || fallbackTips[3]);
    setIsTipLoading(false);
  };

  useEffect(() => {
    if (aiEvaluatedFocus) {
      generateRealtimeTip(aiEvaluatedFocus);
    }
  }, [aiEvaluatedFocus]);

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

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        setUserAvatar(base64String);
        if (typeof window !== "undefined") {
          localStorage.setItem("omni_user_avatar", base64String);
        }
        try {
          await supabase.auth.updateUser({
            data: { avatar_url: base64String }
          });
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
        await supabase.auth.updateUser({
          data: { plan: "free" },
        });
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

      if (user) {
        const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (user.email && validEmailRegex.test(user.email.trim())) {
          checkoutUrl += `?checkout[email]=${encodeURIComponent(user.email.trim())}&checkout[custom][user_id]=${user.id}`;
        }
      }
      window.location.href = checkoutUrl;
    } catch (error) {
      window.location.href = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("omni_user_name");
    localStorage.removeItem("omni_user_email");
    localStorage.removeItem("omni_user_avatar");
    localStorage.removeItem("omni_user_plan");
    router.push(`/${locale}`);
  };

  const toggleHabit = (id: number) => {
    const updated = habits.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h));
    syncHabitsToCloud(updated);
  };

  const deleteHabit = (id: number) => {
    const updated = habits.filter((h) => h.id !== id);
    syncHabitsToCloud(updated);
  };

  const openEditModal = (habit: any) => {
    setEditingHabit(habit);
    setEditTitle(habit.title);
    
    const match = habit.suggestedTime.match(/(\d\d:\d\d)\s*-\s*(\d\d:\d\d)/);
    if (match) {
      setEditStart(match[1]);
      setEditEnd(match[2]);
    } else {
      setEditStart("08:00");
      setEditEnd("09:00");
    }
  };

  const handleSaveEdit = () => {
    if (!editingHabit) return;
    const cleanTime = `${editStart} - ${editEnd}`;
    const updated = habits.map((h) =>
      h.id === editingHabit.id ? { ...h, title: editTitle, suggestedTime: cleanTime } : h
    );
    syncHabitsToCloud(updated);
    setEditingHabit(null);
  };

  const handleAddManualBlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualTitle.trim()) return;

    const maxAllowed = getPlanLimit(userPlan);
    if (currentDayHabits.length >= maxAllowed) {
      alert(isTr 
        ? `${selectedDay} günü için ${userPlan.toUpperCase()} planında en fazla ${maxAllowed} adet rutin ekleyebilirsiniz.` 
        : `Maximum ${maxAllowed} routines allowed per day for ${userPlan.toUpperCase()} plan.`);
      setShowUpgradeModal(true);
      return;
    }

    const cleanStart = normalizeTime(manualStart);
    const cleanEnd = normalizeTime(manualEnd);

    const newBlock = {
      id: Date.now(),
      day: selectedDay,
      title: manualTitle,
      category: isTr ? "Sabit Blok" : "Fixed Block",
      level: 3,
      suggestedTime: `${cleanStart} - ${cleanEnd}`,
      completed: false,
      isManual: true,
    };

    syncHabitsToCloud([...habits, newBlock]);
    setManualTitle("");
  };

  const parseDurationInMinutes = (title: string): number | null => {
    const tLower = title.toLowerCase();
    
    const hourMatch = tLower.match(/(\d+(?:[\.,]\d+)?)\s*(?:saat|st|hours|h)/);
    if (hourMatch) {
      const val = parseFloat(hourMatch[1].replace(",", "."));
      if (!isNaN(val)) return Math.round(val * 60);
    }
    
    const minMatch = tLower.match(/(\d+)\s*(?:dk|dakika|min|mins|minute|minutes)/);
    if (minMatch) {
      const val = parseInt(minMatch[1], 10);
      if (!isNaN(val)) return val;
    }

    return null;
  };

  const handleAddHabitAl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;

    const maxAllowed = getPlanLimit(userPlan);
    if (currentDayHabits.length >= maxAllowed) {
      alert(isTr 
        ? `${selectedDay} günü için ${userPlan.toUpperCase()} planında en fazla ${maxAllowed} adet rutin ekleyebilirsiniz.` 
        : `Maximum ${maxAllowed} routines allowed per day for ${userPlan.toUpperCase()} plan.`);
      setShowUpgradeModal(true);
      return;
    }

    setAiScheduling(true);

    const detectedDuration = parseDurationInMinutes(newHabitTitle);
    const existingSlots = currentDayHabits.map(h => `${h.title} (${h.suggestedTime})`).join(", ");
    
    let finalTimeSlot = "";
    let inferredCategory = "Verimlilik";
    let inferredLevel = 3;

    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (apiKey) {
      try {
        const promptText = `
Sen OmniSync'in Yapay Zeka Ritim Mimarısın.
Seçili gün (${selectedDay}) için mevcut dolu rutinler: [${existingSlots}].
Kullanıcının girdiği yeni görev metni: "${newHabitTitle}"

SAYIN AI, SENSEN ŞUNLARI YAZIŞSIZ OLARAK ANALİZ ET VE JSON FORMATINDA DÖNDÜR:
1. category: Görevin türü (Seçenekler: "Verimlilik", "Spor", "Sağlık", "Kişisel")
2. level: Görevin gerektirdiği zihinsel/fiziksel güç seviyesi (1 ile 5 arası sayı)
3. timeSlot: 24 saatlik gün içine çakışmayacak başlangıç ve bitiş saati (Örn: "14:00 - 15:30")
${detectedDuration ? `DİKKAT: Görev süresi kesin olarak ${detectedDuration} dakika olmalıdır.` : ""}

SADECE ŞU JSON'I DÖNDÜR:
{"category": "Verimlilik", "level": 4, "timeSlot": "14:00 - 15:30"}
        `;

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
        });

        const data = await res.json();
        const aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
        
        if (aiResponseText) {
          const cleanJson = aiResponseText.substring(
            aiResponseText.indexOf("{"),
            aiResponseText.lastIndexOf("}") + 1
          );
          const parsed = JSON.parse(cleanJson);
          if (parsed.timeSlot) {
            const parts = parsed.timeSlot.split("-").map((p: string) => p.trim());
            if (parts.length === 2) {
              const parseMin = (tStr: string) => {
                const [hh, mm] = tStr.split(":").map(Number);
                return (hh || 0) * 60 + (mm || 0);
              };
              finalTimeSlot = `${formatTimeMinutes(parseMin(parts[0]))} - ${formatTimeMinutes(parseMin(parts[1]))}`;
            } else {
              finalTimeSlot = parsed.timeSlot.replace(/\./g, ":");
            }
          }
          if (parsed.category) inferredCategory = parsed.category;
          if (parsed.level) inferredLevel = Number(parsed.level);
        }
      } catch (err) {
        console.error("AI Akıllı Analiz hatası:", err);
      }
    }

    if (!finalTimeSlot) {
      let durationMinutes = detectedDuration || 60;
      let startMin = 16 * 60;

      const isOverlapping = (testStart: number, testEnd: number) => {
        return currentDayHabits.some(h => {
          const formattedSlot = h.suggestedTime.replace(/\./g, ":");
          const match = formattedSlot.match(/(\d\d):(\d\d)\s*-\s*(\d\d):(\d\d)/);
          if (!match) return false;
          const hStart = parseInt(match[1]) * 60 + parseInt(match[2]);
          const hEnd = parseInt(match[3]) * 60 + parseInt(match[4]);
          return Math.max(testStart, hStart) < Math.min(testEnd, hEnd) + 15;
        });
      };

      while (isOverlapping(startMin, startMin + durationMinutes) && startMin < 23 * 60) {
        startMin += 30;
      }

      finalTimeSlot = `${formatTimeMinutes(startMin)} - ${formatTimeMinutes(startMin + durationMinutes)}`;
    }

    const newHabitObj = {
      id: Date.now(),
      day: selectedDay,
      title: newHabitTitle,
      category: inferredCategory,
      level: inferredLevel,
      suggestedTime: finalTimeSlot,
      completed: false,
      isManual: false,
    };

    syncHabitsToCloud([...habits, newHabitObj]);
    setNewHabitTitle("");
    setAiScheduling(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const chartPoints = [
    { day: isTr ? "Pzt" : "Mon", score: "6/10", x: 10, y: 90 },
    { day: isTr ? "Sal" : "Tue", score: "8/10", x: 88, y: 50 },
    { day: isTr ? "Çar" : "Wed", score: "4/10", x: 166, y: 110 },
    { day: isTr ? "Per" : "Thu", score: "9/10", x: 244, y: 35 },
    { day: isTr ? "Cum" : "Fri", score: "10/10", x: 322, y: 20 },
    { day: isTr ? "Cmt" : "Sat", score: "7/10", x: 400, y: 65 },
    { day: isTr ? "Paz" : "Sun", score: "8/10", x: 480, y: 50 },
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans relative">
      
      {/* YAPIŞKAN (FIXED) HAMBURGER MENÜ BUTONU */}
      <button
        type="button"
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 left-4 z-50 p-3 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-cyan-400 rounded-xl shadow-2xl backdrop-blur-md transition-all flex items-center justify-center cursor-pointer group"
        title="Sekme Menüsü"
      >
        {isNavOpen ? (
          <span className="text-xl font-black">✕</span>
        ) : (
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-cyan-400 transition-transform group-hover:scale-110"></span>
            <span className="block w-6 h-0.5 bg-cyan-400 transition-transform group-hover:scale-110"></span>
            <span className="block w-6 h-0.5 bg-cyan-400 transition-transform group-hover:scale-110"></span>
          </div>
        )}
      </button>

      {/* BACKDROP OVERLAY */}
      {isNavOpen && (
        <div 
          onClick={() => setIsNavOpen(false)}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden transition-opacity"
        />
      )}

      {/* SIDEBAR */}
      <aside className={`fixed md:sticky top-0 left-0 h-screen w-72 bg-slate-900/95 border-r border-slate-800/80 p-6 flex flex-col justify-between shrink-0 z-40 transition-transform duration-300 ease-in-out backdrop-blur-xl ${isNavOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}`}>
        <div className="pt-12 md:pt-0">
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

          <nav className="space-y-2">
            <button
              onClick={() => { setActiveTab("overview"); setIsNavOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "overview" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>📊</span> {t.overview}
            </button>
            <button
              onClick={() => { setActiveTab("habits"); setIsNavOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "habits" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>⚡</span> {t.habits}
            </button>
            <button
              onClick={() => { setActiveTab("analytics"); setIsNavOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "analytics" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>📈</span> {t.analytics}
            </button>
            <button
              onClick={() => { setActiveTab("group"); setIsNavOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "group" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span>👥</span> {t.group}
            </button>
            <button
              onClick={() => { setActiveTab("settings"); setIsNavOpen(false); }}
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
      <main className="flex-1 p-6 md:p-10 pl-16 md:pl-10 overflow-y-auto space-y-8">
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
              {currentDateTime && <span className="block text-[11px] text-amber-400 font-mono mt-1">🗓️ Cihaz Zamanı: {currentDateTime}</span>}
            </p>
          </div>
          <button
            onClick={() => setShowUpgradeModal(true)}
            className="cursor-pointer hover:opacity-90 transition text-left"
          >
            {userPlan === "plus" ? (
              <span className="px-4 py-1.5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs rounded-full shadow-lg shadow-purple-500/20 flex items-center gap-1.5 border border-purple-400/30">
                Plus Member ({currentDayHabits.length}/{getPlanLimit(userPlan)} Günlük)
              </span>
            ) : userPlan === "pro" ? (
              <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold text-xs rounded-full shadow-lg shadow-cyan-500/10 flex items-center gap-1.5">
                Pro Member ({currentDayHabits.length}/{getPlanLimit(userPlan)} Günlük)
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 font-medium text-xs rounded-full flex items-center gap-1">
                Basic ($0) ({currentDayHabits.length}/{getPlanLimit(userPlan)} Günlük)
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
                  <span>{t.completedRoutines} ({selectedDay})</span>
                  <span>✅</span>
                </div>
                <div className="text-2xl font-black text-cyan-400 mt-2">
                  {currentDayHabits.filter((h) => h.completed).length} / {currentDayHabits.length}
                </div>
              </div>

              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>HRV Score (3-day)</span>
                  <span>❤️</span>
                </div>
                {wearableDevice === "No wearable" ? (
                  <div className="mt-2 flex items-center gap-2 text-slate-500 text-xs font-bold italic">
                    🔒 Cihaz Bağlı Değil
                  </div>
                ) : (
                  <div className="text-2xl font-black text-purple-400 mt-2">{hrvScore} bpm</div>
                )}
              </div>

              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.focusLevelText}</span>
                  <span>🧠</span>
                </div>
                {currentDayHabits.length < 4 ? (
                  <div className="mt-2 text-xs font-bold text-amber-400">
                    🔒 En az 4 görev girilmelidir ({currentDayHabits.length}/4)
                  </div>
                ) : isAiEvaluating ? (
                  <div className="mt-2 text-xs font-bold text-cyan-400 animate-pulse">
                    ⚡ AI Seviyeyi Hesaplıyor...
                  </div>
                ) : (
                  <div className="text-2xl font-black text-indigo-400 mt-2">
                    Sev. {aiEvaluatedFocus}/5
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    📊 Haftalık Ritim Çizelgesi (00:00 - 24:00)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Haftanın istediğiniz gününe tıklayarak o günün planını inceleyebilir ve düzenleyebilirsiniz.
                  </p>
                </div>
                <div className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1.5 rounded-xl border border-cyan-500/20">
                  {selectedDay} Limiti: {currentDayHabits.length}/{getPlanLimit(userPlan)}
                </div>
              </div>

              <div className="grid grid-cols-7 gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                {daysOfWeek.map((day) => (
                  <button
                    key={day.id}
                    onClick={() => setSelectedDay(day.id)}
                    className={`py-2 rounded-lg text-xs font-bold transition text-center cursor-pointer ${selectedDay === day.id ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md" : "text-slate-400 hover:bg-slate-900"}`}
                  >
                    <span className="block">{day.short}</span>
                  </button>
                ))}
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950">
                <div className="grid grid-cols-4 sm:grid-cols-8 border-b border-slate-800 bg-slate-900/90 text-[11px] font-bold text-cyan-400 text-center py-2.5">
                  <span className="border-r border-slate-800">Saatler</span>
                  <span className="col-span-3 sm:col-span-7">{selectedDay} Günü Planları & Aktiviteleri</span>
                </div>
                <div className="divide-y divide-slate-800/60 max-h-96 overflow-y-auto">
                  {timeSlots.map((slot) => {
                    const currentHour = parseInt(slot.split(":")[0]);
                    const firstHalfMin = currentHour * 60;
                    const secondHalfMin = currentHour * 60 + 30;

                    const getSlotHabits = (startCheck: number, endCheck: number) => {
                      return currentDayHabits.filter((h) => {
                        const normalizedSlot = h.suggestedTime.replace(/\./g, ":");
                        const match = normalizedSlot.match(/(\d\d):(\d\d)\s*-\s*(\d\d):(\d\d)/);
                        if (!match) return false;
                        
                        let startH = parseInt(match[1]) * 60 + parseInt(match[2]);
                        let endH = parseInt(match[3]) * 60 + parseInt(match[4]);
                        
                        if (startH > endH) {
                          return (startCheck >= startH || endCheck <= endH);
                        } else {
                          return Math.max(startCheck, startH) < Math.min(endCheck, endH);
                        }
                      });
                    };

                    const firstHalfHabits = getSlotHabits(firstHalfMin, firstHalfMin + 30);
                    const secondHalfHabits = getSlotHabits(secondHalfMin, secondHalfMin + 30);

                    return (
                      <div key={slot} className="grid grid-cols-4 sm:grid-cols-8 text-xs py-2 px-3 items-center hover:bg-slate-900/40 transition border-b border-slate-800/40">
                        <span className="font-mono text-slate-400 text-[11px] border-r border-slate-800/80 pr-2">{slot}</span>
                        <div className="col-span-3 sm:col-span-7 pl-3 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-mono text-slate-500 w-10 shrink-0">:00-:30</span>
                            {firstHalfHabits.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {firstHalfHabits.map((h) => (
                                  <span key={h.id} className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${h.isManual ? "bg-amber-500/10 text-amber-300 border-amber-500/30" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"}`}>
                                    {h.isManual ? "📌 " : "⚡ "} {h.title} ({h.suggestedTime})
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-700 italic text-[10px]">—</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 pt-0.5 border-t border-slate-900">
                            <span className="text-[9px] font-mono text-slate-500 w-10 shrink-0">:30-:00</span>
                            {secondHalfHabits.length > 0 ? (
                              <div className="flex flex-wrap gap-1.5">
                                {secondHalfHabits.map((h) => (
                                  <span key={h.id} className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${h.isManual ? "bg-amber-500/10 text-amber-300 border-amber-500/30" : "bg-cyan-500/10 text-cyan-300 border-cyan-500/30"}`}>
                                    {h.isManual ? "📌 " : "⚡ "} {h.title} ({h.suggestedTime})
                                  </span>
                                ))}
                              </div>
                            ) : (
                              <span className="text-slate-700 italic text-[10px]">—</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
              <h3 className="text-sm font-bold text-amber-400 mb-1">🏫 Manuel Sabit Saat Ekle ({selectedDay} Günü İçin)</h3>
              <p className="text-xs text-slate-400 mb-4">Örneğin 22:30 - 07:00 arası uyku saatini veya 08:00 - 15:20 arası okul saatini ekleyin.</p>
              <form onSubmit={handleAddManualBlock} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <input
                  type="text"
                  placeholder="Etkinlik Adı (Örn: Gece Uykusu / Okul)"
                  value={manualTitle}
                  onChange={(e) => setManualTitle(e.target.value)}
                  className="sm:col-span-2 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-amber-500 transition"
                />
                <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 px-3 py-1 rounded-xl">
                  <input 
                    type="time" 
                    value={manualStart} 
                    onChange={(e) => setManualStart(e.target.value)} 
                    className="bg-transparent text-center text-xs text-amber-400 font-mono focus:outline-none w-full cursor-pointer" 
                  />
                  <span className="text-xs text-slate-500">-</span>
                  <input 
                    type="time" 
                    value={manualEnd} 
                    onChange={(e) => setManualEnd(e.target.value)} 
                    className="bg-transparent text-center text-xs text-amber-400 font-mono focus:outline-none w-full cursor-pointer" 
                  />
                </div>
                <button type="submit" className="py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs transition cursor-pointer">
                  {isTr ? "Sabit Blok Ekle" : "Add Fixed Block"}
                </button>
              </form>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base font-bold text-white">
                    {isTr ? "Aktif Rutinleriniz" : "Your Active Routines"} ({selectedDay})
                  </h3>
                  <button onClick={() => setActiveTab("habits")} className="text-xs text-cyan-400 hover:underline font-semibold cursor-pointer">
                    {isTr ? "Tümünü Yönet →" : "Manage All →"}
                  </button>
                </div>
                
                {currentDayHabits.length === 0 ? (
                  <div className="text-center py-8 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                    {isTr ? `${selectedDay} günü için eklenmiş rutin bulunmuyor.` : "No routines for this day."}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentDayHabits.map((habit) => (
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
                  <h3 className="text-base font-bold text-white mb-2">YOUR MEMBERSHIP</h3>
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
                      <span className="text-slate-400">{selectedDay} Günlük Kullanım:</span>
                      <span className="font-bold text-amber-400">{currentDayHabits.length} / {getPlanLimit(userPlan)}</span>
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
                    Seviye, yapay zeka tarafından günün görev yükü analiz edilerek otomatik belirlenir.
                  </p>
                </div>
                {aiEvaluatedFocus && (
                  <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                    AI Değerlendirmesi: Sev. {aiEvaluatedFocus}
                  </span>
                )}
              </div>

              <div className="p-4 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-indigo-950/60 border border-cyan-500/40 rounded-xl shadow-md">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">🤖</span>
                    <div>
                      <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">
                        {isTr ? "Canlı AI Üretimi Odak İpucu" : "Realtime AI Generated Tip"}
                      </h4>
                      <p className="text-xs text-slate-200 leading-relaxed font-medium">
                        {currentDayHabits.length < 4
                          ? "Zihinsel Odak analizi ve AI ipuçlarının aktifleşmesi için seçili güne en az 4 görev eklemelisiniz."
                          : isTipLoading
                          ? "AI anlık durumunuzu analiz ediyor ve tavsiye üretiyor..."
                          : realtimeAiTip}
                      </p>
                    </div>
                  </div>
                  {aiEvaluatedFocus && (
                    <button
                      type="button"
                      onClick={() => generateRealtimeTip(aiEvaluatedFocus)}
                      className="p-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 rounded-lg text-xs font-bold transition cursor-pointer shrink-0"
                      title="Yeni İpucu Üret"
                    >
                      🔄
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🤖</span>
                  <h3 className="text-base font-bold text-white">{t.addHabitTitle} ({selectedDay})</h3>
                </div>
                <span className="text-xs font-bold text-cyan-400">
                  ({currentDayHabits.length}/{getPlanLimit(userPlan)} {isTr ? "Rutin" : "Routines"})
                </span>
              </div>
              <form onSubmit={handleAddHabitAl} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder={t.taskTitlePlaceholder}
                  value={newHabitTitle}
                  onChange={(e) => setNewHabitTitle(e.target.value)}
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition"
                />
                <button
                  type="submit"
                  disabled={aiScheduling}
                  className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold rounded-xl text-xs shadow-lg shadow-cyan-500/20 transition hover:opacity-95 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {aiScheduling ? <span>{t.addingAl}</span> : <span>{t.addHabitBtn}</span>}
                </button>
              </form>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg space-y-4">
              <h3 className="text-base font-bold text-white">{isTr ? "Aktif Rutinleriniz" : "Your Active Routines"} ({selectedDay})</h3>
              {currentDayHabits.length === 0 ? (
                <div className="text-center py-6 text-slate-500 text-xs border border-dashed border-slate-800 rounded-xl">
                  {isTr ? `${selectedDay} günü için aktif rutin bulunmuyor.` : "No active routines for this day."}
                </div>
              ) : (
                <div className="space-y-3">
                  {currentDayHabits.map((habit) => (
                    <div
                      key={habit.id}
                      className="p-4 rounded-xl border border-slate-800 bg-slate-950 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                          {habit.isManual && <span className="text-amber-400 text-[10px] font-bold">[Sabit]</span>}
                          {habit.title}
                        </div>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">{habit.category}</span>
                          <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-bold">Beyin Yükü: Sev. {habit.level}</span>
                          <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono font-bold">Saat: {habit.suggestedTime}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => openEditModal(habit)}
                          className="px-2.5 py-1.5 bg-slate-800 hover:bg-cyan-500/20 text-cyan-400 border border-slate-700 font-bold rounded-lg text-xs transition cursor-pointer"
                        >
                          ✏️
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteHabit(habit.id)}
                          className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-lg text-xs transition cursor-pointer"
                        >
                          {isTr ? "Sil" : "Delete"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
                    Biyometri & HRV Analizi grafik alanı en az 1 giyilebilir cihaz (Apple Watch, Oura, WHOOP vb.) sisteme tanımlandığında aktifleşir.
                  </p>
                  <button
                    onClick={() => setActiveTab("settings")}
                    className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl cursor-pointer"
                  >
                    Ayarlardan Cihaz Ekle →
                  </button>
                </div>
              )}

              <h3 className="text-base font-bold text-white mb-1">Performance & HRV Trend Chart</h3>
              <p className="text-xs text-slate-400 mb-6">
                {isTr ? "Pazartesi ve Pazar dahil günlerin hizasına tam oturan kesintisiz çizgi grafiği." : "Seamless line chart spanning from Mon to Sun."}
              </p>
              <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-6 relative overflow-hidden">
                <svg className="w-full h-44 overflow-visible" viewBox="0 0 490 140">
                  <line x1="10" y1="20" x2="480" y2="20" stroke="#1e293b" strokeDasharray="3" />
                  <line x1="10" y1="65" x2="480" y2="65" stroke="#1e293b" strokeDasharray="3" />
                  <line x1="10" y1="110" x2="480" y2="110" stroke="#1e293b" strokeDasharray="3" />
                  <polyline
                    fill="none"
                    stroke="url(#chartGradient)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={chartPoints.map((p) => `${p.x},${p.y}`).join(" ")}
                  />
                  <defs>
                    <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22d3ee" />
                      <stop offset="50%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#10b981" />
                    </linearGradient>
                  </defs>
                  {chartPoints.map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" className="fill-cyan-400 stroke-slate-950 stroke-2" />
                      <text x={pt.x} y={pt.y - 10} textAnchor="middle" className="text-[9px] fill-cyan-300 font-bold">
                        {pt.score}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="flex justify-between text-[11px] text-slate-400 font-semibold mt-4 pt-2 border-t border-slate-800">
                  {chartPoints.map((pt, idx) => (
                    <span key={idx} className="w-8 text-center">{pt.day}</span>
                  ))}
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                  🤖 AI Biyometri Özet ve Fayda Analizi
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  HRV (Kalp Hızı Değişkenliği), otonom sinir sisteminizin stres ve toparlanma dengesini ölçer. Yüksek HRV score (68+ bpm) vücudunuzun fiziksel ve zihinsel yüklere uyum sağlama kapasitesinin yüksek olduğunu gösterir. AI modelimiz gün sonunda verilerinizi analiz ederek yarınki ideal çalışma seanslarınızı önerir.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* GROUP TAB */}
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
            {updateMsg && (
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-bold">
                {updateMsg}
              </div>
            )}
            
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec1Title}</h3>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.appleHealth}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.appleHealthSub}</p>
                </div>
                <button
                  onClick={() => setHealthSync(!healthSync)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${healthSync ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${healthSync ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.autoFocus}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.autoFocusSub}</p>
                </div>
                <button
                  onClick={() => setAutoFocusSync(!autoFocusSync)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${autoFocusSync ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoFocusSync ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
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
                    <option value="Apple Watch Ultra 2" className="bg-slate-900 text-white">Apple Watch Ultra 2</option>
                    <option value="Google Pixel Watch 2" className="bg-slate-900 text-white">Google Pixel Watch 2</option>
                    <option value="Samsung Galaxy Watch 6" className="bg-slate-900 text-white">Samsung Galaxy Watch 6</option>
                    <option value="Garmin Forerunner 965" className="bg-slate-900 text-white">Garmin Forerunner 965</option>
                    <option value="WHOOP 4.0" className="bg-slate-900 text-white">WHOOP 4.0</option>
                    <option value="Oura Ring Gen 3" className="bg-slate-900 text-white">Oura Ring Gen 3</option>
                    <option value="Fitbit Charge 6" className="bg-slate-900 text-white">Fitbit Charge 6</option>
                    <option value="Amazfit T-Rex 2" className="bg-slate-900 text-white">Amazfit T-Rex 2</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-2">{t.swipeScroll}</p>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec2Title}</h3>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-white">{t.sleepTargetTitle}</h4>
                  <span className="text-xs text-cyan-400 font-bold">{sleepTarget}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                  <select
                    value={sleepTarget}
                    onChange={(e) => setSleepTarget(e.target.value)}
                    className="bg-transparent text-xs text-cyan-400 font-bold text-center focus:outline-none w-full cursor-pointer"
                  >
                    <option value="5.0 Hours" className="bg-slate-900 text-white">5.0 Hours (5 Saat)</option>
                    <option value="5.5 Hours" className="bg-slate-900 text-white">5.5 Hours (5.5 Saat)</option>
                    <option value="6.0 Hours" className="bg-slate-900 text-white">6.0 Hours (6 Saat)</option>
                    <option value="6.5 Hours" className="bg-slate-900 text-white">6.5 Hours (6.5 Saat)</option>
                    <option value="7.0 Hours" className="bg-slate-900 text-white">7.0 Hours (7 Saat)</option>
                    <option value="7.5 Hours" className="bg-slate-900 text-white">7.5 Hours (7.5 Saat)</option>
                    <option value="8.0 Hours" className="bg-slate-900 text-white">8.0 Hours (8 Saat)</option>
                    <option value="8.5 Hours" className="bg-slate-900 text-white">8.5 Hours (8.5 Saat)</option>
                    <option value="9.0 Hours" className="bg-slate-900 text-white">9.0 Hours (9 Saat)</option>
                    <option value="9.5 Hours" className="bg-slate-900 text-white">9.5 Hours (9.5 Saat)</option>
                    <option value="10.0 Hours" className="bg-slate-900 text-white">10.0 Hours (10 Saat)</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-2">{t.swipeScroll}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-white">{t.caffeineTitle}</h4>
                  <span className="text-xs text-cyan-400 font-bold">{caffeineBuffer}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                  <select
                    value={caffeineBuffer}
                    onChange={(e) => setCaffeineBuffer(e.target.value)}
                    className="bg-transparent text-xs text-cyan-400 font-bold text-center focus:outline-none w-full cursor-pointer"
                  >
                    <option value={`5.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">5.0 {t.hoursBeforeSleep}</option>
                    <option value={`5.5 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">5.5 {t.hoursBeforeSleep}</option>
                    <option value={`6.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">6.0 {t.hoursBeforeSleep}</option>
                    <option value={`6.5 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">6.5 {t.hoursBeforeSleep}</option>
                    <option value={`7.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">7.0 {t.hoursBeforeSleep}</option>
                    <option value={`7.5 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">7.5 {t.hoursBeforeSleep}</option>
                    <option value={`8.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">8.0 {t.hoursBeforeSleep}</option>
                    <option value={`8.5 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">8.5 {t.hoursBeforeSleep}</option>
                    <option value={`9.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">9.0 {t.hoursBeforeSleep}</option>
                    <option value={`9.5 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">9.5 {t.hoursBeforeSleep}</option>
                    <option value={`10.0 ${t.hoursBeforeSleep}`} className="bg-slate-900 text-white">10.0 {t.hoursBeforeSleep}</option>
                  </select>
                  <p className="text-[10px] text-slate-500 mt-2">{t.swipeScroll}</p>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-white">{t.timezoneTitle}</h4>
                  <span className="text-xs text-cyan-400 font-bold">{timezone}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-center">
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="bg-transparent text-xs text-cyan-400 font-bold text-center focus:outline-none w-full cursor-pointer"
                  >
                    <option value="Europe/Istanbul" className="bg-slate-900 text-white">Europe/Istanbul (İstanbul, Türkiye)</option>
                    <option value="Europe/Berlin" className="bg-slate-900 text-white">Europe/Berlin (Berlin, Almanya)</option>
                    <option value="Europe/London" className="bg-slate-900 text-white">Europe/London (Londra, İngiltere)</option>
                    <option value="Europe/Paris" className="bg-slate-900 text-white">Europe/Paris (Paris, Fransa)</option>
                    <option value="America/New_York" className="bg-slate-900 text-white">America/New_York (New York, ABD)</option>
                    <option value="America/Los_Angeles" className="bg-slate-900 text-white">America/Los_Angeles (Los Angeles, ABD)</option>
                    <option value="Asia/Tokyo" className="bg-slate-900 text-white">Asia/Tokyo (Tokyo, Japonya)</option>
                    <option value="Asia/Dubai" className="bg-slate-900 text-white">Asia/Dubai (Dubai, BAE)</option>
                    <option value="Asia/Singapore" className="bg-slate-900 text-white">Asia/Singapore (Singapur)</option>
                    <option value="Australia/Sydney" className="bg-slate-900 text-white">Australia/Sydney (Sidney, Avustralya)</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-slate-800/80">
                <div>
                  <h4 className="text-sm font-bold text-white">{t.aiVoiceTitle}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">{t.aiVoiceSub}</p>
                </div>
                <button
                  onClick={() => setAiVoiceBriefing(!aiVoiceBriefing)}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${aiVoiceBriefing ? "bg-cyan-500" : "bg-slate-800"}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${aiVoiceBriefing ? "translate-x-6" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec3Title}</h3>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-bold text-white">{t.linkedAccounts}</div>
                <div className="text-xs text-slate-300">{t.connectedAs} <span className="text-cyan-400">{userEmail}</span></div>
                <div className="text-[10px] text-slate-500">{t.demoSession}</div>
              </div>
              <div className="space-y-2 text-xs font-medium">
                <button
                  onClick={() => alert("Bildirim Tercihleri: E-posta ve Anlık Bildirimler Aktif.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer text-left"
                >
                  <span className="text-slate-300">{t.notifications}</span>
                  <span className="text-cyan-400 font-bold">Yapılandır →</span>
                </button>
                <button
                  onClick={() => alert("Gizlilik & Güvenlik: Uçtan uca şifreleme aktif.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer text-left"
                >
                  <span className="text-slate-300">{t.privacy}</span>
                  <span className="text-cyan-400 font-bold">İncele →</span>
                </button>
                <button
                  onClick={() => alert("Destek Ekibi: support@omnisync.app adresine e-posta atabilirsiniz.")}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center hover:border-cyan-500 transition cursor-pointer text-left"
                >
                  <span className="text-slate-300">{t.helpSupport}</span>
                  <span className="text-cyan-400 font-bold">İletişim →</span>
                </button>
              </div>
            </div>

            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
              <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">🛠️ Geliştirici Modu (Admin Plan Geçişi)</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Test amacıyla ödeme yapmadan hesaba Pro veya Plus plan tanımlayın.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAdminOpen(true)}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-lg transition cursor-pointer"
                >
                  Plan Değiştir
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.membershipHeader}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.activePlan}: <span className="text-white font-bold uppercase">{(userPlan === 'free' || userPlan === 'basic') ? 'Basic ($0)' : userPlan}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 bg-slate-950 p-2 border border-slate-800 rounded-xl">
                  <span className={`text-xs font-bold ${!isAnnual ? "text-cyan-400" : "text-slate-400"}`}>{t.monthly}</span>
                  <button
                    onClick={() => setIsAnnual(!isAnnual)}
                    className={`w-12 h-6 rounded-full transition-colors relative p-1 cursor-pointer ${isAnnual ? "bg-emerald-500" : "bg-slate-800"}`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${isAnnual ? "translate-x-6" : "translate-x-0"}`} />
                  </button>
                  <span className={`text-xs font-bold ${isAnnual ? "text-emerald-400" : "text-slate-400"}`}>
                    {t.annual} <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/30">{t.save20}</span>
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`p-6 rounded-2xl border-2 relative flex flex-col justify-between ${userPlan === "pro" ? "border-cyan-400 bg-slate-950 shadow-lg shadow-cyan-500/10" : "border-cyan-500/50 bg-slate-950/80"}`}>
                  <span className="absolute -top-3 right-4 bg-cyan-400 text-slate-950 font-black text-[10px] px-3 py-0.5 rounded-full uppercase tracking-wider shadow-md">
                    {t.mostPopular}
                  </span>
                  <div>
                    <h4 className="text-sm font-black text-cyan-400 tracking-wider">{t.proTitle}</h4>
                    <div className="my-3">
                      <span className="text-3xl font-black text-white">
                        {isAnnual ? "$4" : "$5"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium"> {t.perMonth}</span>
                      {isAnnual && <span className="block text-[10px] text-emerald-400 font-bold mt-0.5">{t.billedAnnuallyPro}</span>}
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-4 mb-3 flex items-center gap-1.5">
                      {t.proHeader}
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2.5">
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> Günlük 10 adede kadar otomatik zamanlanmış etkinlik</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> {t.proF2}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> {t.proF3}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> {t.proF4}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> {t.proF5}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400">✓</span> {t.proF6}</li>
                    </ul>
                  </div>
                  <button
                    disabled={userPlan === "pro"}
                    onClick={() => handleChangePlan("pro")}
                    className="mt-6 w-full py-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-extrabold rounded-xl text-xs transition shadow-lg shadow-cyan-400/20 disabled:opacity-50 cursor-pointer"
                  >
                    {userPlan === "pro" ? t.activePlan : t.trialBtn}
                  </button>
                </div>

                <div className={`p-6 rounded-2xl border-2 relative flex flex-col justify-between ${userPlan === "plus" ? "border-purple-500 bg-slate-950 shadow-lg shadow-purple-500/10" : "border-purple-500/40 bg-slate-950/80"}`}>
                  <div>
                    <h4 className="text-sm font-black text-purple-400 tracking-wider">{t.plusTitle}</h4>
                    <div className="my-3">
                      <span className="text-3xl font-black text-white">
                        {isAnnual ? "$6.4" : "$8"}
                      </span>
                      <span className="text-xs text-slate-400 font-medium"> {t.perMonth}</span>
                      {isAnnual && <span className="block text-[10px] text-emerald-400 font-bold mt-0.5">{t.billedAnnuallyPlus}</span>}
                    </div>
                    <div className="text-xs font-bold text-slate-200 mt-4 mb-3 flex items-center gap-1.5">
                      {t.plusHeader}
                    </div>
                    <ul className="text-xs text-slate-300 space-y-2.5">
                      <li className="flex items-start gap-2"><span className="text-purple-400">✓</span> Günlük 25 etkinliğe kadar / sınırsız güç görevleri</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400">✓</span> {t.plusF2}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400">✓</span> {t.plusF3}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400">✓</span> {t.plusF4}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400">✓</span> {t.plusF5}</li>
                    </ul>
                  </div>
                  <button
                    disabled={userPlan === "plus"}
                    onClick={() => handleChangePlan("plus")}
                    className="mt-6 w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs transition shadow-lg shadow-purple-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    {userPlan === "plus" ? t.activePlan : t.getPlusBtn}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* RUTİN DÜZENLEME MODALI */}
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
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Saat Aralığı (Başlangıç ve Bitiş)</label>
                <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 p-2 rounded-xl">
                  <input
                    type="time"
                    value={editStart}
                    onChange={(e) => setEditStart(e.target.value)}
                    className="bg-transparent text-center text-xs text-amber-400 font-mono focus:outline-none w-full cursor-pointer"
                  />
                  <span className="text-xs text-slate-500">-</span>
                  <input
                    type="time"
                    value={editEnd}
                    onChange={(e) => setEditEnd(e.target.value)}
                    className="bg-transparent text-center text-xs text-amber-400 font-mono focus:outline-none w-full cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingHabit(null)}
                className="px-4 py-2 bg-slate-800 text-slate-400 rounded-xl text-xs cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
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
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">⚡ Developer Admin Pass</h3>
              <p className="text-xs text-slate-400 mt-0.5">Test amacıyla planınızı anında değiştirin.</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Atanacak Plan</label>
                <select
                  value={selectedAdminPlan}
                  onChange={(e) => setSelectedAdminPlan(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="free">Basic (Günlük Max 4 Rutin)</option>
                  <option value="pro">OmniSync Pro (Günlük Max 10 Rutin)</option>
                  <option value="plus">OmniSync Plus (Günlük Max 25 Rutin)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Admin Şifresi</label>
                <input
                  type="password"
                  placeholder="Şifreyi girin..."
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    setAdminError("");
                  }}
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 p-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              {adminError && (
                <p className="text-xs font-semibold text-red-400">{adminError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsAdminOpen(false);
                  setAdminError("");
                }}
                className="rounded-xl px-4 py-2 text-xs font-medium text-slate-400 hover:bg-slate-800 cursor-pointer"
              >
                İptal
              </button>
              <button
                type="button"
                onClick={handleAdminBypass}
                disabled={adminLoading}
                className="rounded-xl bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold px-4 py-2 text-xs transition-opacity disabled:opacity-50 cursor-pointer"
              >
                {adminLoading ? "Güncelleniyor..." : "Planı Etkinleştir"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* UPGRADE MODAL */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-2 text-center">Upgrade Your Membership</h3>
            <p className="text-xs text-slate-400 text-center mb-6">Unlock Bio-Sync, Burnout Early Warning & Unlimited AI Routine Advisor.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-950 border border-cyan-500/50 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-cyan-400 text-sm">PRO ($5/mo)</h4>
                  <ul className="text-[11px] text-slate-300 space-y-1 my-3">
                    <li>✓ Günlük 10 Etkinlik</li>
                    <li>✓ Burnout Warning System</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleChangePlan("pro")}
                  className="w-full py-2 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                >
                  Start 7-Day Trial
                </button>
              </div>
              <div className="p-4 bg-slate-950 border border-purple-500/50 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-purple-400 text-sm">PLUS ($8/mo)</h4>
                  <ul className="text-[11px] text-slate-300 space-y-1 my-3">
                    <li>✓ Günlük 25 Etkinlik</li>
                    <li>✓ Social Party Rooms</li>
                  </ul>
                </div>
                <button
                  onClick={() => handleChangePlan("plus")}
                  className="w-full py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg text-xs cursor-pointer"
                >
                  Get Plus
                </button>
              </div>
            </div>
            <button
              onClick={() => handleChangePlan("free")}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
            >
              Continue with Basic ($0) Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}