'use client'

import { useEffect, useState } from 'react'
import { ArrowUp, Clock, Plus, Trash2, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Toggle } from './toggle'

type Task = {
  id: string
  title: string
  detail: string
  tag: string
  duration: string
  focus: 'high' | 'low'
  tone: 'accent' | 'primary' | 'energy'
}

const INITIAL_TASKS: Task[] = [
  { id: 't1', title: 'Code Backend API', detail: 'Auth module · Supabase integration', tag: 'Deep Work', duration: '2h 30m', focus: 'high', tone: 'accent' },
  { id: 't2', title: 'Physics Exam Prep', detail: 'Quantum Mechanics Ch.4', tag: 'High Focus', duration: '1h 45m', focus: 'high', tone: 'primary' },
  { id: 't3', title: 'Reply to Emails', detail: 'Team Slack + 12 pending inbox', tag: 'Admin', duration: '45m', focus: 'low', tone: 'energy' },
  { id: 't4', title: 'Organize Workspace', detail: 'Files, bookmarks, Notion cleanup', tag: 'Low Effort', duration: '30m', focus: 'low', tone: 'energy' },
]

const TONE = {
  accent: { dot: 'bg-accent', chip: 'border-accent/40 bg-accent/15 text-fuchsia-300' },
  primary: { dot: 'bg-primary', chip: 'border-primary/40 bg-primary/10 text-primary' },
  energy: { dot: 'bg-energy', chip: 'border-energy/40 bg-energy/10 text-energy' },
}

interface ScheduleScreenProps {
  userPlan?: 'basic' | 'pro' | 'plus'
  onOpenPaywall?: () => void
}

export function ScheduleScreen({ userPlan = 'basic', onOpenPaywall }: ScheduleScreenProps) {
  const [optimize, setOptimize] = useState(true)
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS)
  const [isLoaded, setIsLoaded] = useState(false)

  // Yeni görev ekleme form durumları
  const [showAddModal, setShowAddModal] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const [newDetail, setNewDetail] = useState('')
  const [newDuration, setNewDuration] = useState('30m')
  const [newFocus, setNewFocus] = useState<'high' | 'low'>('high')

  // Sayfa yüklendiğinde LocalStorage'dan görevleri yükle (Kalıcılık)
  useEffect(() => {
    const saved = localStorage.getItem('omnisync_tasks')
    if (saved) {
      try {
        setTasks(JSON.parse(saved))
      } catch (e) {
        console.error('Görevler yüklenirken hata oluştu:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  // Görevler değiştikçe LocalStorage'a kaydet
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('omnisync_tasks', JSON.stringify(tasks))
    }
  }, [tasks, isLoaded])

  function moveUp(id: string) {
    setTasks((prev) => {
      const i = prev.findIndex((t) => t.id === id)
      if (i <= 0) return prev
      const next = [...prev]
      ;[next[i - 1], next[i]] = [next[i], next[i - 1]]
      return next
    })
  }

  function deleteTask(id: string) {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault()
    if (!newTitle.trim()) return

    // 10 Görev Sınırı Kontrolü (Basic Plan)
    if (userPlan === 'basic' && tasks.length >= 10) {
      alert('Basic planda maksimum 10 görev ekleyebilirsiniz. Lütfen Pro veya Plus plana yükseltin!')
      if (onOpenPaywall) onOpenPaywall()
      return
    }

    const newTask: Task = {
      id: `t_${Date.now()}`,
      title: newTitle,
      detail: newDetail || 'Quick Task',
      tag: newFocus === 'high' ? 'High Focus' : 'Low Effort',
      duration: newDuration,
      focus: newFocus,
      tone: newFocus === 'high' ? 'primary' : 'energy',
    }

    setTasks((prev) => [newTask, ...prev])
    setNewTitle('')
    setNewDetail('')
    setShowAddModal(false)
  }

  const ordered = optimize ? [...tasks].sort((a, b) => (a.focus === b.focus ? 0 : a.focus === 'high' ? -1 : 1)) : tasks
  const high = ordered.filter((t) => t.focus === 'high')
  const low = ordered.filter((t) => t.focus === 'low')

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
              if (userPlan === 'basic' && tasks.length >= 10) {
                if (onOpenPaywall) onOpenPaywall()
              } else {
                setShowAddModal(!showAddModal)
              }
            }}
            className="flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"
          >
            <Plus className="size-4" /> Add Task ({tasks.length}/10)
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-primary">AI Optimize</span>
            <Toggle checked={optimize} onChange={setOptimize} label="AI Optimize schedule" />
          </div>
        </div>
      </header>

      {/* Yeni Görev Ekleme Formu */}
      {showAddModal && (
        <form onSubmit={handleAddTask} className="flex flex-col gap-3 rounded-2xl border border-primary/40 bg-card p-4 shadow-lg">
          <h3 className="font-bold text-sm text-primary">Add New Task</h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Task Title (e.g. Math Homework)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              required
            />
            <input
              type="text"
              placeholder="Detail (e.g. Chapter 3, page 42)"
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <select
              value={newDuration}
              onChange={(e) => setNewDuration(e.target.value)}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="15m">15m</option>
              <option value="30m">30m</option>
              <option value="45m">45m</option>
              <option value="1h">1h</option>
              <option value="2h">2h</option>
            </select>
            <select
              value={newFocus}
              onChange={(e) => setNewFocus(e.target.value as 'high' | 'low')}
              className="rounded-xl border border-border bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="high">High Focus</option>
              <option value="low">Low Focus / Admin</option>
            </select>
            <button
              type="submit"
              className="ml-auto rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:opacity-90"
            >
              Save Task
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

      <TaskGroup title="High Focus Needed" meta="Peak Hours · 10–12:30" dot="bg-primary" tasks={high} onMoveUp={moveUp} onDelete={deleteTask} />

      <div className="flex items-center gap-3 text-sm text-muted-foreground" aria-hidden>
        <span className="h-px flex-1 bg-border" />
        <span className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5"><Clock className="size-3.5" />1:00 PM · Energy Dip</span>
        <span className="h-px flex-1 bg-border" />
      </div>

      <TaskGroup title="Low Focus / Admin" meta="Dip Hours · 1–3 PM" dot="bg-energy" tasks={low} onMoveUp={moveUp} onDelete={deleteTask} />
    </div>
  )
}

