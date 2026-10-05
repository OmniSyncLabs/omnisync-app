'use client'

import { useEffect, useState } from 'react'
import { ArrowRight, Check, Clock, Sparkles, Star, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PLAN_PRICES, type Plan } from '@/lib/omnisync'
import { supabase } from '@/lib/supabase'

const OFFER_DURATION_MS = 10 * 60 * 1000

const PRO_FEATURES = [
  'Up to 10 auto-scheduled events & calendar sync',
  'Auto DND & Focus Mode Sync (Watch/Phone)',
  'Daily AI Voice Morning Briefing',
  'Burnout Early Warning System (3-day HRV)',
  'Unlimited Pro AI Advisor',
]
const PLUS_FEATURES = [
  'Up to 100 events / unlimited power tasks',
  'Bio-Sync Partner Matching',
  'Social Focus Rooms & Live Routine Sync',
  'Exportable HRV & Health PDF Reports',
]

export function Paywall({ onClose, onSubscribe }: { onClose: () => void; onSubscribe: (plan: Exclude<Plan, 'basic'>) => void }) {
  const [phase, setPhase] = useState<'offer' | 'discount'>('offer')

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="paywall-title"
      className="no-scrollbar absolute inset-0 z-50 overflow-y-auto overflow-x-hidden bg-background px-5 pb-12 pt-12"
    >
      <button
        type="button"
        onClick={() => (phase === 'offer' ? setPhase('discount') : onClose())}
        aria-label={phase === 'offer' ? 'Close plans' : 'Dismiss offer and continue'}
        className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
      >
        <X className="size-5" aria-hidden />
      </button>

      {phase === 'offer' ? (
        <>
          <div className="flex flex-col items-center gap-2 pt-4 text-center">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-accent/20">
              <Sparkles className="size-6 text-accent" aria-hidden />
            </span>
            <h2 id="paywall-title" className="text-2xl font-bold text-balance">
              Find your next rhythm
            </h2>
            <p className="text-sm text-muted-foreground">More insight. Less friction. Your pace.</p>
          </div>
          <div className="mt-6 flex flex-col gap-4">
            <PlanCard plan="pro" price={PLAN_PRICES.pro} onSelect={onSubscribe} />
            <PlanCard plan="plus" price={PLAN_PRICES.plus} onSelect={onSubscribe} />
          </div>
          <p className="mt-5 text-center text-xs text-muted-foreground">Cancel anytime. 7-day free trial on Pro & Plus.</p>
        </>
      ) : (
        <DiscountOffer onSubscribe={onSubscribe} onClose={onClose} />
      )}
    </div>
  )
}

function DiscountOffer({ onSubscribe, onClose }: { onSubscribe: (plan: 'pro' | 'plus') => void; onClose: () => void }) {
  const [deadline] = useState(() => Date.now() + OFFER_DURATION_MS)
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(timer)
  }, [])

  const remaining = Math.max(0, deadline - now)
  const expired = remaining === 0
  const minutes = String(Math.floor(remaining / 60000)).padStart(2, '0')
  const seconds = String(Math.floor((remaining % 60000) / 1000)).padStart(2, '0')

  return (
    <>
      <div className="flex flex-col items-center gap-2 pt-4 text-center">
        <span className="rounded-full bg-energy/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-energy">
          One-time offer
        </span>
        <h2 id="paywall-title" className="text-3xl font-bold text-balance">
          {expired ? 'Offer expired' : 'Wait — 50% off, just for you'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {expired ? 'Regular pricing is still available.' : 'Unlock OmniSync at half price before the timer runs out.'}
        </p>
      </div>

      <div
        className="mx-auto mt-6 flex items-center gap-3 rounded-2xl border border-energy/40 bg-energy/10 px-5 py-3"
        role="timer"
        aria-live="off"
        aria-label={`Offer ends in ${minutes} minutes ${seconds} seconds`}
      >
        <Clock className="size-5 text-energy" aria-hidden />
        <span className="font-mono text-3xl font-bold tabular-nums text-energy">
          {minutes}:{seconds}
        </span>
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <PlanCard plan="pro" price={PLAN_PRICES.pro} discounted={!expired} onSelect={onSubscribe} />
        <PlanCard plan="plus" price={PLAN_PRICES.plus} discounted={!expired} onSelect={onSubscribe} />
      </div>
      <button type="button" onClick={onClose} className="mx-auto mt-5 block text-sm text-muted-foreground underline-offset-4 hover:underline">
        No thanks, continue with Basic
      </button>
    </>
  )
}

function PlanCard({
  plan,
  price,
  discounted = false,
  onSelect,
}: {
  plan: 'pro' | 'plus'
  price: number
  discounted?: boolean
  onSelect: (plan: 'pro' | 'plus') => void
}) {
  const isPro = plan === 'pro'
  const finalPrice = discounted ? price / 2 : price
  const features = isPro ? PRO_FEATURES : PLUS_FEATURES
  const [checkoutUrl, setCheckoutUrl] = useState('https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setCheckoutUrl(`https://omnisync-app.lemonsqueezy.com/checkout/buy/0e12cb09-c14a-4cdd-aa67-c9bd6f6f6917?checkout[email]=${encodeURIComponent(user.email || '')}&checkout[custom][user_id]=${user.id}`)
      }
    })
  }, [])

  return (
    <section
      aria-label={`${isPro ? 'Pro' : 'Plus'} plan`}
      className={cn(
        'rounded-3xl border p-5',
        isPro ? 'border-primary/60 bg-card shadow-[0_0_40px_-12px_rgba(34,211,238,0.5)]' : 'border-border bg-card',
      )}
    >
      <div className="flex items-center justify-between">
        <span className={cn('text-sm font-bold uppercase tracking-[0.2em]', isPro ? 'text-primary' : 'text-violet')}>
          {isPro ? 'Pro' : 'Plus'}
        </span>
        {isPro && (
          <span className="flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
            <Star className="size-3 fill-current" aria-hidden /> Most popular
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className={cn('text-4xl font-bold', isPro ? 'text-primary' : 'text-violet')}>
          ${finalPrice % 1 === 0 ? finalPrice : finalPrice.toFixed(2)}
        </span>
        {discounted && <span className="text-lg text-muted-foreground line-through">${price}</span>}
        <span className="text-sm text-muted-foreground">/ month</span>
      </div>
      {discounted && (
        <span className="mt-2 inline-block rounded-full border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-400">
          Save 50%
        </span>
      )}
      <div className="my-4 h-px bg-border" />
      <p className={cn('flex items-center gap-2 text-sm font-semibold', isPro ? 'text-primary' : 'text-violet')}>
        <ArrowRight className="size-4" aria-hidden />
        {isPro ? 'Everything in Basic, plus:' : 'Everything in Pro, plus:'}
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
            <Check className={cn('mt-0.5 size-4 shrink-0', isPro ? 'text-primary' : 'text-violet')} aria-hidden />
            {f}
          </li>
        ))}
      </ul>
      <a
        href={checkoutUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'mt-5 flex h-12 w-full items-center justify-center rounded-2xl font-semibold transition-opacity hover:opacity-90 cursor-pointer',
          isPro
            ? 'bg-gradient-to-r from-primary to-sky-400 text-primary-foreground'
            : 'border border-violet/40 bg-violet/15 text-violet',
        )}
      >
        {isPro ? 'Start 7-Day Free Trial' : 'Get Plus Membership'}
      </a>
    </section>
  )
}