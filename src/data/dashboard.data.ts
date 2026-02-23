import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faCheckCircle,
  faClock,
  faFire,
} from "@fortawesome/free-solid-svg-icons";

export type Stat = {
  title: string;
  value: string;
  icon: IconDefinition;
};

export const DASHBOARD_STATS: Stat[] = [
  { title: "Habits", value: "4", icon: faCheckCircle },
  { title: "Focus Time", value: "2h 30m", icon: faClock },
  { title: "Streak", value: "12 days", icon: faFire },
];
