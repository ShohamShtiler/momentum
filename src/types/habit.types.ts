export type HabitUnit = "count" | "ml" | "min";
export type HabitColor =
  | "mint"
  | "butter"
  | "sky"
  | "salmon"
  | "lavender"
  | "peach"
  | "aqua"
  | "lemon"
  | "rose"
  | "ice";

export type HabitHistory = Record<string, number>;

export type Habit = {
  id: string;
  title: string;
  target: number;
  progress: number;
  unit: HabitUnit;
  streak: number;
  color?: HabitColor;
  history?: HabitHistory;
  lastUpdated?: string;
};
