export type HabitUnit = "count" | "ml" | "min";
export type HabitColor =
  | "yellow"
  | "blue"
  | "red"
  | "green"
  | "purple"
  | "pink"
  | "teal"
  | "orange"
  | "indigo"
  | "cyan"
  | "lime"
  | "gray";

export type Habit = {
  id: string;
  title: string;
  target: number;
  progress: number;
  unit: HabitUnit;
  streak: number;
  color?: HabitColor;
};
