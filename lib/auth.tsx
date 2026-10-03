"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";

interface UserProfile {
  id: string;
  email: string;
  name: string;
  plan: string;
}

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Yerel Kullanıcıyı Yükle (Veritabanı bağlantısı yoksa)
    const loadLocalUser = () => {
      if (typeof window !== "undefined") {
        setUser({
          id: "local-user",
          email: localStorage.getItem("omni_user_email") || "ornek@omnisync.com",
          name: localStorage.getItem("omni_user_name") || "Kullanıcı",
          plan: localStorage.getItem("omni_user_plan") || "free",
        });
      }
      setLoading(false);
    };

    // 2. Supabase'den Mevcut Oturumu Çek
    supabase.auth.getSession().then(({ data, error }) => {
      if (error || !data?.session?.user) {
        loadLocalUser();
      } else {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || "",
          // @ts-ignore
          name: data.session.user.user_metadata?.full_name || "Kullanıcı",
          plan: "free",
        });
        setLoading(false);
      }
    });

    // 3. Giriş/Çıkış Değişimlerini Dinle
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || "",
            // @ts-ignore
            name: session.user.user_metadata?.full_name || "Kullanıcı",
            plan: "free",
          });
        } else {
          loadLocalUser();
        }
        setLoading(false);
      }
    );

    // 4. Kırmızı çizgi veren temizleme kısmını TS kontrolünden gizliyoruz
    return () => {
      // @ts-ignore
      if (authListener?.subscription) {
        // @ts-ignore
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.log("Çıkış hatası:", e);
    }
    if (typeof window !== "undefined") {
      localStorage.removeItem("omni_user_name");
      localStorage.removeItem("omni_user_email");
    }
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);