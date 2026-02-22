import type { Habit } from "../types/habit.types"
import { DEMO_HABITS } from "../data/habit.data"

const STORAGE_KEY = "momentum.habits"

export const habitService = {
  query,
  addHabit,
  removeHabit,
  saveAll,
}

function query(): Promise<Habit[]> {
  const habits = _loadFromStorage()
  return Promise.resolve(habits)
}

function addHabit(title: string, target = 1): Promise<Habit[]> {
  const habits = _loadFromStorage()

  const newHabit: Habit = {
    id: _makeId(),
    title,
    target,
    progress: 0,
    streak: 0,
  }

  const updated = [newHabit, ...habits]
  _saveToStorage(updated)
  return Promise.resolve(updated)
}

function removeHabit(habitId: string): Promise<Habit[]> {
  const habits = _loadFromStorage()
  const updated = habits.filter(h => h.id !== habitId)
  _saveToStorage(updated)
  return Promise.resolve(updated)
}

function saveAll(habits: Habit[]): Promise<Habit[]> {
  _saveToStorage(habits)
  return Promise.resolve(habits)
}

function _loadFromStorage(): Habit[] {
  const json = localStorage.getItem(STORAGE_KEY)
  if (json) return JSON.parse(json)

  _saveToStorage(DEMO_HABITS)
  return DEMO_HABITS
}

function _saveToStorage(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits))
}

function _makeId(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let id = ""
  for (let i = 0; i < length; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return id
}