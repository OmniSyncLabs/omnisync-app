'use client'

import { useState } from 'react'
import { Activity, ArrowLeft, Mail } from 'lucide-react'
import { cn } from '@/lib/utils'

type Mode = 'login' | 'signup'

export function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: (user: { name: string; email: string; provider: 'google' | 'email' }, isNewUser: boolean) => void
}) {
  const [mode, setMode] = useState<Mode>('login')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState<'google' | 'email' | null>(null)

  function finish(provider: 'google' | 'email', address: string) {
    const raw = address.split('@')[0]?.replace(/[^a-zA-Z]/g, '') || 'Kaan'
    const name = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase()
    setPending(provider)
    window.setTimeout(() => onAuthenticated({ name, email: address, provider }, mode === 'signup'), 600)
  }

  function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) return setError('Enter a valid email address.')
    if (password.length < 8) return setError('Password must be at least 8 characters.')
    setError('')
    finish('email', email.trim())
  }

  return (
    <div className="no-scrollbar flex h-full flex-col overflow-y-auto overflow-x-hidden px-6 pb-24 pt-12">
      <div className="flex flex-col items-center gap-3 pt-6 text-center">
        <div className="flex size-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
          <Activity className="size-8 text-primary" aria-hidden />
        </div>
        <h1 className="bg-gradient-to-r from-primary to-sky-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent">
          OmniSync
        </h1>
        <p className="text-muted-foreground">Align Your Biological Rhythm</p>
      </div>

      <div className="mt-8 rounded-3xl border border-border bg-card p-5">
        <div role="tablist" aria-label="Authentication mode" className="grid grid-cols-2 gap-1 rounded-2xl bg-muted p-1">
          {(['login', 'signup'] as const).map((m) => (
            <button
              key={m}
              role="tab"
              type="button"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cn(
                'rounded-xl py-2.5 text-sm font-semibold transition-colors',
                mode === m ? 'bg-primary/15 text-primary' : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {m === 'login' ? 'Log In' : 'Create Account'}
            </button>
          ))}
        </div>

        <h2 className="mt-6 text-2xl font-bold text-balance">
          {mode === 'login' ? 'Welcome back' : 'Find your natural rhythm'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === 'login' ? 'Your energy. Your schedule. In perfect sync.' : 'A calmer, more focused day starts here.'}
        </p>

        {!showEmailForm ? (
          <div className="mt-6 flex flex-col gap-3">
            <button
              type="button"
              disabled={pending !== null}
              onClick={() => finish('google', 'kaan@gmail.com')}
              className="flex h-12 items-center justify-center gap-3 rounded-2xl bg-white font-semibold text-slate-900 transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              <GoogleIcon />
              {pending === 'google' ? 'Connecting…' : 'Continue with Google'}
            </button>
            <div className="flex items-center gap-3 text-xs text-muted-foreground" aria-hidden>
              <span className="h-px flex-1 bg-border" />
              or
              <span className="h-px flex-1 bg-border" />
            </div>
            <button
              type="button"
              onClick={() => setShowEmailForm(true)}
              className="flex h-12 items-center justify-center gap-2 rounded-2xl border border-border bg-secondary font-semibold transition-colors hover:bg-secondary/70"
            >
              <Mail className="size-4" aria-hidden />
              Continue with Email
            </button>
          </div>
        ) : (
          <form onSubmit={handleEmailSubmit} className="mt-6 flex flex-col gap-4" noValidate>
            <button
              type="button"
              onClick={() => setShowEmailForm(false)}
              className="flex items-center gap-1 self-start text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden /> All sign-in options
            </button>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Email
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 rounded-2xl border border-border bg-muted px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Password
              <input
                type="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8+ characters"
                className="h-12 rounded-2xl border border-border bg-muted px-4 text-base font-normal outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </label>
            {error && (
              <p role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending !== null}
              className="h-12 rounded-2xl bg-gradient-to-r from-primary to-sky-400 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {pending ? 'Signing in…' : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-center text-xs leading-relaxed text-muted-foreground">
        Prototype sign-in. Google is simulated and passwords are never stored or sent.
      </p>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.8 3.5 14.6 2.5 12 2.5 6.8 2.5 2.6 6.7 2.6 12s4.2 9.5 9.4 9.5c5.4 0 9-3.8 9-9.2 0-.6-.1-1.1-.2-1.6H12z" />
    </svg>
  )
}
