'use client'

import { useId, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

const ITEM_HEIGHT = 44
const VISIBLE_ITEMS = 5
const SPACER = ITEM_HEIGHT * Math.floor(VISIBLE_ITEMS / 2)

export type WheelOption<T extends string | number> = { value: T; label: string }

export function WheelPicker<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string
  options: WheelOption<T>[]
  value: T
  onChange: (value: T) => void
}) {
  const id = useId()
  const listRef = useRef<HTMLDivElement>(null)
  const settleTimer = useRef<number | undefined>(undefined)
  const selectedIndex = Math.max(
    0,
    options.findIndex((o) => o.value === value),
  )
  const [scrollTop, setScrollTop] = useState(selectedIndex * ITEM_HEIGHT)

  const clampIndex = (i: number) => Math.min(options.length - 1, Math.max(0, i))
  const centerIndex = clampIndex(Math.round(scrollTop / ITEM_HEIGHT))

  useLayoutEffect(() => {
    if (listRef.current) listRef.current.scrollTop = selectedIndex * ITEM_HEIGHT
    // Only position on mount; afterwards the user's scroll drives the value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleScroll() {
    const el = listRef.current
    if (!el) return
    const top = el.scrollTop
    setScrollTop(top)
    window.clearTimeout(settleTimer.current)
    settleTimer.current = window.setTimeout(() => {
      const next = options[clampIndex(Math.round(top / ITEM_HEIGHT))]
      if (next && next.value !== value) onChange(next.value)
    }, 110)
  }

  function scrollToIndex(i: number) {
    listRef.current?.scrollTo({ top: clampIndex(i) * ITEM_HEIGHT, behavior: 'smooth' })
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    const map: Record<string, number> = {
      ArrowUp: centerIndex - 1,
      ArrowDown: centerIndex + 1,
      Home: 0,
      End: options.length - 1,
    }
    if (e.key in map) {
      e.preventDefault()
      scrollToIndex(map[e.key])
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        className="relative overflow-hidden rounded-2xl border border-border bg-muted"
        style={{ height: ITEM_HEIGHT * VISIBLE_ITEMS }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-1/2 -translate-y-1/2 rounded-xl border border-primary/35 bg-primary/10"
          style={{ height: ITEM_HEIGHT }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-16 bg-gradient-to-b from-muted to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-muted to-transparent"
        />
        <div
          ref={listRef}
          role="listbox"
          tabIndex={0}
          aria-label={label}
          aria-activedescendant={`${id}-${centerIndex}`}
          onScroll={handleScroll}
          onKeyDown={handleKeyDown}
          className="no-scrollbar h-full snap-y snap-mandatory overflow-y-auto overscroll-contain rounded-2xl focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
        >
          <div aria-hidden style={{ height: SPACER }} />
          {options.map((option, i) => {
            const offset = (i * ITEM_HEIGHT - scrollTop) / ITEM_HEIGHT
            const distance = Math.min(Math.abs(offset), 3)
            const isCenter = i === centerIndex
            return (
              <div
                key={String(option.value)}
                id={`${id}-${i}`}
                role="option"
                aria-selected={isCenter}
                onClick={() => scrollToIndex(i)}
                className={cn(
                  'flex snap-center snap-always cursor-pointer items-center justify-center px-4 text-center transition-colors',
                  isCenter ? 'text-base font-semibold text-primary' : 'text-sm text-muted-foreground',
                )}
                style={{
                  height: ITEM_HEIGHT,
                  transform: `perspective(520px) rotateX(${Math.max(-70, Math.min(70, -offset * 22))}deg) scale(${1 - distance * 0.06})`,
                  opacity: Math.max(0.2, 1 - distance * 0.32),
                }}
              >
                <span className="truncate">{option.label}</span>
              </div>
            )
          })}
          <div aria-hidden style={{ height: SPACER }} />
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">Scroll, swipe or use arrow keys to choose</p>
    </div>
  )
}
