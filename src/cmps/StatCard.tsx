import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCheckCircle, faFire } from "@fortawesome/free-solid-svg-icons";

type StatCardProps = {
  title: string;
  value: string;
  icon: IconDefinition;
};

export function StatCard({ title, value, icon }: StatCardProps) {
  const iconClass =
    icon === faCheckCircle
      ? "icon-green"
      : icon === faFire
        ? "icon-fire"
        : "icon-default";

  return (
    <div className="stat-card">
      <div className="stat-top">
        <FontAwesomeIcon icon={icon} className={`stat-icon ${iconClass}`} />
        <span className="stat-title">{title}</span>
      </div>

      <div className="stat-value">{value}</div>
    </div>
  );
}
