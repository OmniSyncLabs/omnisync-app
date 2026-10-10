'use client'

import { useRef, useState } from 'react'
import { Activity, CalendarDays, Home, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Plan, Profile } from '@/lib/omnisync'
import { HomeScreen } from './home-screen'
import { ScheduleScreen } from './schedule-screen'
import { BiometricsScreen } from './biometrics-screen'
import { SettingsScreen } from './settings-screen'
import { supabase } from '@/lib/supabase'
import type { EventItem } from './omnisync-app'

const TABS = [
  { label: 'Home', icon: Home },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Biometrics', icon: Activity },
  { label: 'Settings', icon: Settings },
]

interface MainTabsProps {
  profile: Profile
  plan: Plan
  events?: EventItem[]
  onAddEvent?: (newEvent: Omit<EventItem, 'id'>) => boolean
  onDeleteEvent?: (id: string) => void
  onUpgrade: () => void
  onLogout: () => void
}

export function MainTabs({
  profile,
  plan,
  events,
  onAddEvent,
  onDeleteEvent,
  onUpgrade,
  onLogout,
}: MainTabsProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pendingTarget = useRef<number | null>(null)
  const [active, setActive] = useState(0)

  // Doğrudan Lemon Squeezy yönlendirmesi
  const handleDirectUpgrade = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      let checkoutUrl = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917'

      if (user) {
        const validEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (user.email && validEmailRegex.test(user.email.trim())) {
          checkoutUrl += `?checkout[email]=${encodeURIComponent(user.email.trim())}&checkout[custom][user_id]=${user.id}`
        }
      }

      window.location.href = checkoutUrl
    } catch (error) {
      window.location.href = 'https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917'
    }
  }

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    if (pendingTarget.current !== null) {
      if (index === pendingTarget.current && Math.abs(el.scrollLeft - index * el.clientWidth) < 2)
        pendingTarget.current = null
      return
    }
    setActive(index)
  }

  function goTo(index: number) {
    const el = trackRef.current
    if (!el) return
    setActive(index)
    if (Math.abs(el.scrollLeft - index * el.clientWidth) < 2) return
    pendingTarget.current = index
    el.scrollTo({ left: index * el.clientWidth, behavior: 'smooth' })
  }

  const screens = [
    <HomeScreen key="home" profile={profile} />,
    <ScheduleScreen
      key="schedule"
      userPlan={plan}
      events={events}
      onAddEvent={onAddEvent}
      onDeleteEvent={onDeleteEvent}
      onOpenPaywall={onUpgrade}
    />,
    <BiometricsScreen key="bio" plan={plan} onUpgrade={handleDirectUpgrade} />,
    <SettingsScreen key="settings" profile={profile} plan={plan} onUpgrade={handleDirectUpgrade} onLogout={onLogout} />,
  ]

  return (
    <div className="relative h-full overflow-x-hidden">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar flex h-full overflow-x-auto overflow-y-hidden overscroll-x-contain"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {screens.map((screen, i) => (
          <section
            key={TABS[i].label}
            id={`screen-${i + 1}`}
            aria-label={TABS[i].label}
            inert={active !== i}
            className="no-scrollbar h-full w-full shrink-0 overflow-y-auto overflow-x-hidden px-5"
            style={{
              scrollSnapAlign: 'start',
              scrollSnapStop: 'always',
              paddingTop: 'calc(48px + env(safe-area-inset-top))',
              paddingBottom: 'calc(96px + env(safe-area-inset-bottom))',
            }}
          >
            {screen}
          </section>
        ))}
      </div>

      <nav
        aria-label="Primary"
        className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-3 pt-2 backdrop-blur-md"
        style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}
      >
        <ul className="grid grid-cols-4 gap-1">
          {TABS.map(({ label, icon: Icon }, i) => {
            const isActive = active === i
            return (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive ? 'page' : undefined}
                  aria-controls={`screen-${i + 1}`}
                  className={cn(
                    'flex h-14 w-full flex-col items-center justify-center gap-0.5 rounded-2xl text-[11px] font-medium transition-colors',
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {label}
                  <span className={cn('size-1 rounded-full', isActive ? 'bg-primary' : 'bg-transparent')} aria-hidden />
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}