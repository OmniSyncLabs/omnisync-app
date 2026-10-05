'use client'

import { useState } from 'react'
import type { Plan, Profile } from '@/lib/omnisync'
import { AuthScreen } from './auth-screen'
import { Onboarding } from './onboarding'
import { Paywall } from './paywall'
import { MainTabs } from './main-tabs'
import { supabase } from '@/lib/supabase'

type Stage = 'auth' | 'onboarding' | 'app'
type Account = Pick<Profile, 'name' | 'email' | 'provider'>

export function OmniSyncApp() {
  const [stage, setStage] = useState<Stage>('auth')
  const [account, setAccount] = useState<Account | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [plan, setPlan] = useState<Plan>('basic')
  const [paywallOpen, setPaywallOpen] = useState(false)

  function handleAuthenticated(user: Account, isNewUser: boolean) {
    setAccount(user)
    if (isNewUser) {
      setStage('onboarding')
    } else {
      setProfile({ ...user, age: 27, gender: 'Prefer not to say', chronotype: 'wolf', habits: [] })
      setStage('app')
    }
  }

  function handleLogout() {
    setStage('auth')
    setAccount(null)
    setProfile(null)
    setPlan('basic')
  }

  // GERÇEK ÖDEME YÖNLENDİRMESİ
  async function handleRealCheckout() {
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
  }

  return (
    <main className="flex min-h-dvh items-center justify-center bg-black sm:p-4">
      <div className="relative h-dvh w-full overflow-x-hidden overflow-y-hidden bg-background sm:h-[860px] sm:max-h-[calc(100dvh-2rem)] sm:max-w-[420px] sm:rounded-[44px] sm:border sm:border-border">
        {stage === 'auth' && <AuthScreen onAuthenticated={handleAuthenticated} />}
        {stage === 'onboarding' && account && (
          <Onboarding
            name={account.name}
            onComplete={(answers) => {
              setProfile({ ...account, ...answers })
              setStage('app')
              setPaywallOpen(true)
            }}
          />
        )}
        {stage === 'app' && profile && (
          <MainTabs profile={profile} plan={plan} onUpgrade={handleRealCheckout} onLogout={handleLogout} />
        )}
        {paywallOpen && stage === 'app' && (
          <Paywall
            onClose={() => setPaywallOpen(false)}
            onSubscribe={() => handleRealCheckout()}
          />
        )}
      </div>
    </main>
  )
}