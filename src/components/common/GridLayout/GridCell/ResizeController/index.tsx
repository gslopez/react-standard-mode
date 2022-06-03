import React from "react";

import "./styles.css";

export function ResizeController({
  onRightClicked,
  onLeftClicked
}: {
  onRightClicked;
  onLeftClicked;
}) {
  return (
    <div className={`ResizeController`} onClick={() => onRightClicked?.()} />
  );
}
