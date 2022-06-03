import React from "react";
import "./styles.css";

export function Button({
  icon,
  label,
  onClick
}: {
  icon?: string;
  label?: string;
  onClick?: any;
}) {
  return (
    <div className="Button">
      <button onClick={onClick}>
        {icon && <p className={`icon`}>{icon}</p>}
        {label && <p className={`label`}>{label}</p>}
      </button>
    </div>
  );
}
