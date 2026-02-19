export type Stat = {
  title: string
  value: string
  icon: string
}

export const DASHBOARD_STATS: Stat[] = [
  { title: "Habits", value: "4", icon: "✅" },
  { title: "Focus Time", value: "2h 30m", icon: "⏱️" },
  { title: "Streak", value: "12 days", icon: "🔥" },
]