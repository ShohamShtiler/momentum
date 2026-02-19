import { StatCard } from "../cmps/StatCard";
import { useState } from "react";

type Stat = {
  title: string;
  value: string;
};

export function DashboardPage() {
  const [stats] = useState<Stat[]>([
    { title: "Habits", value: "4" },
    { title: "Focus Time", value: "2h 30m" },
    { title: "Streak", value: "12 days" },
  ]);
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
          {stats.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} />
          ))}
        </div>

        <div className="hero">
          <div className="hero-content">
            <div className="hero-text">
              <h2>Stay in the zone 🔥</h2>
              <p>You’ve focused 2h 30m today</p>
              <span className="goal">Goal: 3h</span>
            </div>

            <button className="hero-btn">Start Session</button>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <section className="card habits-card">
          <div className="card-header">
            <h3>Today’s Habits</h3>
            <button className="ghost-btn">View all</button>
          </div>

          <ul className="habit-list">
            <li className="habit-item">
              <span className="dot" />
              <span className="habit-name">Drink water</span>
              <span className="habit-meta">6/8</span>
            </li>

            <li className="habit-item">
              <span className="dot" />
              <span className="habit-name">Walk</span>
              <span className="habit-meta">20m</span>
            </li>

            <li className="habit-item">
              <span className="dot" />
              <span className="habit-name">Read</span>
              <span className="habit-meta">10m</span>
            </li>
          </ul>
        </section>

        <section className="card schedule-card">
          <div className="card-header">
            <h3>Upcoming</h3>
            <button className="ghost-btn">+</button>
          </div>

          <div className="schedule-list">
            <div className="schedule-item">
              <div className="time">09:00</div>
              <div className="txt">Deep work session</div>
            </div>
            <div className="schedule-item">
              <div className="time">13:30</div>
              <div className="txt">Walk + reset</div>
            </div>
            <div className="schedule-item">
              <div className="time">20:30</div>
              <div className="txt">Plan tomorrow</div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
