'use client'

import { useState } from 'react'
import { ArrowUp, Clock, Plus, Trash2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Toggle } from './toggle'
import type { EventItem } from './omnisync-app'

const TONE: Record<string, { dot: string; chip: string }> = {
  accent: { dot: 'bg-accent', chip: 'border-accent/40 bg-accent/15 text-fuchsia-300' },
  primary: { dot: 'bg-primary', chip: 'border-primary/40 bg-primary/10 text-primary' },
  energy: { dot: 'bg-energy', chip: 'border-energy/40 bg-energy/10 text-energy' },
}

interface ScheduleScreenProps {
  userPlan?: 'basic' | 'pro' | 'plus'
  events?: EventItem[]
  onAddEvent?: (newEvent: Omit<EventItem, 'id'>) => boolean
  onDeleteEvent?: (id: string) => void
  onOpenPaywall?: () => void
}

export function ScheduleScreen({
  userPlan = 'basic',
  events = [],
  onAddEvent,
  onDeleteEvent,
  onOpenPaywall,
}: ScheduleScreenProps) {
  const [optimize, setOptimize] = useState(true)

  // Yeni görev ekleme form durumları
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newCategory, setNewCategory] = useState('Verimlilik')
  const [newLoad, setNewLoad] = useState('Beyin Yükü: Sev. 3')
  const [newTime, setNewTime] = useState('14:00')

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return

    // 10 Event Sınırı Kontrolü (Basic Plan)
    if (userPlan === 'basic' && events.length >= 10) {
      if (onOpenPaywall) onOpenPaywall()
      return
    }

    if (onAddEvent) {
      const success = onAddEvent({
        title: newTitle,
        category: newCategory,
        load: newLoad,
        time: newTime,
        days: '1 Days',
      })

      if (success) {
        setNewTitle('')
        setShowAddModal(false)
      } else if (onOpenPaywall) {
        onOpenPaywall()
      }
    }
  }

  return (
    <div className="flex flex-col gap-5">
      <header className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Today · Oct 1</p>
          <h1 className="text-3xl font-bold">Smart Schedule</h1>
        </div>
        <div className="flex items-center gap-3 pb-1">
          <button
            type="button"
            onClick={() => {
              if (userPlan === 'basic' && events.length >= 10) {
                if (onOpenPaywall) onOpenPaywall()
              } else {
                setShowAddModal(!showAddModal)
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" /> Add Event ({events.length}/10)
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary">AI Optimize</span>
            <Toggle checked={optimize} onChange={setOptimize} label="AI Optimize schedule" />
          </div>
        </div>
      </header>

      {/* AI Scheduler Formu */}
      {showAddModal && (
        <form onSubmit={handleAddTask} className="flex flex-col gap-3 rounded-2xl border border-primary/40 bg-card p-4 shadow-lg">
          <h3 className="font-bold text-sm text-primary">Add Event with AI Scheduler</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Event Title (e.g. Daily Rhythm Review)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="Category (e.g. Sports, Productivity)"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Time (e.g. 14:00)"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary w-32"
            />
            <select
              value={newLoad}
              onChange={(e) => setNewLoad(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="Beyin Yükü: Sev. 1">Beyin Yükü: Sev. 1</option>
              <option value="Beyin Yükü: Sev. 2">Beyin Yükü: Sev. 2</option>
              <option value="Beyin Yükü: Sev. 3">Beyin Yükü: Sev. 3</option>
              <option value="Beyin Yükü: Sev. 4">Beyin Yükü: Sev. 4</option>
              <option value="Beyin Yükü: Sev. 5">Beyin Yükü: Sev. 5</option>
            </select>
            <button
              type="submit"
              className="ml-auto rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Save Event
            </button>
          </div>
        </form>
      )}

      <div className="flex items-center gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-sky-400">
          <Zap className="size-5 text-primary-foreground" aria-hidden />
        </span>
        <div>
          <p className="font-semibold text-primary">Peak Focus Window Active</p>
          <p className="text-xs text-muted-foreground">10:00 – 12:30 · {optimize ? 'AI front-loaded high-focus tasks' : 'Manual order'}</p>
        </div>
      </div>

      <section className="flex flex-col gap-3">
        <ul className="flex flex-col gap-3">
          {events.map((ev) => (
            <li key={ev.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <span className="size-4 rounded-md bg-primary" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{ev.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {ev.category} · <span className="text-sky-400">{ev.load}</span>
                  </p>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {ev.time}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3" aria-hidden />
                    {ev.days}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
                <span>Active Event</span>
                {onDeleteEvent && (
                  <button
                    type="button"
                    onClick={() => onDeleteEvent(ev.id)}
                    className="flex size-8 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-4" aria-hidden />
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}