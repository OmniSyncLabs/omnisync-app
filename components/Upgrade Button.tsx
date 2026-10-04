'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface UpgradeButtonProps {
  buttonText?: string;
  className?: string;
}

export default function UpgradeButton({
  buttonText = "Pro'ya Geç",
  className = "bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition duration-200 shadow-md inline-block cursor-pointer text-center"
}: UpgradeButtonProps) {
  const [checkoutUrl, setCheckoutUrl] = useState<string>('');

  useEffect(() => {
    const prepareCheckout = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        const rawUrl = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917';
        
        let finalUrl = `${rawUrl}?embed=1`;

        if (user) {
          finalUrl += `&checkout[email]=${encodeURIComponent(user.email || '')}&checkout[custom][user_id]=${user.id}`;
        }

        setCheckoutUrl(finalUrl);
      } catch (error) {
        console.error('Checkout adresi hazırlanırken hata oluştu:', error);
      }
    };

    prepareCheckout();
  }, []);

  return (
    <a
      href={checkoutUrl || '#'}
      className={`lemonsqueezy-button ${className}`}
    >
      {buttonText}
    </a>
  );
}