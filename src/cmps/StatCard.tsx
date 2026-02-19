type StatCardProps = {
  title: string
  value: string
  icon: string
}

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="icon">{icon}</span>
        <div className="title">{title}</div>
      </div>

      <div className="value">{value}</div>
    </div>
  )
}