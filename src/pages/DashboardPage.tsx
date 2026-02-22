import { StatCard } from "../cmps/StatCard";
import { DASHBOARD_STATS } from "../data/dashboard.data";

import { useEffect, useState } from "react";
import { habitService } from "../services/habit.service";
import type { Habit } from "../types/habit.types";

type DashboardPageProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function DashboardPage({ isDark, onToggleTheme }: DashboardPageProps) {
  const stats = DASHBOARD_STATS;

  const todayIndex = new Date().getDay();

  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    habitService.query().then(setHabits);
  }, []);

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
            <button
              className="icon-btn"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {isDark ? "☀️" : "🌙"}
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
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
            />
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
            {habits.map((habit) => (
              <li key={habit.id} className="habit-item">
                <span className="dot" />
                <span className="habit-name">{habit.title}</span>
                <span className="habit-meta">
                  {habit.progress}/{habit.target}
                </span>
              </li>
            ))}
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

        <section className="card progress-card">
          <div className="card-header">
            <h3>Weekly Progress</h3>
            <button className="ghost-btn">This week</button>
          </div>

          <div className="progress-bars">
            {[
              { day: "Sun", val: 70 },
              { day: "Mon", val: 40 },
              { day: "Tue", val: 65 },
              { day: "Wed", val: 30 },
              { day: "Thu", val: 80 },
              { day: "Fri", val: 55 },
              { day: "Sat", val: 20 },
            ].map(({ day, val }, index) => (
              <div
                key={day}
                className={`bar-col ${index === todayIndex ? "is-active" : ""}`}
              >
                <div className="bar">
                  <div className="bar-fill" style={{ height: `${val}%` }} />
                </div>
                <div className="bar-label">{day}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
}
