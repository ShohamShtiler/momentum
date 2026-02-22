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
  // const [newHabitTitle, setNewHabitTitle] = useState("");

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftTarget, setDraftTarget] = useState<number>(1);
  const [draftUnit, setDraftUnit] = useState<"count" | "ml" | "min">("count");
  const [isUnitOpen, setIsUnitOpen] = useState(false);

  useEffect(() => {
    habitService.query().then(setHabits);
  }, []);

  // function onAddHabit() {
  //   const title = newHabitTitle.trim();
  //   if (!title) return;

  //   habitService.addHabit(title, 1, "count").then((updatedHabits) => {
  //     setHabits(updatedHabits);
  //     setNewHabitTitle("");
  //   });
  // }

  function onRemoveHabit(id: string) {
    habitService.removeHabit(id).then((updated) => {
      setHabits(updated);
    });
  }

  function onOpenAddHabit() {
    setIsAddOpen(true);
  }

  function onCloseAddHabit() {
    setIsAddOpen(false);
    setDraftTitle("");
    setDraftTarget(1);
    setDraftUnit("count");
  }

  function onSubmitAddHabit() {
    const title = draftTitle.trim();
    if (!title) return;

    habitService.addHabit(title, draftTarget, draftUnit).then((updated) => {
      setHabits(updated);
      onCloseAddHabit();
    });
  }

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      const el = ev.target as HTMLElement;

      // close popover if click outside
      if (!el.closest(".habit-actions")) {
        setIsAddOpen(false);
        setIsUnitOpen(false);
      }
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
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
            {/* <button className="ghost-btn">View all</button> */}
            <div className="habit-actions">
              <button
                className="icon-btn add-btn"
                onClick={onOpenAddHabit}
                aria-label="Add habit"
                title="Add habit"
              >
                +
              </button>

              {isAddOpen && (
                <div
                  className="add-popover"
                  role="dialog"
                  aria-label="Add habit form"
                  onClick={(ev) => ev.stopPropagation()}
                >
                  <div className="field">
                    <label>Title</label>
                    <input
                      value={draftTitle}
                      onChange={(ev) => setDraftTitle(ev.target.value)}
                      placeholder="e.g. Water"
                      autoFocus
                    />
                  </div>

                  <div className="row">
                    <div className="field">
                      <label>Target</label>
                      <input
                        type="number"
                        min={1}
                        value={draftTarget}
                        onChange={(ev) => setDraftTarget(+ev.target.value || 1)}
                      />
                    </div>

                    <div className="field">
                      <label>Unit</label>

                      <div className="unit-select">
                        <button
                          type="button"
                          className="unit-trigger"
                          onClick={() => setIsUnitOpen((prev) => !prev)}
                        >
                          {draftUnit}
                          <span className="chev">▾</span>
                        </button>

                        {isUnitOpen && (
                          <div className="unit-menu">
                            {(["count", "ml", "min"] as const).map((unit) => (
                              <button
                                key={unit}
                                type="button"
                                className={`unit-option ${draftUnit === unit ? "is-active" : ""}`}
                                onClick={() => {
                                  setDraftUnit(unit);
                                  setIsUnitOpen(false);
                                }}
                              >
                                {unit}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="popover-actions">
                    <button className="ghost-btn" onClick={onCloseAddHabit}>
                      Cancel
                    </button>
                    <button className="primary-btn" onClick={onSubmitAddHabit}>
                      Add
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <ul className="habit-list">
            {habits.map((habit) => (
              <li key={habit.id} className="habit-item">
                <span className="dot" />
                <span className="habit-name">{habit.title}</span>

                <div className="habit-right">
                  <span className="habit-progress">
                    {habit.progress}/{habit.target} {habit.unit}
                  </span>

                  <button
                    className="delete-btn"
                    onClick={() => onRemoveHabit(habit.id)}
                    aria-label="Delete habit"
                  >
                    ×
                  </button>
                </div>
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
