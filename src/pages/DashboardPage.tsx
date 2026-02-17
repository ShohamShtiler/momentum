export function DashboardPage() {
  return (
    <section className="dashboard">
      <div className="header">
        <h1>Welcome back</h1>
        <p>Let’s build momentum today 👋</p>
      </div>

      <div className="stats">
        <div className="stat-card">Habits: 4</div>
        <div className="stat-card">Focus: 2h 30m</div>
        <div className="stat-card">Streak: 12 days</div>
      </div>
    </section>
  )
}