"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

// GÜVENİLİR VE DÜNYA ÇAPINDA BİLİNEN E-POSTA SAĞLAYICILARI LİSTESİ
const ALLOWED_DOMAINS = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com",
  "icloud.com",
  "proton.me",
  "protonmail.com",
  "live.com",
  "yandex.com",
  "gmx.com",
];

export default function SignupPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "tr";

  // Akış Adımları: 1 = Hedef, 2 = Zaman, 3 = Kayıt Formu, 4 = %20 Teklif Ekranı
  const [step, setStep] = useState(1);

  // Anket ve Kullanıcı Verileri
  const [goal, setGoal] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Pop-up ve Geri Sayım State'leri
  const [showExitModal, setShowExitModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 dakika (300 saniye)
  const [offerExpired, setOfferExpired] = useState(false);

  // GÜVENİLİR E-POSTA DOĞRULAMA FONKSİYONU
  const validateTrustedEmail = (emailStr: string): { isValid: boolean; error?: string } => {
    const cleanEmail = emailStr.trim().toLowerCase();

    // 1. Genel e-posta format kontrolü
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return { isValid: false, error: "Lütfen geçerli bir e-posta adresi giriniz." };
    }

    const domain = cleanEmail.split("@")[1];

    // 2. .com / .net / .org uzantı kontrolü
    if (!domain.endsWith(".com") && !domain.endsWith(".net") && !domain.endsWith(".org")) {
      return { isValid: false, error: "Güvenlik nedeniyle sadece geçerli bir .com e-posta adresi kullanabilirsiniz." };
    }

    // 3. Bilinen sağlayıcı kontrolü
    const isTrusted = ALLOWED_DOMAINS.includes(domain);
    if (!isTrusted) {
      return {
        isValid: false,
        error: "Yalnızca Gmail, Outlook, Hotmail, Yahoo veya iCloud gibi güvenilir e-posta sağlayıcılarıyla kayıt olunabilir.",
      };
    }

    return { isValid: true };
  };

  // Google girişinden dönüşü yakalayıp 4. adıma geçirme nöbetçisi
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("auth") === "google_success") {
      setStep(4);
    }
  }, []);

  // 5 Dakikalık Geri Sayım Sayacı Mantığı
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showExitModal && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setOfferExpired(true);
    }
    return () => clearInterval(timer);
  }, [showExitModal, timeLeft]);

  // Saniyeyi Dakika:Saniye Formatına Çevirme
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Google ile Giriş / Kayıt Fonksiyonu
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/${locale}/signup?auth=google_success`,
          queryParams: {
            prompt: "select_account",
            access_type: "offline",
          },
        },
      });
      if (error) console.error(error.message);
    } catch (err: any) {
      console.error(err);
    }
  };

  // Sayfa yüklendiğinde Google dönüşünü yakala ve Adım 4'e at
  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const params = new URLSearchParams(window.location.search);

      if (params.get("auth") === "google_success") {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const createdAt = new Date(user.created_at).getTime();
          const now = new Date().getTime();
          const isNewUser = now - createdAt < 2 * 60 * 1000;

          if (isNewUser) {
            setStep(4);
          } else {
            window.location.href = `/${locale}/dashboard`;
          }
        }
      }
    };

    checkUserAndRedirect();
  }, [locale]);

  // 3. Adımda Gerçek Kayıt İşlemi (E-POSTA KONTROLÜ EKLENDİ)
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // E-Posta Güvenilirlik Kontrolü
    const emailCheck = validateTrustedEmail(email);
    if (!emailCheck.isValid) {
      setErrorMsg(emailCheck.error || "Geçersiz e-posta adresi.");
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            onboarding_goal: goal,
            onboarding_time: timeCommitment,
            plan: "free",
          },
        },
      });

      if (error) {
        if (error.message.includes("User already registered")) {
          setErrorMsg("Bu e-posta adresi zaten kayıtlı!");
        } else {
          setErrorMsg(error.message);
        }
        setLoading(false);
        return;
      }

      if (data?.user) {
        if (typeof window !== "undefined") {
          localStorage.setItem("omni_user_name", fullName);
          localStorage.setItem("omni_user_email", email);
        }
        setLoading(false);
        setStep(4);
      }
    } catch (err: any) {
      setErrorMsg("Ağ hatası oluştu. Lütfen bağlantınızı kontrol edin.");
      setLoading(false);
    }
  };

  // Seçilen Planı Supabase & LocalStorage'a Kaydedip Dashboard'a Geçme
  const handleSelectPlan = async (selectedPlan: "free" | "pro" | "plus") => {
    try {
      await supabase.auth.updateUser({
        data: { plan: selectedPlan },
      });
    } catch (e) {
      console.error("Plan güncelleme hatası:", e);
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("omni_user_plan", selectedPlan);
    }

    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4 relative overflow-hidden">
      <div className="w-full max-w-lg bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-2xl z-10">
        {/* LOGO VE BAŞLIK */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            OmniSync
          </h1>
          {step < 4 && (
            <div className="flex justify-center gap-2 mt-3">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    s === step ? "w-8 bg-cyan-400" : s < step ? "w-4 bg-cyan-600" : "w-4 bg-slate-800"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* HATA MESAJI */}
        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium border-l-4 border-l-red-500">
            {errorMsg}
          </div>
        )}

        {/* ADIM 1: HEDEF SEÇİMİ */}
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-slate-100 mb-2">
              OmniSync ile ana hedefin nedir?
            </h2>
            <p className="text-xs text-slate-400 text-center mb-6">
              Sana özel bir deneyim hazırlayabilmemiz için birini seç.
            </p>
            {[
              "Günlük disiplin ve düzen kazanmak",
              "Odaklanmayı artırmak ve ertelemeyi bırakmak",
              "Spor ve kişisel hedeflerimi takip etmek",
              "Zamanı daha verimli yönetmek",
            ].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setGoal(option);
                  setStep(2);
                }}
                className="w-full p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-xl text-left text-sm font-medium transition flex items-center justify-between group"
              >
                <span>{option}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            ))}
          </div>
        )}

        {/* ADIM 2: ZAMAN AYIRMA */}
        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-slate-100 mb-2">
              Günde bu hedefe ne kadar zaman ayırabilirsin?
            </h2>
            <p className="text-xs text-slate-400 text-center mb-6">
              Ritmini adım adım inşa edeceğiz.
            </p>
            {[
              "Günde 10-15 Dakika (Hızlı ve etkili)",
              "Günde 30 Dakika (Dengeli odaklanma)",
              "Günde 1 Saat+ (Yoğun ve kararlı çalışma)",
            ].map((option) => (
              <button
                key={option}
                onClick={() => {
                  setTimeCommitment(option);
                  setStep(3);
                }}
                className="w-full p-4 bg-slate-950 border border-slate-800 hover:border-cyan-500 rounded-xl text-left text-sm font-medium transition flex items-center justify-between group"
              >
                <span>{option}</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">→</span>
              </button>
            ))}
            <button
              onClick={() => setStep(1)}
              className="text-xs text-slate-500 hover:text-slate-300 w-full text-center mt-4"
            >
              ← Önceki Soruya Dön
            </button>
          </div>
        )}

        {/* ADIM 3: KAYIT FORMU */}
        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-center text-slate-100 mb-2">
              Harika! Hesabını oluşturalım
            </h2>

            {/* GOOGLE İLE GİRİŞ BUTONU */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl border border-slate-700 bg-slate-950 hover:bg-slate-800 text-slate-200 font-medium text-sm transition-all shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google ile Devam Et
            </button>

            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="px-3 text-xs text-slate-500 uppercase">veya e-posta ile</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ahmet Kaan"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 text-slate-100 text-sm transition"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  E-Posta Adresi
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ahmet@gmail.com"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 text-slate-100 text-sm transition"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">
                  Sadece Gmail, Outlook, Yahoo veya iCloud gibi güvenilir .com e-postaları kabul edilir.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Şifre
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 text-slate-100 text-sm transition"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 mt-2 cursor-pointer"
              >
                {loading ? "Planınız Hazırlanıyor..." : "Kişisel Planımı Oluştur"}
              </button>
            </form>
          </div>
        )}

        {/* ADIM 4: PRO & PLUS PLANLARI (%20 İNDİRİM & BASIC DETAYI) */}
        {step === 4 && (
          <div className="relative pt-2">
            {/* ÇARPI (CLOSE) BUTONU */}
            <button
              onClick={() => setShowExitModal(true)}
              className="absolute -top-4 -right-2 w-8 h-8 rounded-full bg-slate-800 border border-slate-700 hover:bg-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
              title="Kapat"
            >
              ✕
            </button>

            <div className="text-center mb-5">
              <span className="inline-block px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-xs font-semibold mb-2">
                🎉 Hoş Geldin Hediyesi!
              </span>
              <h2 className="text-2xl font-bold text-white">
                İlk Ayına Özel <span className="text-cyan-400">%20 İndirim</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Hedeflerine en hızlı şekilde ulaşman için paketini seç.
              </p>
            </div>

            {/* PLAN KARTLARI */}
            <div className="grid grid-cols-1 gap-3 mb-5">
              {/* PLUS PLAN (EN POPÜLER) */}
              <div className="p-3.5 bg-slate-950 border-2 border-cyan-500 rounded-xl relative flex items-center justify-between shadow-lg shadow-cyan-500/10">
                <span className="absolute -top-2.5 right-3 bg-cyan-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded-full">
                  EN POPÜLER
                </span>
                <div>
                  <h3 className="font-bold text-sm text-cyan-400">Plus Plan (AI Destekli)</h3>
                  <p className="text-[11px] text-slate-400">Sınırsız koçluk ve detaylı analizler</p>
                  <div className="mt-1">
                    <span className="line-through text-slate-500 text-[11px] mr-2">₺299/ay</span>
                    <span className="text-base font-bold text-cyan-400">₺239/ay</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan("plus")}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-lg text-xs transition shadow-md cursor-pointer"
                >
                  Plus'ı Seç
                </button>
              </div>

              {/* PRO PLAN */}
              <div className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-200">Pro Plan</h3>
                  <p className="text-[11px] text-slate-400">Gelişmiş alışkanlık ve istatistikler</p>
                  <div className="mt-1">
                    <span className="line-through text-slate-500 text-[11px] mr-2">₺199/ay</span>
                    <span className="text-base font-bold text-cyan-400">₺159/ay</span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectPlan("pro")}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-400 font-semibold rounded-lg text-xs transition cursor-pointer"
                >
                  Pro'yu Seç
                </button>
              </div>

              {/* BASIC PLAN */}
              <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <div>
                    <h3 className="font-semibold text-xs text-slate-300">Temel Sürüm (Basic)</h3>
                    <p className="text-[10px] text-slate-500">Standart alışkanlık takibi ve temel özellikler</p>
                  </div>
                  <button
                    onClick={() => handleSelectPlan("free")}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-medium rounded-lg text-[11px] transition border border-slate-800 cursor-pointer"
                  >
                    Ücretsiz Devam Et
                  </button>
                </div>
                <div className="text-[10px] text-slate-400 mt-2 pt-2 border-t border-slate-900 flex gap-4">
                  <span>✓ Standart Takip</span>
                  <span>✓ Temel Hatırlatıcılar</span>
                  <span>✕ AI Koçluk Yok</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-center text-slate-500">
              İstediğin zaman iptal edebilirsin. Risk yok.
            </p>
          </div>
        )}

        <div className="mt-6 text-center text-xs text-slate-400">
          Zaten hesabınız var mı?{" "}
          <Link href={`/${locale}`} className="text-cyan-400 hover:underline font-medium">
            Giriş Yap
          </Link>
        </div>
      </div>

      {/* İKNA POP-UP'I (EXIT-INTENT MODAL) */}
      {showExitModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-slate-900 border-2 border-red-500/50 rounded-2xl max-w-md w-full p-6 text-center shadow-2xl relative">
            {!offerExpired ? (
              <>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-500/10 border border-red-500/30 rounded-full text-red-400 text-xs font-bold mb-4 animate-pulse">
                  <span>⏳ Özel Fırsatın Bitiş Süresi:</span>
                  <span className="text-sm font-mono">{formatTime(timeLeft)}</span>
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">
                  Bekle! Gitmeden Önce <span className="text-red-400">%50 İndirimini</span> Al!
                </h3>

                <p className="text-xs text-slate-300 mb-6">
                  Ritmini yakalaman için sana özel son bir şans sunuyoruz. İlk ay yarı fiyatına Plus Plan deneyimi!
                </p>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                  <div className="text-xs text-slate-400">Plus Plan İlk Ay</div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <span className="line-through text-slate-500 text-sm">₺299/ay</span>
                    <span className="text-3xl font-black text-red-400">₺149/ay</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => handleSelectPlan("plus")}
                    className="w-full py-3.5 bg-gradient-to-r from-red-500 to-amber-500 hover:from-red-400 hover:to-amber-400 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 transition text-sm cursor-pointer"
                  >
                    %50 İndirimi Kullan ve Başla
                  </button>

                  <button
                    onClick={() => handleSelectPlan("free")}
                    className="w-full py-2.5 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    Teşekkürler, ücretsiz (Basic) planla devam etmek istiyorum
                  </button>
                </div>
              </>
            ) : (
              <div className="py-4">
                <div className="text-4xl mb-3">💙</div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Fırsat Süresi Doldu
                </h3>
                <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                  İndirimi kaçırdığın için üzgünüz ama sorun değil! OmniSync'i ücretsiz keşfetmeye her zaman devam edebilirsin.
                </p>
                <button
                  onClick={() => handleSelectPlan("free")}
                  className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl text-sm transition cursor-pointer"
                >
                  Ücretsiz Sürüm ile Devam Et
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}