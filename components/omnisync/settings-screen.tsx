'use client'

import { useState } from 'react'
import { ChevronDown, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CHRONOTYPES, initialsOf, type Plan, type Profile } from '@/lib/omnisync'
import { Toggle } from './toggle'
import { WheelPicker } from './wheel-picker'

const DEVICES = ['Apple Watch Series 10', 'Oura Ring Gen 4', 'Whoop 5.0', 'Google Pixel Watch', 'Garmin Venu 3', 'Fitbit Charge 6', 'No wearable'].map((d) => ({ value: d, label: d }))
const SLEEP_TARGETS = Array.from({ length: 13 }, (_, i) => {
  const minutes = 360 + i * 30
  return { value: minutes, label: `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m` }
})
const TIMEZONES = [
  'America/Los_Angeles', 'America/Denver', 'America/Chicago', 'America/New_York', 'America/Sao_Paulo', 'Europe/London',
  'Europe/Berlin', 'Europe/Istanbul', 'Asia/Dubai', 'Asia/Kolkata', 'Asia/Singapore', 'Asia/Tokyo', 'Australia/Sydney',
].map((t) => ({ value: t, label: t }))

export function SettingsScreen({ profile, plan, onUpgrade, onLogout }: { profile: Profile; plan: Plan; onUpgrade: () => void; onLogout: () => void }) {
  const [healthSync, setHealthSync] = useState(true)
  const [focusSync, setFocusSync] = useState(true)
  const [briefing, setBriefing] = useState(true)
  const [reminders, setReminders] = useState(true)
  const [analytics, setAnalytics] = useState(false)
  const [device, setDevice] = useState('Apple Watch Series 10')
  const [sleepTarget, setSleepTarget] = useState(480)
  const [timezone, setTimezone] = useState('Europe/Istanbul')
  const chrono = CHRONOTYPES[profile.chronotype]
  const ChronoIcon = chrono.icon
  const sleepLabel = SLEEP_TARGETS.find((s) => s.value === sleepTarget)?.label

  return (
    <div className="flex flex-col gap-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Your rhythm, your rules</p>
        <h1 className="mt-1 text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Make OmniSync work around you.</p>
      </header>

      <section className="rounded-3xl border border-border bg-gradient-to-br from-violet/15 to-card p-5" aria-label="Profile">
        <div className="flex items-center gap-4">
          <div className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-violet text-2xl font-bold text-white">
            {initialsOf(profile.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xl font-bold">{profile.name}</p>
            <p className="truncate text-sm text-muted-foreground">{profile.email}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-violet/15 px-3 py-1 text-xs font-medium text-fuchsia-200">
              <ChronoIcon className="size-3.5" aria-hidden /> {chrono.label} Chronotype
            </span>
          </div>
        </div>
        <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
          {[
            ['Age', String(profile.age)],
            ['Peak', chrono.peak.split(' – ')[0]],
            ['Plan', plan[0].toUpperCase() + plan.slice(1)],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl bg-muted/70 py-2">
              <dt className="text-[11px] uppercase tracking-wider text-muted-foreground">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </div>
          ))}
        </dl>
        {profile.habits.length > 0 && (
          <p className="mt-3 text-xs text-muted-foreground">Habits: {profile.habits.join(', ')}</p>
        )}
      </section>

      <Group index="01" title="Biometric & Health Sync">
        <Row title="Apple Health / Google Fit" subtitle={healthSync ? 'Active · Health sync enabled' : 'Paused'}>
          <Toggle checked={healthSync} onChange={setHealthSync} label="Health integration" />
        </Row>
        <Row title="Auto Focus Mode Sync" subtitle="Sync Do Not Disturb with focus windows">
          <Toggle checked={focusSync} onChange={setFocusSync} label="Auto focus mode sync" />
        </Row>
        <PickerRow title="Primary Wearable Device" value={device}>
          <WheelPicker label="Primary wearable device" options={DEVICES} value={device} onChange={setDevice} />
        </PickerRow>
      </Group>

      <Group index="02" title="Circadian & Routine">
        <PickerRow title="Sleep Target" value={sleepLabel ?? ''}>
          <WheelPicker label="Sleep target hours" options={SLEEP_TARGETS} value={sleepTarget} onChange={setSleepTarget} />
        </PickerRow>
        <PickerRow title="Timezone" value={timezone}>
          <WheelPicker label="Timezone" options={TIMEZONES} value={timezone} onChange={setTimezone} />
        </PickerRow>
        <Row title="AI Morning Voice Briefing" subtitle="8:00 AM · Your day, in sync">
          <Toggle checked={briefing} onChange={setBriefing} label="AI morning voice briefing" />
        </Row>
      </Group>

      <Group index="03" title="Account & Security">
        <div className="p-4">
          <p className="font-semibold">Linked account</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {profile.provider === 'google' ? 'Google' : 'Email'}: {profile.email}
          </p>
        </div>
        <Accordion title="Notifications">
          <Row title="Energy & routine reminders" subtitle="Alerts for focus and rest windows" flush>
            <Toggle checked={reminders} onChange={setReminders} label="Energy and routine reminders" />
          </Row>
        </Accordion>
        <Accordion title="Privacy & Security">
          <Row title="Share usage analytics" subtitle="Optional anonymous app usage insights" flush>
            <Toggle checked={analytics} onChange={setAnalytics} label="Share usage analytics" />
          </Row>
        </Accordion>
        <Accordion title="Help & Support">
          <p className="text-sm font-semibold">How do energy overrides work?</p>
          <p className="mt-1 text-sm text-muted-foreground">Use Home&apos;s quick override buttons to tell OmniSync how you feel right now.</p>
        </Accordion>
      </Group>

      <section className="rounded-3xl border border-primary/30 bg-gradient-to-br from-card to-accent/10 p-5" aria-label="Membership">
        <div className="flex items-center justify-between">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Your membership</p>
          <span className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
            {plan === 'basic' ? 'Free forever' : 'Active'}
          </span>
        </div>
        <p className="mt-3 text-xl font-bold">
          Active Plan: {plan === 'basic' ? 'Basic ($0)' : plan === 'pro' ? 'Pro ($5/mo)' : 'Plus ($8/mo)'}
        </p>
        <button type="button" onClick={onUpgrade} className="mt-4 h-12 w-full rounded-2xl bg-gradient-to-r from-primary to-sky-400 font-semibold text-primary-foreground">
          {plan === 'basic' ? 'Upgrade Subscription' : 'Manage Subscription'}
        </button>
      </section>

      <button type="button" onClick={onLogout} className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-destructive/5 font-semibold text-destructive">
        <LogOut className="size-4" aria-hidden /> Log Out
      </button>
    </div>
  )
}

function Group({ index, title, children }: { index: string; title: string; children: React.ReactNode }) {
  return (
    <section aria-label={title}>
      <h2 className="mb-3 flex items-center gap-3 text-sm font-semibold text-muted-foreground">
        <span className="font-mono text-primary">{index}</span>
        {title}
      </h2>
      <div className="divide-y divide-border overflow-hidden rounded-3xl border border-border bg-card">{children}</div>
    </section>
  )
}

function Row({ title, subtitle, children, flush }: { title: string; subtitle: string; children: React.ReactNode; flush?: boolean }) {
  return (
    <div className={cn('flex items-center justify-between gap-4', !flush && 'p-4')}>
      <div className="min-w-0">
        <p className="font-semibold">{title}</p>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
      {children}
    </div>
  )
}

function PickerRow({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="font-semibold">{title}</p>
        <p className="truncate text-sm text-primary">{value}</p>
      </div>
      {children}
    </div>
  )
}

function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <details className="group p-4">
      <summary className="flex cursor-pointer list-none items-center justify-between font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown className="size-4 text-primary transition-transform group-open:rotate-180" aria-hidden />
      </summary>
      <div className="mt-4">{children}</div>
    </details>
  )
}
