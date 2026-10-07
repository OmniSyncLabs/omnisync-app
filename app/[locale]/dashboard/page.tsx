"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as string) || "tr";
  const isTr = locale === "tr";

  // TÜRKÇE / İNGİLİZCE DİNAMİK ÇEVİRİ SÖZLÜĞÜ (HER DETAY DAHİL)
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
    activeStreak: isTr ? "Aktif Seri (Streak)" : "Active Streak",
    focusLevelText: isTr ? "Zihinsel Odak Seviyesi" : "Mental Focus Level",
    days: isTr ? "Gün" : "Days",
    addHabitTitle: isTr ? "Yapay Zeka ile Otomatik Zamanlanan Görev Ekle" : "Add Task Auto-Scheduled by AI",
    addHabitBtn: isTr ? "Yapay Zeka ile Otomatik Ekle" : "Add with AI Scheduler",
    addingAl: isTr ? "Yapay Zeka Günün En İdeal Saatine Yerleştiriyor..." : "AI is Scheduling to Peak Focus Hours...",
    taskTitlePlaceholder: isTr ? "Görev Adı (Örn: 1.5 Saat Fizik Denemesi Çöz)" : "Task Title (e.g. 1.5h Physics Exam)",
    category: isTr ? "Kategori" : "Category",
    productivity: isTr ? "Verimlilik" : "Productivity",
    sports: isTr ? "Spor" : "Sports",
    health: isTr ? "Sağlık" : "Health",
    personal: isTr ? "Kişisel" : "Personal",
    order: isTr ? "Düzen" : "Order",
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
    proF1: isTr ? "10 adede kadar otomatik zamanlanmış etkinlik & takvim eşitleme" : "Up to 10 auto-scheduled events & calendar sync",
    proF2: isTr ? "Otomatik DND & Odak Modu Eşitleme (Saat/Telefon)" : "Auto DND & Focus Mode Sync (Watch/Phone)",
    proF3: isTr ? "Günlük AI Sesli Sabah Özeti" : "Daily AI Voice Morning Briefing",
    proF4: isTr ? "Tükenmişlik Erken Uyarı Sistemi (3 günlük HRV)" : "Burnout Early Warning System (3-day HRV)",
    proF5: isTr ? "Sınırsız Pro AI Danışmanı" : "Unlimited Pro AI Advisor",
    proF6: isTr ? "Çoklu cihaz eşitleme (2+ cihaz)" : "Multi-device sync (2+ devices)",
    plusF1: isTr ? "100 etkinliğe kadar / sınırsız güç görevleri" : "Up to 100 events / unlimited power tasks",
    plusF2: isTr ? "Bio-Sync Partner Eşleşmesi" : "Bio-Sync Partner Matching",
    plusF3: isTr ? "Social Party Odak Odaları & Canlı Rutin Eşitleme" : "Social Party Focus Rooms & Live Routine Sync",
    plusF4: isTr ? "Öncelikli Sesli AI Danışmanı" : "Priority Voice Chat AI Consultant",
    plusF5: isTr ? "Dışa aktarılabilir HRV & Sağlık PDF Raporları" : "Exportable HRV & Health PDF Reports",
  };

  const aiTipsMap = {
    1: isTr ? "AI Tavsiyesi: Zihinsel enerjin bugün düşük seviyede. Ağır matematik veya deneme çözümleri yerine 15-20 dakikalık hafif yürüyüş ve kitap okuma gibi düşük beyin yükü gerektiren rutinlere odaklan." : "AI Tip: Mental energy is low today. Focus on light activities like 15-minute walks or light reading rather than heavy problem solving.",
    2: isTr ? "AI Tavsiyesi: Hafif-orta zihinsel moddasın. Bugün rutin tekrar dersleri ve kelime ezberleri için harika bir gün. Zor sınav çözümlerini yarın sabah peak saatine ertele." : "AI Tip: Light-moderate focus state. Ideal for vocabulary reviews and routine revision. Save intense practice tests for tomorrow morning.",
    3: isTr ? "AI Tavsiyesi: Dengeli odak seviyesindesin. Pomodoro tekniği (25 dk çalışma + 5 dk mola) ile 1.5 saatlik verimli ders veya proje oturumunu kolayca tamamlayabilirsin." : "AI Tip: Balanced focus state. Use Pomodoro (25m study + 5m rest) to comfortably complete 1.5-hour study blocks.",
    4: isTr ? "AI Tavsiyesi: Yüksek zihinsel performans modundasın! Beyin karmaşık mantık yürütmeye ve ağır problem çözmeye hazır. Zorlandığın en kritik 2 görevi hemen şimdi hallet." : "AI Tip: High cognitive performance! Your brain is primed for complex logic and problem solving. Tackle your top 2 hardest tasks right now.",
    5: isTr ? "AI Tavsiyesi: MAKSİMUM DERİN ODAK (FLOW STATE)! Zihinsel kapasiten zirvede. Bildirimleri kapat, DND moduna geç ve en az 2 saatlik kesintisiz deneme sınavı veya zorlu kodlama seansını başlat." : "AI Tip: PEAK FLOW STATE! Mental capacity is at its max. Enable DND mode and initiate a 2-hour uninterrupted deep study block.",
  };

  const [userName, setUserName] = useState<string>("Kullanıcı");
  const [userEmail, setUserEmail] = useState<string>("demo@example.com");
  const [userPlan, setUserPlan] = useState<string>("free");
  const [userGoal, setUserGoal] = useState<string>("");
  const [userAvatar, setUserAvatar] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(true);
  const [editName, setEditName] = useState<string>("");
  const [editEmail, setEditEmail] = useState<string>("");
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
  const [hrvScore, setHrvScore] = useState<number>(68);

  const [habits, setHabits] = useState([
    { id: 1, title: isTr ? "Hafif Yürüyüş & Esneme" : "Light Walk & Stretch", category: isTr ? "Spor" : "Sports", level: 2, suggestedTime: "17:00", completed: true, streak: 12 },
    { id: 2, title: isTr ? "1.5 Saat Deneme Sınavı Çözümü" : "1.5h Practice Exam", category: isTr ? "Verimlilik" : "Productivity", level: 5, suggestedTime: "09:00 - Peak Focus Hours", completed: false, streak: 5 },
    { id: 3, title: isTr ? "Günlük Ritim / Plan İncelemesi" : "Daily Rhythm Review", category: isTr ? "Düzen" : "Order", level: 3, suggestedTime: "21:30", completed: false, streak: 8 },
    { id: 4, title: isTr ? "30 Dakika Kitap Okuma" : "30m Book Reading", category: isTr ? "Kişisel" : "Personal", level: 3, suggestedTime: "22:00", completed: true, streak: 15 },
  ]);

  const [newHabitTitle, setNewHabitTitle] = useState("");
  const [newHabitCategory, setNewHabitCategory] = useState("Verimlilik");
  const [newHabitLevel, setNewHabitLevel] = useState<number>(3);
  const [aiScheduling, setAiScheduling] = useState<boolean>(false);

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

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const name = user.user_metadata?.full_name || "Kullanıcı";
        const email = user.email || "demo@example.com";
        const plan = user.user_metadata?.plan || "free";
        const goal = user.user_metadata?.onboarding_goal || "";
        const avatar = user.user_metadata?.avatar_url || user.user_metadata?.picture || "";
        setUserName(name);
        setUserEmail(email);
        setUserPlan(plan);
        setUserGoal(goal);
        setUserAvatar(avatar);
        setEditName(name);
        setEditEmail(email);
      } else {
        const savedName = localStorage.getItem("omni_user_name") || "Kullanıcı";
        const savedEmail = localStorage.getItem("omni_user_email") || "demo@example.com";
        const savedPlan = localStorage.getItem("omni_user_plan") || "free";
        const savedAvatar = localStorage.getItem("omni_user_avatar") || "";
        setUserName(savedName);
        setUserEmail(savedEmail);
        setUserPlan(savedPlan);
        setUserAvatar(savedAvatar);
        setEditName(savedName);
        setEditEmail(savedEmail);
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

  const handleChangePlan = async (newPlan: "free" | "pro" | "plus") => {
    // "Continue with Basic" butonuna basılırsa sahte olarak ücretsiz plana çekilsin
    if (newPlan === "free") {
      try {
        await supabase.auth.updateUser({
          data: { plan: newPlan },
        });
        setUserPlan(newPlan);
        localStorage.setItem("omni_user_plan", newPlan);
        setShowUpgradeModal(false);
        setUpdateMsg(isTr ? `Planınız ${newPlan.toUpperCase()} olarak güncellendi!` : `Plan updated to ${newPlan.toUpperCase()}!`);
      } catch (e) {
        console.error("Plan güncelleme hatası:", e);
      }
      return;
    }

    // PRO VEYA PLUS İÇİN LİMON SQUEEZY'YE DOĞRUDAN YÖNLENDİRME
    try {
      const { data: { user } } = await supabase.auth.getUser();
      let checkoutUrl = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';

      if (user) {
        checkoutUrl += `?checkout[email]=${encodeURIComponent(user.email || '')}&checkout[custom][user_id]=${user.id}`;
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
    setHabits(
      habits.map((h) =>
        h.id === id ? { ...h, completed: !h.completed, streak: !h.completed ? h.streak + 1 : h.streak - 1 } : h
      )
    );
  };

  const handleAddHabitAl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHabitTitle.trim()) return;
    setAiScheduling(true);
    setTimeout(() => {
      let calculatedTime = "14:00";
      if (newHabitLevel >= 4) {
        calculatedTime = "09:00 - Peak Focus Hours";
      }
      setHabits([
        ...habits,
        {
          id: Date.now(),
          title: newHabitTitle,
          category: newHabitCategory,
          level: newHabitLevel,
          suggestedTime: calculatedTime,
          completed: false,
          streak: 1,
        }
      ]);
      setNewHabitTitle("");
      setAiScheduling(false);
    }, 600);
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans relative">
      {/* SIDEBAR / SOL MENÜ */}
      <aside className="w-full md:w-64 bg-slate-900/80 border-r border-slate-800/80 p-6 flex flex-col justify-between">
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
            {/* DİL DEĞİŞTİRME BUTONU */}
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
              <span> </span> {t.overview}
            </button>
            <button
              onClick={() => setActiveTab("habits")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "habits" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span></span> {t.habits}
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "analytics" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span></span> {t.analytics}
            </button>
            <button
              onClick={() => setActiveTab("group")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "group" ? "bg-amber-500/10 text-amber-400 border border-amber-500/30 shadow-lg shadow-amber-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span></span> {t.group}
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold transition flex items-center gap-3 ${activeTab === "settings" ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-lg shadow-cyan-500/5" : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"}`}
            >
              <span></span> {t.settings}
            </button>
          </nav>
        </div>

        {/* PROFİL ÖZETİ & FOTOĞRAFI */}
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

      {/* İÇERİK ALANI */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-8">
        {/* HEADER */}
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
                <span></span> Plus Member
              </span>
            ) : userPlan === "pro" ? (
              <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 font-bold text-xs rounded-full shadow-lg shadow-cyan-500/10 flex items-center gap-1.5">
                <span> 4 </span> Pro Member
              </span>
            ) : (
              <span className="px-4 py-1.5 bg-slate-800 border border-slate-700 text-slate-400 font-medium text-xs rounded-full flex items-center gap-1">
                <span></span> Basic ($0)
              </span>
            )}
          </button>
        </header>

        {/* GENEL BAKIŞ */}
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
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.completedRoutines}</span>
                  <span></span>
                </div>
                <div className="text-2xl font-black text-cyan-400 mt-2">
                  {habits.filter((h) => h.completed).length} / {habits.length}
                </div>
              </div>
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.activeStreak}</span>
                  <span></span>
                </div>
                <div className="text-2xl font-black text-amber-400 mt-2">15 {t.days}</div>
              </div>
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>HRV Score (3-day)</span>
                  <span></span>
                </div>
                <div className="text-2xl font-black text-purple-400 mt-2">{hrvScore} bpm</div>
              </div>
              <div className="p-5 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                <div className="flex justify-between items-center text-slate-400 text-xs font-medium">
                  <span>{t.focusLevelText}</span>
                  <span></span>
                </div>
                <div className="text-2xl font-black text-indigo-400 mt-2">Sev. {focusLevel}/5</div>
              </div>
            </div>

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
                
                <div className="space-y-3">
                  {habits.map((habit) => (
                    <div
                      key={habit.id}
                      onClick={() => toggleHabit(habit.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer flex items-center justify-between ${habit.completed ? "bg-slate-950/60 border-emerald-500/30 text-slate-400 line-through" : "bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200"}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold border ${habit.completed ? "bg-emerald-500 border-emerald-400 text-slate-950" : "border-slate-700 bg-slate-900 text-transparent"}`}>
                        </div>
                        <div>
                          <div className="text-xs font-semibold">{habit.title}</div>
                          <div className="flex flex-wrap gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded">
                              {habit.category}
                            </span>
                            <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20 font-bold">
                              Beyin Yükü: Sev. {habit.level}
                            </span>
                            <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">
                              {habit.suggestedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-amber-400"> {habit.streak} {t.days}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
                  <h3 className="text-base font-bold text-white mb-2"> YOUR MEMBERSHIP</h3>
                  <p className="text-xs text-slate-400 mb-4">{userEmail}</p>
                  
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-slate-400">{t.activePlan}:</span>
                      <span className="font-bold uppercase text-cyan-400">
                        {userPlan === "pro" && "PRO ($5)"}
                        {userPlan === "plus" && "PLUS ($8)"}
                        {userPlan === "free" && "BASIC ($0)"}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl text-xs transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    {t.upgrade}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ALIŞKANLIKLAR & AI PLANLAMA */}
        {activeTab === "habits" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-white">{t.focusLevelText}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {isTr ? "Yapay zeka planlaması bu seviyeye göre dinamik şekillenir." : "AI scheduling adapts dynamically based on this focus rating."}
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
              <div className="p-4 bg-gradient-to-r from-cyan-950/60 via-slate-950 to-indigo-950/60 border border-cyan-500/40 rounded-xl shadow-md">
                <div className="flex items-start gap-3">
                  <span className="text-xl"></span>
                  <div>
                    <h4 className="text-xs font-black text-cyan-400 uppercase tracking-wider mb-1">
                      {isTr ? "AI Ritim & Performans İpucu" : "AI Rhythm & Performance Tip"}
                    </h4>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {aiTipsMap[focusLevel as keyof typeof aiTipsMap]}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-lg"> </span>
                <h3 className="text-base font-bold text-white">{t.addHabitTitle}</h3>
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

        {/* ANALİZ & BIOMETRICS */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg">
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
            </div>
          </div>
        )}

        {/* SOCIAL PARTY FOCUS ROOMS */}
        {activeTab === "group" && (
          <div className="space-y-6">
            <div className="p-6 bg-slate-900/80 border border-purple-500/30 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl"></span>
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

        {/* SETTINGS & PREFERENCES */}
        {activeTab === "settings" && (
          <div className="space-y-8 max-w-4xl">
            {updateMsg && (
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400 text-xs font-bold">
                {updateMsg}
              </div>
            )}
            
            {/* 01 Biometric & Health Sync */}
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
                    <option value="No wearable" className="bg-slate-900 text-white">No wearable</option>
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

            {/* 02 Circadian & Routine Preferences */}
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

            {/* 03 Account & Security */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.sec3Title}</h3>
              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-xs font-bold text-white">{t.linkedAccounts}</div>
                <div className="text-xs text-slate-300">{t.connectedAs} <span className="text-cyan-400">{userEmail}</span></div>
                <div className="text-[10px] text-slate-500">{t.demoSession}</div>
              </div>
              <div className="space-y-2 text-xs font-medium">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-slate-700">
                  <span className="text-slate-300">{t.notifications}</span>
                  <span className="text-slate-500">{">"}</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-slate-700">
                  <span className="text-slate-300">{t.privacy}</span>
                  <span className="text-slate-500">{">"}</span>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center cursor-pointer hover:border-slate-700">
                  <span className="text-slate-300">{t.helpSupport}</span>
                  <span className="text-slate-500">{">"}</span>
                </div>
              </div>
            </div>

            {/* YOUR MEMBERSHIP */}
            <div className="p-6 bg-slate-900/90 border border-slate-800 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-cyan-400 tracking-wider">{t.membershipHeader}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {t.activePlan}: <span className="text-white font-bold uppercase">{userPlan === 'free' ? 'Basic ($0)' : userPlan}</span>
                  </p>
                </div>
                {/* ANNUAL / MONTHLY SWITCH */}
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

              {/* FIGMA PRO VE PLUS KARTLARI */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PRO CARD */}
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
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF1}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF2}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF3}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF4}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF5}</li>
                      <li className="flex items-start gap-2"><span className="text-cyan-400"></span> {t.proF6}</li>
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

                {/* PLUS CARD */}
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
                      <li className="flex items-start gap-2"><span className="text-purple-400"></span> {t.plusF1}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400"></span> {t.plusF2}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400"></span> {t.plusF3}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400"></span> {t.plusF4}</li>
                      <li className="flex items-start gap-2"><span className="text-purple-400"></span> {t.plusF5}</li>
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

        {/* LOG OUT BUTTON */}
        <div className="pt-4 text-center">
          <button
            onClick={handleLogout}
            className="w-full py-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 font-bold rounded-xl text-xs transition cursor-pointer"
          >
            {t.logOut}
          </button>
        </div>
      </main>

      {/* POP-UP MODAL (ABONELİK YÜKSELTME KARTLARI) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setShowUpgradeModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
            >
              X
            </button>
            <h3 className="text-xl font-bold text-white mb-2 text-center">Upgrade Your Membership</h3>
            <p className="text-xs text-slate-400 text-center mb-6">Unlock Bio-Sync, Burnout Early Warning & Unlimited AI Routine Advisor.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-slate-950 border border-cyan-500/50 rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-cyan-400 text-sm">PRO ($5/mo)</h4>
                  <ul className="text-[11px] text-slate-300 space-y-1 my-3">
                    <li> 10 Auto-scheduled events</li>
                    <li> Burnout Warning System</li>
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
                    <li> Social Party Rooms</li>
                    <li> Priority Voice AI</li>
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
