'use client'

import { cn } from '@/lib/utils'

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (next: boolean) => void
  label: string
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative h-8 w-14 shrink-0 rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
        checked
          ? 'border-transparent bg-primary shadow-[0_0_18px_rgba(34,211,238,0.45)]'
          : 'border-border bg-secondary',
      )}
    >
      <span
        className={cn(
          'absolute top-1/2 size-6 -translate-y-1/2 rounded-full bg-white shadow transition-all',
          checked ? 'left-[calc(100%-1.75rem)]' : 'left-1',
        )}
      />
    </button>
  )
}
