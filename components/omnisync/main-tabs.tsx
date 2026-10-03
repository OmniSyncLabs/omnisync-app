'use client'

import { useRef, useState } from 'react'
import { Activity, CalendarDays, Home, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Plan, Profile } from '@/lib/omnisync'
import { HomeScreen } from './home-screen'
import { ScheduleScreen } from './schedule-screen'
import { BiometricsScreen } from './biometrics-screen'
import { SettingsScreen } from './settings-screen'

const TABS = [
  { label: 'Home', icon: Home },
  { label: 'Schedule', icon: CalendarDays },
  { label: 'Biometrics', icon: Activity },
  { label: 'Settings', icon: Settings },
]

export function MainTabs({ profile, plan, onUpgrade, onLogout }: { profile: Profile; plan: Plan; onUpgrade: () => void; onLogout: () => void }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const pendingTarget = useRef<number | null>(null)
  const [active, setActive] = useState(0)

  function handleScroll() {
    const el = trackRef.current
    if (!el) return
    const index = Math.round(el.scrollLeft / el.clientWidth)
    if (pendingTarget.current !== null) {
      // Keep the clicked tab highlighted while the smooth scroll passes intermediate screens.
      if (index === pendingTarget.current && Math.abs(el.scrollLeft - index * el.clientWidth) < 2) pendingTarget.current = null
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
    <ScheduleScreen key="schedule" />,
    <BiometricsScreen key="bio" plan={plan} onUpgrade={onUpgrade} />,
    <SettingsScreen key="settings" profile={profile} plan={plan} onUpgrade={onUpgrade} onLogout={onLogout} />,
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

      <nav aria-label="Primary" className="absolute inset-x-0 bottom-0 z-20 border-t border-border bg-background/90 px-3 pt-2 backdrop-blur-md" style={{ paddingBottom: 'calc(8px + env(safe-area-inset-bottom))' }}>
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
                    isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground',
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