function TaskGroup({
  title,
  meta,
  dot,
  tasks,
  onMoveUp,
  onDelete,
}: {
  title: string
  meta: string
  dot: string
  tasks: Task[]
  onMoveUp: (id: string) => void
  onDelete: (id: string) => void
}) {
  return (
    <section className="flex flex-col gap-3" aria-label={title}>
      <div className="flex items-center gap-3">
        <span className={cn('size-2.5 rounded-full', dot)} aria-hidden />
        <h2 className="font-semibold">{title}</h2>
        <span className="h-px flex-1 bg-border" aria-hidden />
        <span className="text-xs text-muted-foreground">{meta}</span>
      </div>
      <ul className="flex flex-col gap-3">
        {tasks.map((task) => (
          <li key={task.id} className="rounded-2xl border border-border bg-card p-4">
            <div className="flex items-start gap-3">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <span className={cn('size-4 rounded-md', TONE[task.tone].dot)} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{task.title}</p>
                <p className="truncate text-sm text-muted-foreground">{task.detail}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <span className={cn('rounded-full border px-2.5 py-0.5 text-xs font-semibold', TONE[task.tone].chip)}>{task.tag}</span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground"><Clock className="size-3" aria-hidden />{task.duration}</span>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between border-t border-border pt-2 text-xs text-muted-foreground">
              <span>Reschedule</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onDelete(task.id)}
                  aria-label={`Delete ${task.title}`}
                  className="flex size-8 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => onMoveUp(task.id)}
                  aria-label={`Move ${task.title} earlier`}
                  className="flex size-8 items-center justify-center rounded-full hover:bg-secondary hover:text-foreground"
                >
                  <ArrowUp className="size-4" aria-hidden />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}