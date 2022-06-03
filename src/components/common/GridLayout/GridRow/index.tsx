import React from "react";

import { GridCell } from "src/components/common/GridLayout/GridCell";
import "./styles.css";

export function GridRow({
  id,
  height,
  children,
  addAction
}: {
  id: string;
  height: Number;
  children: React.ReactChild[];
  addAction: React.ReactChild;
}) {
  return (
    <div className={`GridRow row-${id}`} style={{ height: `${height}px` }}>
      <div className="left-actions">{addAction}</div>
      <div className="cells-container">{children}</div>
    </div>
  );
}

GridRow.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    let error;
    React.Children.forEach(prop, function (child) {
      if (child.type !== GridCell) {
        error = new Error(
          "`" + componentName + "` children should be of type `GridCell`."
        );
      }
    });
    return error;
  }
};
