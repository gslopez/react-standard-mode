import React from "react";
import { GridRow } from "src/components/common/GridLayout/GridRow";
import { GridCell } from "src/components/common/GridLayout/GridCell";
import "./styles.css";
import { DashboardLayout, GridRowType } from "src/components/dashboards/types";

const getOrderedRows = (layout: DashboardLayout) => {
  const orderedRows: GridRowType[] = [];
  layout?.order.forEach((rowId) => {
    orderedRows.push({ id: rowId, ...layout.rows[rowId] });
  });
  return orderedRows;
};

export function GridLayout({
  layout,
  addActionEl,
  footer,
  onLayoutUpdated,
  slots
}: {
  layout;
  addActionEl;
  footer: JSX.Element;
  onLayoutUpdated: ({ layout }: { layout: DashboardLayout }) => void;
  slots: { [cellId: string]: JSX.Element };
}) {
  const orderedRows = getOrderedRows(layout);
  return (
    <div className="GridLayout">
      <div className="grid-rows">
        {orderedRows.map((row) => (
          <GridRow
            key={`card-${row.id}`}
            id={`${row.id}`}
            height={row.height}
            addAction={addActionEl}
          >
            {row.cells.map((cell, idx) => (
              <GridCell
                key={`cell-${row.id}-${idx}`}
                width={cell.width}
                onCellUpdated={({ width: newWidth }: { width: number }) => {
                  const updatedCells = [...row.cells];
                  const delta = newWidth - updatedCells[idx].width;
                  updatedCells[idx] = {
                    ...updatedCells[idx],
                    width: newWidth
                  };
                  updatedCells[idx + 1] = {
                    ...updatedCells[idx + 1],
                    width: updatedCells[idx + 1].width - delta
                  };
                  onLayoutUpdated({
                    layout: {
                      ...layout,
                      rows: {
                        ...layout.rows,
                        [`${row.id}`]: {
                          ...layout.rows[`${row.id}`],
                          cells: updatedCells
                        }
                      }
                    }
                  });
                }}
              >
                {/* <slot name=`${cell.content_type}-${cell.content_id}`/>*/}
                {slots[`${cell.content_type}-${cell.content_id}`]}
              </GridCell>
            ))}
          </GridRow>
        ))}
      </div>
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
