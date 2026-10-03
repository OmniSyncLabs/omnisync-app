import { Moon, Sun, Sunrise, Waves, type LucideIcon } from 'lucide-react'

export type Chronotype = 'lion' | 'bear' | 'wolf' | 'dolphin'
export type Plan = 'basic' | 'pro' | 'plus'

export type Profile = {
  name: string
  email: string
  provider: 'google' | 'email'
  age: number
  gender: string
  chronotype: Chronotype
  habits: string[]
}

export const CHRONOTYPES: Record<
  Chronotype,
  { label: string; description: string; peak: string; icon: LucideIcon }
> = {
  lion: {
    label: 'Lion',
    description: 'Up early, sharpest before lunch',
    peak: '08:00 – 11:00',
    icon: Sunrise,
  },
  bear: {
    label: 'Bear',
    description: 'Follows the sun, steady midday energy',
    peak: '10:00 – 14:00',
    icon: Sun,
  },
  wolf: {
    label: 'Wolf',
    description: 'Slow mornings, creative evenings',
    peak: '17:00 – 21:00',
    icon: Moon,
  },
  dolphin: {
    label: 'Dolphin',
    description: 'Light sleeper, bursts of focus',
    peak: '15:00 – 21:00',
    icon: Waves,
  },
}

export const HABITS = [
  'Morning coffee',
  'Afternoon caffeine',
  'Daily exercise',
  'Late-night screens',
  'Power naps',
  'Meditation',
  'Irregular sleep',
  'Evening alcohol',
]

export const GENDERS = ['Female', 'Male', 'Non-binary', 'Prefer not to say']

export const PLAN_PRICES = { pro: 5, plus: 8 } as const

export function initialsOf(name: string) {
  return name.trim().charAt(0).toUpperCase() || 'U'
}
