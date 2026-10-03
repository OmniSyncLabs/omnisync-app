'use client'

import { useState } from 'react'
import { ArrowLeft, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { CHRONOTYPES, GENDERS, HABITS, type Chronotype } from '@/lib/omnisync'
import { WheelPicker } from './wheel-picker'

const AGE_OPTIONS = Array.from({ length: 68 }, (_, i) => ({ value: i + 13, label: `${i + 13} years` }))
const STEPS = ['Age', 'Gender', 'Chronotype', 'Habits'] as const

export type OnboardingAnswers = { age: number; gender: string; chronotype: Chronotype; habits: string[] }

export function Onboarding({ name, onComplete }: { name: string; onComplete: (answers: OnboardingAnswers) => void }) {
  const [step, setStep] = useState(0)
  const [age, setAge] = useState(25)
  const [gender, setGender] = useState('')
  const [chronotype, setChronotype] = useState<Chronotype | null>(null)
  const [habits, setHabits] = useState<string[]>([])

  const canContinue = [true, gender !== '', chronotype !== null, true][step]
  const isLast = step === STEPS.length - 1

  function next() {
    if (!canContinue) return
    if (isLast && chronotype) onComplete({ age, gender, chronotype, habits })
    else setStep((s) => s + 1)
  }

  return (
    <div className="flex h-full flex-col overflow-x-hidden px-6 pb-8 pt-12">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          aria-label="Previous question"
          className="flex size-10 items-center justify-center rounded-full border border-border bg-card disabled:opacity-30"
        >
          <ArrowLeft className="size-4" aria-hidden />
        </button>
        <div
          className="flex flex-1 gap-1.5"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Onboarding progress"
        >
          {STEPS.map((s, i) => (
            <span key={s} className={cn('h-1.5 flex-1 rounded-full', i <= step ? 'bg-primary' : 'bg-secondary')} />
          ))}
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {step + 1}/{STEPS.length}
        </span>
      </div>

      <div className="no-scrollbar mt-8 flex-1 overflow-y-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Quick setup · {STEPS[step]}</p>

        {step === 0 && (
          <Question title={`Nice to meet you, ${name}. How old are you?`} hint="Age shapes your natural sleep pressure.">
            <WheelPicker label="Age" options={AGE_OPTIONS} value={age} onChange={setAge} />
          </Question>
        )}

        {step === 1 && (
          <Question title="What's your gender?" hint="Hormonal cycles influence daily energy.">
            <div className="flex flex-col gap-3" role="radiogroup" aria-label="Gender">
              {GENDERS.map((g) => (
                <OptionButton key={g} selected={gender === g} onClick={() => setGender(g)} role="radio">
                  {g}
                </OptionButton>
              ))}
            </div>
          </Question>
        )}

        {step === 2 && (
          <Question title="Which chronotype sounds like you?" hint="We use it to map your peak focus windows.">
            <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-label="Chronotype">
              {(Object.keys(CHRONOTYPES) as Chronotype[]).map((key) => {
                const c = CHRONOTYPES[key]
                const Icon = c.icon
                const selected = chronotype === key
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setChronotype(key)}
                    className={cn(
                      'flex flex-col items-start gap-2 rounded-2xl border p-4 text-left transition-colors',
                      selected ? 'border-primary bg-primary/10' : 'border-border bg-card hover:border-primary/40',
                    )}
                  >
                    <Icon className={cn('size-6', selected ? 'text-primary' : 'text-violet')} aria-hidden />
                    <span className="font-semibold">{c.label}</span>
                    <span className="text-xs leading-relaxed text-muted-foreground">{c.description}</span>
                  </button>
                )
              })}
            </div>
          </Question>
        )}

        {step === 3 && (
          <Question title="Which habits are part of your day?" hint="Select all that apply. You can skip this.">
            <div className="flex flex-wrap gap-2">
              {HABITS.map((h) => {
                const selected = habits.includes(h)
                return (
                  <button
                    key={h}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setHabits((prev) => (selected ? prev.filter((x) => x !== h) : [...prev, h]))}
                    className={cn(
                      'flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors',
                      selected ? 'border-primary bg-primary/15 text-primary' : 'border-border bg-card text-foreground',
                    )}
                  >
                    {selected && <Check className="size-3.5" aria-hidden />}
                    {h}
                  </button>
                )
              })}
            </div>
          </Question>
        )}
      </div>

      <button
        type="button"
        onClick={next}
        disabled={!canContinue}
        className="mt-6 h-12 shrink-0 rounded-2xl bg-gradient-to-r from-primary to-sky-400 font-semibold text-primary-foreground transition-opacity disabled:opacity-40"
      >
        {isLast ? 'Finish setup' : 'Continue'}
      </button>
    </div>
  )
}

function Question({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="mt-2 flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-balance">{title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{hint}</p>
      </div>
      {children}
    </div>
  )
}

function OptionButton({
  selected,
  onClick,
  children,
  role,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  role: string
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={cn(
        'flex h-14 items-center justify-between rounded-2xl border px-5 text-left font-medium transition-colors',
        selected ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card hover:border-primary/40',
      )}
    >
      {children}
      {selected && <Check className="size-4" aria-hidden />}
    </button>
  )
}
