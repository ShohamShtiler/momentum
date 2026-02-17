import { StatCard } from "../cmps/StatCard";

export function DashboardPage() {
  return (
    <section className="dashboard">
      <div className="panel">
        <div className="topbar">
          <div className="tabs">
            <button className="tab active">Dashboard</button>
            <button className="tab">Habits</button>
            <button className="tab">Focus</button>
            <button className="tab">Calendar</button>
            <button className="tab">Reviews</button>
          </div>

          <div className="actions">
            <button className="icon-btn" aria-label="Settings">
              ⚙️
            </button>
            <button className="icon-btn" aria-label="Notifications">
              🔔
            </button>
            <div className="avatar" aria-label="Profile" />
          </div>
        </div>

        <div className="header">
          <h1>Welcome back</h1>
          <p>Let’s build momentum today 👋</p>
        </div>

        <div className="stats">
          <StatCard title="Habits" value="4" />
          <StatCard title="Focus Time" value="2h 30m" />
          <StatCard title="Streak" value="12 days" />
        </div>
      </div>
    </section>
  );
}
