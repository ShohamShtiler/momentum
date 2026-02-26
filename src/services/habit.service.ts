import type { Habit, HabitUnit, HabitColor } from "../types/habit.types";
import { DEMO_HABITS } from "../data/habit.data";

const STORAGE_KEY = "momentum.habits";

export const habitService = {
  query,
  addHabit,
  removeHabit,
  saveAll,
  updateProgress,
  updateColor,
};

function query(): Promise<Habit[]> {
  const habits = _loadFromStorage(); // already normalized
  return Promise.resolve(habits);
}

function addHabit(
  title: string,
  target = 1,
  unit: HabitUnit = "count",
): Promise<Habit[]> {
  const habits = _loadFromStorage();
  const today = _getDateKey();

  const newHabit: Habit = {
    id: _makeId(),
    title,
    target,
    progress: 0,
    unit,
    streak: 0,
    history: { [today]: 0 },
    lastUpdated: today,
  };

  const updated = [newHabit, ...habits];
  _saveToStorage(updated);
  return Promise.resolve(updated);
}

function removeHabit(habitId: string): Promise<Habit[]> {
  const habits = _loadFromStorage();
  const updated = habits.filter((h) => h.id !== habitId);
  _saveToStorage(updated);
  return Promise.resolve(updated);
}

// ✅ keypad sends amount to ADD (delta)
function updateProgress(habitId: string, delta: number): Promise<Habit[]> {
  const today = _getDateKey();
  const habits = _loadFromStorage();

  const updated = habits.map((h) => {
    if (h.id !== habitId) return h;

    const history = h.history ? { ...h.history } : { [today]: h.progress || 0 };
    const curr = history[today] ?? 0;

    const nextProgress = Math.max(0, Math.min(h.target, curr + delta));
    history[today] = nextProgress;

    return {
      ...h,
      history,
      progress: nextProgress,
      lastUpdated: today,
    };
  });

  _saveToStorage(updated);
  return Promise.resolve(updated);
}

function updateColor(habitId: string, color?: HabitColor): Promise<Habit[]> {
  const habits = _loadFromStorage();

  const updated = habits.map((h) => (h.id === habitId ? { ...h, color } : h));

  _saveToStorage(updated);
  return Promise.resolve(updated);
}

function saveAll(habits: Habit[]): Promise<Habit[]> {
  const normalized = habits.map(_ensureHabitForToday);
  _saveToStorage(normalized);
  return Promise.resolve(normalized);
}

function _loadFromStorage(): Habit[] {
  const json = localStorage.getItem(STORAGE_KEY);
  const rawHabits: Habit[] = json ? JSON.parse(json) : DEMO_HABITS;

  const normalized = rawHabits.map(_ensureHabitForToday);

  // If storage was empty OR migration changed something → persist normalized
  _saveToStorage(normalized);

  return normalized;
}

function _saveToStorage(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

function _getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

function _ensureHabitForToday(habit: Habit): Habit {
  const today = _getDateKey();

  const history = habit.history ? { ...habit.history } : {};

  // Migration: old habits had only "progress"
  if (!habit.history) {
    history[today] = habit.progress || 0;
  }

  // Daily reset: if not updated today, today progress should be 0 (unless exists)
  if (habit.lastUpdated !== today) {
    if (history[today] == null) history[today] = 0;
  }

  const todayProgress = history[today] ?? 0;

  return {
    ...habit,
    history,
    progress: todayProgress,
    lastUpdated: today,
  };
}

function _makeId(length = 6) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}