export type HabitUnit = "count" | "ml" | "min"

export type Habit = {
  id: string
  title: string
  target: number
  progress: number
  unit: HabitUnit
  streak: number
}