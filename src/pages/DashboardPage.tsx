import { StatCard } from "../cmps/StatCard";
import { DASHBOARD_STATS } from "../data/dashboard.data";


import { useEffect, useState , } from "react";
import { habitService } from "../services/habit.service";
import type { Habit, HabitColor, HabitUnit } from "../types/habit.types";

import { NumberPadModal } from "../cmps/NumberPadModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleHalfStroke,
  faBell,
  faPlus,
  faPalette,
} from "@fortawesome/free-solid-svg-icons";
import { faUser, faTrashCan } from "@fortawesome/free-regular-svg-icons";

import Lottie from "lottie-react";
import doneLightAnim from "../assets/lottie/done-light.json";
import doneDarkAnim from "../assets/lottie/done-dark.json";


type DashboardPageProps = {
  isDark: boolean;
  onToggleTheme: () => void;
};

export function DashboardPage({ isDark, onToggleTheme }: DashboardPageProps) {
  const stats = DASHBOARD_STATS;
  const todayIndex = new Date().getDay();
  const [habits, setHabits] = useState<Habit[]>([]);

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftTarget, setDraftTarget] = useState<number>(1);
  const [draftUnit, setDraftUnit] = useState<HabitUnit>("count");
  const [isUnitOpen, setIsUnitOpen] = useState(false);

  const [activeHabitId, setActiveHabitId] = useState<string | null>(null);
  const [colorForId, setColorForId] = useState<string | null>(null);

  const doneAnim = isDark ? doneDarkAnim : doneLightAnim

  useEffect(() => {
    habitService.query().then(setHabits);
  }, []);

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

  function onSetHabitColor(habitId: string, color?: HabitColor) {
    habitService.updateColor(habitId, color).then(setHabits);
    setColorForId(null);
  }

  function onOpenPad(habitId: string) {
    setActiveHabitId(habitId);
  }

  function onClosePad() {
    setActiveHabitId(null);
  }

  function onAddAmount(amount: number) {
    if (!activeHabitId) return;
    habitService.updateProgress(activeHabitId, amount).then((updated) => {
      setHabits(updated);
      onClosePad();
    });
  }

  useEffect(() => {
    function onDocClick(ev: MouseEvent) {
      const el = ev.target as HTMLElement;

      // close popover if click outside
      const isInsideHabitsUI =
        el.closest(".habit-actions") ||
        el.closest(".habit-actions-right") ||
        el.closest(".color-menu") ||
        el.closest(".add-popover") ||
        el.closest(".unit-menu");

      if (!isInsideHabitsUI) {
        setIsAddOpen(false);
        setIsUnitOpen(false);
        setColorForId(null);
      }
    }

    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const COLORS = [
    "mint",
    "butter",
    "sky",
    "salmon",
    "lavender",
    "peach",
    "aqua",
    "lemon",
    "rose",
    "ice",
  ] as const;

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
              className={`icon-btn theme-btn ${isDark ? "is-dark" : ""}`}
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              <FontAwesomeIcon icon={faCircleHalfStroke} />
            </button>
            <button
              className="icon-btn notification-btn"
              aria-label="Notifications"
            >
              <FontAwesomeIcon icon={faBell} />
            </button>
            <div className={`avatar ${isDark ? "dark-avatar" : ""}`}>
              <FontAwesomeIcon icon={faUser} />
            </div>
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
                <FontAwesomeIcon icon={faPlus} />
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
                            {(
                              ["count", "ml", "min", "steps", "km"] as const
                            ).map((unit) => (
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
            {habits.map((habit) => {
              const pct = habit.target
                ? Math.min(100, (habit.progress / habit.target) * 100)
                : 0;

              const isCompleted = habit.progress >= habit.target;

              return (
                <li
                  key={habit.id}
                  className={`habit-row ${habit.color ? `color-${habit.color}` : ""}`}
                >
                  <div
                    className={`habit-fill ${isCompleted ? "is-full" : ""}`}
                    style={{ width: `${pct}%` }}
                  />

                  <div className="habit-left">
                    <div className="habit-title-row">
                      <div className="habit-title">{habit.title}</div>

                      {habit.streak > 0 && (
                        <div className="habit-streak">
                          🔥 {habit.streak}{" "}
                          {habit.streak === 1 ? "Day" : "Days"}
                        </div>
                      )}
                    </div>
                    <div className="habit-pill">
                      {habit.progress}/{habit.target} {habit.unit}
                    </div>
                  </div>

                  <div className="habit-actions-right">
                    <button
                      className="color-btn"
                      onClick={() =>
                        setColorForId(colorForId === habit.id ? null : habit.id)
                      }
                      aria-label="Change color"
                      title="Change color"
                    >
                      <FontAwesomeIcon icon={faPalette} />
                    </button>
                    {colorForId === habit.id && (
                      <div
                        className="color-menu"
                        role="menu"
                        aria-label="Pick a color"
                      >
                        {COLORS.map((c) => (
                          <button
                            key={c}
                            type="button"
                            className={`color-dot ${c}`}
                            onClick={() => onSetHabitColor(habit.id, c)}
                            aria-label={c}
                            title={c}
                          />
                        ))}

                        <button
                          type="button"
                          className="color-reset"
                          onClick={() => onSetHabitColor(habit.id, undefined)}
                        >
                          Default
                        </button>
                      </div>
                    )}
                    {!isCompleted ? (
                      <button
                        className="add-progress-btn"
                        onClick={() => onOpenPad(habit.id)}
                        aria-label="Add progress"
                        title="Add progress"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    ) : (

                      
                      <div className="habit-done" title="Completed today">
                        
                        <Lottie
                          animationData={doneAnim}
                          loop={false}
                          autoplay
                          style={{
                            width: "100%",
                            height: "100%",
                            transform: "scale(1.4)",
                          }}
                        />
                      </div>
                    )}
                    <button
                      className="delete-btn"
                      onClick={() => onRemoveHabit(habit.id)}
                      aria-label="Delete habit"
                      title="Delete habit"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
          {activeHabitId &&
            (() => {
              const habit = habits.find((h) => h.id === activeHabitId);
              if (!habit) return null;

              return (
                <NumberPadModal
                  unit={habit.unit}
                  onClose={onClosePad}
                  onSubmit={onAddAmount}
                />
              );
            })()}
        </section>

        <section className="card schedule-card">
          <div className="card-header">
            <h3>Upcoming</h3>
            <button className="ghost-btn">
              <FontAwesomeIcon icon={faPlus} />
            </button>
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
