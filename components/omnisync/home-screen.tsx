'use client'

import { useState } from 'react'
import { BatteryLow, Clock, CloudFog, Coffee, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { initialsOf, type Profile } from '@/lib/omnisync'

type Override = 'hyped' | 'fog' | 'break' | null

const OVERRIDES = [
  { id: 'hyped' as const, label: 'Feeling Hyped', icon: Zap, color: 'text-yellow-400' },
  { id: 'fog' as const, label: 'Brain Fog', icon: CloudFog, color: 'text-violet' },
  { id: 'break' as const, label: 'Need a Break', icon: Coffee, color: 'text-energy' },
]

const RECOMMENDATIONS: Record<Exclude<Override, null> | 'default', { title: string; focus: string; minutes: number; energy: number; state: string }> = {
  default: { title: 'Math & Physics Deep Study', focus: 'High Focus Required', minutes: 90, energy: 88, state: 'Peak Focus' },
  hyped: { title: 'Code Backend API Sprint', focus: 'Max Focus Window', minutes: 120, energy: 95, state: 'Flow State' },
  fog: { title: 'Reply to Emails', focus: 'Low Effort', minutes: 30, energy: 54, state: 'Energy Dip' },
  break: { title: '10-min Sunlight Walk', focus: 'Recovery', minutes: 10, energy: 41, state: 'Recharge' },
}

export function HomeScreen({ profile }: { profile: Profile }) {
  const [override, setOverride] = useState<Override>(null)
  const [sessionActive, setSessionActive] = useState(false)
  const rec = RECOMMENDATIONS[override ?? 'default']

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-center gap-4">
        <div className="relative flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400 text-xl font-bold text-primary-foreground">
          {initialsOf(profile.name)}
          <span className="absolute bottom-0 right-0 size-4 rounded-full border-2 border-background bg-emerald-500" aria-hidden />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Thursday, Oct 1</p>
          <h1 className="text-xl font-bold">Good Morning, {profile.name}</h1>
        </div>
      </header>
      <span className="flex w-fit items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm">
        <span className="size-2 rounded-full bg-emerald-500" aria-hidden /> Watch Connected
      </span>

      <section className="rounded-3xl border border-border bg-card p-5" aria-label="Circadian energy">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Circadian energy · 24h</p>
            <p className="mt-2 text-5xl font-bold text-primary tabular-nums">{rec.energy}%</p>
            <p className="mt-1 font-semibold">{rec.state}</p>
            <p className="text-xs text-muted-foreground">Optimal: Complex Tasks · 10:00 – 12:30</p>
          </div>
          <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-primary" />Focus</li>
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-accent" />Deep Work</li>
            <li className="flex items-center gap-2"><span className="size-2 rounded-full bg-energy" />Rest</li>
          </ul>
        </div>
        <EnergyCurve />
      </section>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-card to-accent/10 p-5" aria-label="Up next">
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <span className="size-2 rounded-full bg-primary" aria-hidden /> Up next · AI recommended
        </p>
        <h2 className="mt-3 text-xl font-bold">{rec.title}</h2>
        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5"><Zap className="size-4 text-violet" aria-hidden />{rec.focus}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-4 text-sky-400" aria-hidden />Est. {rec.minutes} min</span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSessionActive((v) => !v)}
            className={cn(
              'h-12 rounded-2xl font-semibold transition-opacity hover:opacity-90',
              sessionActive ? 'border border-primary/50 bg-primary/10 text-primary' : 'bg-gradient-to-r from-primary to-sky-400 text-primary-foreground',
            )}
          >
            {sessionActive ? 'End Session' : 'Start Session'}
          </button>
          <button type="button" onClick={() => setOverride('break')} className="h-12 rounded-2xl border border-border bg-secondary text-sm font-semibold text-muted-foreground hover:text-foreground">
            Snooze / Reschedule
          </button>
        </div>
        {sessionActive && <p className="mt-3 text-sm text-primary" role="status">Focus session running · DND enabled</p>}
      </section>

      <section aria-labelledby="override-title">
        <h2 id="override-title" className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Quick override</h2>
        <div className="mt-3 grid grid-cols-3 gap-3">
          {OVERRIDES.map(({ id, label, icon: Icon, color }) => (
            <button
              key={id}
              type="button"
              aria-pressed={override === id}
              onClick={() => setOverride((cur) => (cur === id ? null : id))}
              className={cn(
                'flex flex-col items-center gap-2 rounded-2xl border p-4 text-xs font-medium transition-colors',
                override === id ? 'border-primary bg-primary/10' : 'border-border bg-card',
              )}
            >
              <Icon className={cn('size-6', color)} aria-hidden />
              {label}
            </button>
          ))}
        </div>
        {override === 'break' && (
          <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground" role="status">
            <BatteryLow className="size-4 text-energy" aria-hidden /> Rescheduled deep work to 15:00.
          </p>
        )}
      </section>
    </div>
  )
}

function EnergyCurve() {
  const width = 320
  const height = 110
  const points = Array.from({ length: 49 }, (_, i) => {
    const h = i / 2
    const energy =
      0.15 + 0.7 * Math.exp(-((h - 11) ** 2) / 10) + 0.4 * Math.exp(-((h - 17) ** 2) / 6) - 0.1 * Math.exp(-((h - 14) ** 2) / 2)
    return [(h / 24) * width, height - Math.min(1, energy) * (height - 10)] as const
  })
  const line = points.map(([x, y], i) => `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`).join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height + 18}`} className="mt-4 w-full" role="img" aria-label="Energy peaks around 11am with a second rise near 5pm">
      <defs>
        <linearGradient id="energy-stroke" x1="0" x2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="55%" stopColor="#c026d3" />
          <stop offset="100%" stopColor="#fb923c" />
        </linearGradient>
        <linearGradient id="energy-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${line} L${width},${height} L0,${height} Z`} fill="url(#energy-fill)" />
      <path d={line} fill="none" stroke="url(#energy-stroke)" strokeWidth="3" strokeLinecap="round" />
      <line x1={(10 / 24) * width} x2={(10 / 24) * width} y1="0" y2={height} stroke="#22d3ee" strokeDasharray="3 4" opacity="0.6" />
      {['12a', '4a', '8a', '12p', '4p', '8p'].map((t, i) => (
        <text key={t} x={(i * 4 * width) / 24 + 4} y={height + 14} fill="#8b97ad" fontSize="10">
          {t}
        </text>
      ))}
    </svg>
  )
}
