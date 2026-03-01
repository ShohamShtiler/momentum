import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faCheck } from "@fortawesome/free-solid-svg-icons";
import type { HabitUnit } from "../types/habit.types";

type Props = {
  unit: HabitUnit;
  onClose: () => void;
  onSubmit: (amount: number) => void;
};

export function NumberPadModal({ unit, onClose, onSubmit }: Props) {
  const [val, setVal] = useState("");

  function onPress(ch: string) {
    setVal((prev) => {
      if (ch === "." && prev.includes(".")) return prev;
      const next = (prev + ch).replace(/^0+(?=\d)/, "");
      return next;
    });
  }

  function onBackspace() {
    setVal((prev) => prev.slice(0, -1));
  }

  function onClear() {
    setVal("");
  }

  function onOk() {
    const amount = Number(val);
    if (!Number.isFinite(amount) || amount <= 0) return;
    onSubmit(amount);
  }

  return (
    <div className="np-backdrop" onClick={onClose}>
      <div className="np-modal" onClick={(e) => e.stopPropagation()}>
        <div className="np-header">
          <div className="np-value">
            <span className="np-number">{val || "0"}</span>
            <span className="np-unit">{unit}</span>
          </div>
        </div>

        <div className="np-grid">
          {/* Row 1 */}{" "}
          <button className="np-key" onClick={() => onPress("1")}>
            1
          </button>
          <button className="np-key" onClick={() => onPress("2")}>
            2
          </button>
          <button className="np-key" onClick={() => onPress("3")}>
            3
          </button>
          <button className="np-key np-action" onClick={onClear}>
            AC
          </button>
          {/* Row 2 */}
          <button className="np-key" onClick={() => onPress("4")}>
            4
          </button>
          <button className="np-key" onClick={() => onPress("5")}>
            5
          </button>
          <button className="np-key" onClick={() => onPress("6")}>
            6
          </button>
          <button
            className="np-key np-action"
            onClick={onBackspace}
            aria-label="Delete"
          >
            <FontAwesomeIcon icon={faDeleteLeft} />
          </button>
          {/* Row 3 */}
          <button className="np-key" onClick={() => onPress("7")}>
            7
          </button>
          <button className="np-key" onClick={() => onPress("8")}>
            8
          </button>
          <button className="np-key" onClick={() => onPress("9")}>
            9
          </button>
          <button className="np-key np-ok" onClick={onOk} aria-label="Confirm">
            <FontAwesomeIcon icon={faCheck} />
          </button>
          {/* Row 4 */}
          <button className="np-key np-ghost" onClick={() => onPress("0")}>
            0
          </button>
          <button className="np-key np-ghost" onClick={() => onPress(".")}>
            .
          </button>
        </div>

        {/* <div className="np-footer">
          <button className="ghost-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="primary-btn" onClick={onOk}>
            Add
          </button>
        </div> */}
      </div>
    </div>
  );
}
