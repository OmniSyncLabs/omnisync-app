'use client';

import { supabase } from '@/lib/supabase';

interface UpgradeButtonProps {
  buttonText?: string;
  className?: string;
}

export default function UpgradeButton({
  buttonText = "Pro'ya Geç",
  className = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md inline-block cursor-pointer text-center"
}: UpgradeButtonProps) {

  const handleCheckout = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      // 1. Giriş yapan kullanıcının bilgilerini alıyoruz
      const { data: { user } } = await supabase.auth.getUser();

      const rawUrl = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';
      let finalUrl = rawUrl;

      // 2. Kullanıcı giriş yapmışsa e-posta ve id bilgisini adrese ekliyoruz
      if (user) {
        finalUrl += `?checkout[email]=${encodeURIComponent(user.email || '')}&checkout[custom][user_id]=${user.id}`;
      }

      // 3. Doğrudan Lemon Squeezy ödeme sayfasına yönlendiriyoruz
      window.location.href = finalUrl;
    } catch (error) {
      console.error('Ödeme sayfasına yönlendirilirken hata oluştu:', error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className={className}
    >
      {buttonText}
    </button>
  );
}