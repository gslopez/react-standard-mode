import React from "react";
import { GridRow } from "src/components/common/GridLayout/GridRow";
import "./styles.css";

export function GridLayout({
  children: childrenRows,
  footer
}: {
  children: JSX.Element[];
  footer: JSX.Element;
}) {
  return (
    <div className="GridLayout">
      <div className="grid-rows">{childrenRows}</div>
      <div className="grid-footer">{footer}</div>
    </div>
  );
}

GridLayout.propTypes = {
  children: function (props, propName, componentName) {
    const prop = props[propName];

    let error;
    React.Children.forEach(prop, function (child) {
      if (child.type !== GridRow) {
        error = new Error(
          "`" + componentName + "` children should be of type `GridRow`."
        );
      }
    });
    return error;
  }
};
