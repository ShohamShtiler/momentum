type StatCardProps = {
  title: string
  value: string
}

export function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="title">{title}</div>
      <div className="value">{value}</div>
    </div>
  )
}