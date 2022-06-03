import React from "react";
import { ResizeController } from "src/components/common/GridLayout/GridCell/ResizeController";

import "./styles.css";

export function GridCell({
  width,
  children,
  onCellUpdated
}: {
  width: number;
  children: React.ReactChild;
  onCellUpdated?;
}) {
  return (
    <div className="GridCell" style={{ width: `calc(100% / 12 * ${width})` }}>
      {children}
      <ResizeController
        onLeftClicked={() => {
          onCellUpdated?.({ width: width - 1 });
        }}
        onRightClicked={() => {
          onCellUpdated?.({ width: width + 1 });
        }}
      />
    </div>
  );
}
