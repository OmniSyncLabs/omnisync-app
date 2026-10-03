"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const params = useParams();
  const locale = params?.locale || "tr";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Supabase ile Gerçek Doğrulama
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data?.user) {
      // Hata durumunda KESİNLİKLE yönlendirme yapmıyoruz!
      setErrorMsg("E-posta adresi veya şifre hatalı!");
      setLoading(false);
      return;
    }

    // Yalnızca doğrulama başarılı olursa yönlendir
    if (typeof window !== "undefined") {
      localStorage.setItem("omni_user_email", data.user.email || email);
    }
    
    setLoading(false);
    router.push(`/${locale}/dashboard`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white p-4">
      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            OmniSync
          </h1>
          <p className="text-slate-400 text-sm mt-2">
            Hesabınıza giriş yapın
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium border-l-4 border-l-red-500">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              E-Posta Adresi
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ahmet@example.com"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 text-slate-100 text-sm transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Şifre
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-cyan-500 text-slate-100 text-sm transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 transition disabled:opacity-50 mt-2"
          >
            {loading ? "Doğrulanıyor..." : "Giriş Yap"}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Hesabınız yok mu?{" "}
          <Link href={`/${locale}/signup`} className="text-cyan-400 hover:underline font-medium">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </div>
  );
}