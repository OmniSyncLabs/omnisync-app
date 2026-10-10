'use client'

import { useEffect, useState } from 'react'
import type { Plan, Profile } from '@/lib/omnisync'
import { AuthScreen } from './auth-screen'
import { Onboarding } from './onboarding'
import { Paywall } from './paywall'
import { MainTabs } from './main-tabs'
import { supabase } from '@/lib/supabase'

type Stage = 'auth' | 'onboarding' | 'app'
type Account = Pick<Profile, 'name' | 'email' | 'provider'>

export type EventItem = {
  id: string
  title: string
  category: string
  load: string
  time: string
  days: string
}

const DEFAULT_EVENTS: EventItem[] = [
  { id: '1', title: 'Light Walk & Stretch', category: 'Sports', load: 'Beyin Yükü: Sev. 2', time: '17:00', days: '12 Days' },
  { id: '2', title: '1.5h Practice Exam', category: 'Productivity', load: 'Beyin Yükü: Sev. 5', time: '09:00 - Peak Focus Hours', days: '5 Days' },
  { id: '3', title: 'Daily Rhythm Review', category: 'Order', load: 'Beyin Yükü: Sev. 3', time: '21:30', days: '8 Days' },
  { id: '4', title: '30m Book Reading', category: 'Personal', load: 'Beyin Yükü: Sev. 3', time: '22:00', days: '15 Days' },
]

export function OmniSyncApp() {
  const [stage, setStage] = useState<Stage>('auth')
  const [account, setAccount] = useState<Account | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [plan, setPlan] = useState<Plan>('basic')
  const [paywallOpen, setPaywallOpen] = useState(false)

  // Kalıcı Event State
  const [events, setEvents] = useState<EventItem[]>(DEFAULT_EVENTS)
  const [isLoaded, setIsLoaded] = useState(false)

  // 1. LocalStorage'dan event'leri yükle
  useEffect(() => {
    const saved = localStorage.getItem('omnisync_events')
    if (saved) {
      try {
        setEvents(JSON.parse(saved))
      } catch (e) {
        console.error('Eventler yüklenemedi:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // 2. Eventler değiştikçe LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('omnisync_events', JSON.stringify(events))
    }
  }, [events, isLoaded])

  // 3. Güvenli Event Ekleme Fonksiyonu (10 Limit Kontrollü)
  function handleAddEvent(newEvent: Omit<EventItem, 'id'>) {
    if (plan === 'basic' && events.length >= 10) {
      setPaywallOpen(true)
      return false
    }

    const item: EventItem = {
      ...newEvent,
      id: `ev_${Date.now()}`,
    }
    setEvents((prev) => [item, ...prev])
    return true
  }

  function handleDeleteEvent(id: string) {
    setEvents((prev) => prev.filter((e) => e.id !== id))
  }

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
        const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (user.email && validEmailRegex.test(user.email.trim())) {
          checkoutUrl += `?checkout[email]=${encodeURIComponent(user.email.trim())}&checkout[custom][user_id]=${user.id}`;
        }
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
          <MainTabs
            profile={profile}
            plan={plan}
            events={events}
            onAddEvent={handleAddEvent}
            onDeleteEvent={handleDeleteEvent}
            onUpgrade={handleRealCheckout}
            onLogout={handleLogout}
          />
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