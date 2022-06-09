import React, { useState, useEffect } from "react";

import { Button } from "src/components/common/Button";
import { ContentAdder } from "src/components/dashboards/ContentAdder";
import { Header } from "src/components/common/Header";

import "./styles.css";

import { Card } from "src/components/dashboards/Card";
import { GridLayout } from "src/components/common/GridLayout";
import {
  getDashboardRequest,
  updateDashboardRequest
} from "src/components/dashboards/DashboardStandardMode/utils";
import { DashboardResponse, GridRowType } from "../types";

const getRowsWithoutContent = (
  rows: { [rowId: string]: GridRowType },
  contentType,
  contentId
) => {
  const newRows = { ...rows };
  console.log(Object.entries(rows));
  Object.entries(rows).forEach(([rowId, row]) => {
    rowId = `${rowId}`;
    newRows[rowId] = { ...row };
    newRows[rowId].cells = row.cells.filter((cell) => {
      return !(
        cell.content_type === contentType &&
        `${cell.content_id}` === `${contentId}`
      );
    });
    console.log(`${row.cells.length} === ${newRows[rowId].cells.length}`);
  });
  return newRows;
};

export function DashboardStandardMode() {
  // in the real version, we would read this from the URL
  const [dashboardIdFromURL] = useState(1212);

  const [dashboard, setDashboard] = useState<DashboardResponse>({
    id: 0,
    title: `Default title`,
    layout: { order: [], rows: {}, version: `` },
    contents: {},
    filters: null,
    is_favorited: false
  });

  useEffect(() => {
    async function fetchDashboard() {
      const dashboard = await getDashboardRequest(dashboardIdFromURL);
      setDashboard(dashboard);
    }
    fetchDashboard();
  }, [dashboardIdFromURL]);

  const updateDashboard = async (dashboardParams) => {
    const updatedDashboard = await updateDashboardRequest(
      dashboardIdFromURL,
      dashboardParams
    );
    setDashboard({ ...updatedDashboard });
  };

  const slots: { [cellId: string]: JSX.Element } = {};

  Object.entries(dashboard.layout.rows).forEach(([rowId, row]) => {
    row.cells.forEach(
      ({ content_id: contentId, content_type: contentType }, cellIdx) => {
        const content = dashboard.contents[contentType][contentId];
        slots[`${contentType}-${contentId}`] = (
          <Card
            contentType={contentType}
            content={content}
            on={{
              onContentUpdated: (updatedContent) => {
                updateDashboard({
                  contents: {
                    ...dashboard.contents,
                    [contentType]: {
                      ...dashboard.contents[contentType],
                      [updatedContent.id]: updatedContent
                    }
                  }
                });
              },
              onCardDeleted: () => {
                // we shouldn't update the dashboard without calling to .update
                delete dashboard.contents[contentType][contentId];
                dashboard.layout.rows[rowId].cells.splice(cellIdx, 1);
                updateDashboard({});

                // updateDashboard({
                //   layout: {
                //     ...dashboard.layout,
                //     rows: getRowsWithoutContent(
                //       dashboard.layout.rows,
                //       contentType,
                //       contentId
                //     )
                //   }
                // });
              }
            }}
          />
        );
      }
    );
  });

  // Object.entries(dashboard.contents).forEach(([contentType, contentsMap]) => {
  //   Object.entries(contentsMap).forEach(([contentId, content]) => {
  //     slots[`${contentType}-${contentId}`] = <></>;
  //   });
  // });

  return (
    <div className="DashboardStandardMode">
      <Header title={dashboard.title}>
        <Button
          label={dashboard.filters ? `${dashboard.filters} filters` : `Filter`}
          icon={`🔽`}
          onClick={async () => {
            await updateDashboard({
              filters: dashboard.filters ? dashboard.filters + 1 : 1
            });
          }}
        />
        {/* <Button label={`Share`} /> */}
        <Button
          icon={dashboard.is_favorited ? `❤️` : `♡`}
          onClick={async () => {
            await updateDashboard({
              is_favorited: !dashboard.is_favorited
            });
          }}
        />
      </Header>

      <GridLayout
        footer={<ContentAdder />}
        layout={dashboard.layout}
        addActionEl={<ContentAdder onContentAdded={null} />}
        onLayoutUpdated={({ layout: newLayout }) => {
          updateDashboard({
            layout: newLayout
          });
        }}
        // these ones are contents!
        slots={slots}
      >
        {/* in panel: */}
        {/* <div slot=`text-101`>...</div> */}
        {/* <div slot=`report-202`>...</div> */}
      </GridLayout>
    </div>
  );
}
