'use client'

import { Activity, Check, Heart, Moon, Star, Zap } from 'lucide-react'
import type { Plan } from '@/lib/omnisync'
import { supabase } from '@/lib/supabase'

const METRICS = [
  { label: 'Sleep Duration', value: '7h 20m', note: '22m vs avg', icon: Moon, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'HRV', value: '65ms', note: 'Optimal · +4ms', icon: Activity, color: 'text-violet', bg: 'bg-violet/10' },
  { label: 'Resting HR', value: '58 bpm', note: 'Excellent range', icon: Heart, color: 'text-energy', bg: 'bg-energy/10' },
  { label: 'Readiness', value: '94%', note: 'Ready to perform', icon: Zap, color: 'text-sky-400', bg: 'bg-sky-400/10' },
]

const STAGES = [
  { label: 'Deep Sleep', pct: 28, color: 'bg-accent' },
  { label: 'REM Sleep', pct: 22, color: 'bg-primary' },
  { label: 'Light Sleep', pct: 38, color: 'bg-sky-400' },
  { label: 'Awake', pct: 12, color: 'bg-energy' },
]

export function BiometricsScreen({ plan, onUpgrade }: { plan: Plan; onUpgrade: () => void }) {
  const score = 92
  const circumference = 2 * Math.PI * 34

  // Lemon Squeezy Doğrudan Yönlendirme Fonksiyonu
  const handleCheckout = async () => {
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
  };

  return (
    <div className="flex flex-col gap-4">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Last 24h sync</p>
        <h1 className="text-3xl font-bold">Biometrics</h1>
      </header>

      <section className="flex items-center gap-5 rounded-3xl border border-border bg-card p-5" aria-label="Circadian score">
        <div className="relative size-20 shrink-0">
          <svg viewBox="0 0 80 80" className="size-full -rotate-90" aria-hidden>
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--secondary)" strokeWidth="6" />
            <circle cx="40" cy="40" r="34" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={circumference * (1 - score / 100)} />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold">{score}</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Circadian score</p>
          <p className="text-2xl font-bold text-fuchsia-400">Excellent</p>
          <p className="text-xs text-muted-foreground">Top 8% of OmniSync users today</p>
        </div>
      </section>

      <div className="grid grid-cols-2 gap-3">
        {METRICS.map(({ label, value, note, icon: Icon, color, bg }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start justify-between gap-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-muted-foreground">{label}</p>
              <span className={`flex size-8 items-center justify-center rounded-lg ${bg}`}>
                <Icon className={`size-4 ${color}`} aria-hidden />
              </span>
            </div>
            <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-muted-foreground">{note}</p>
          </div>
        ))}
      </div>

      <section className="rounded-3xl border border-border bg-card p-5" aria-labelledby="stages-title">
        <div className="flex items-center justify-between">
          <h2 id="stages-title" className="font-semibold">Sleep Stages</h2>
          <span className="text-xs text-muted-foreground">Last night · 7h 20m</span>
        </div>
        <ul className="mt-4 flex flex-col gap-3">
          {STAGES.map((s) => (
            <li key={s.label} className="flex items-center gap-3 text-sm">
              <span className="w-24 shrink-0">{s.label}</span>
              <span className="h-1.5 flex-1 rounded-full bg-secondary">
                <span className={`block h-full rounded-full ${s.color}`} style={{ width: `${s.pct * 2}%` }} />
              </span>
              <span className="w-10 text-right tabular-nums text-muted-foreground">{s.pct}%</span>
            </li>
          ))}
        </ul>
      </section>

      {plan === 'basic' ? (
        <section className="rounded-3xl border border-accent/40 bg-gradient-to-br from-accent/20 to-card p-5" aria-label="Upgrade to Pro">
          <div className="flex items-center gap-3">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent">
              <Star className="size-5 fill-current text-white" aria-hidden />
            </span>
            <div>
              <p className="font-bold">OmniSync Pro</p>
              <p className="text-xs text-muted-foreground">Unlock AI auto-scheduling & advanced HRV</p>
            </div>
          </div>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-xs">
            {['AI Auto-Scheduling', 'Burnout Warning', 'Advanced HRV', 'Sleep AI Coach'].map((f) => (
              <li key={f} className="flex items-center gap-1.5"><Check className="size-3.5 text-primary" aria-hidden />{f}</li>
            ))}
          </ul>
          <button type="button" onClick={handleCheckout} className="mt-5 h-12 w-full rounded-2xl bg-accent font-semibold text-accent-foreground transition-opacity hover:opacity-90 cursor-pointer">
            Start 7-Day Free Trial · $5/mo
          </button>
        </section>
      ) : (
        <p className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm text-primary">
          {plan === 'pro' ? 'Pro' : 'Plus'} active · Advanced HRV insights unlocked.
        </p>
      )}
    </div>
  )
}