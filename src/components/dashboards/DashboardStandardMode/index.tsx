import React, { useState, useEffect } from "react";

import { Button } from "src/components/common/Button";
import { ContentAdder } from "src/components/dashboards/ContentAdder";
import { Header } from "src/components/common/Header";

import "./styles.css";
import { GridRow } from "src/components/common/GridLayout/GridRow";
import { GridCell } from "src/components/common/GridLayout/GridCell";
import { Card } from "src/components/dashboards/Card";
import { GridLayout } from "src/components/common/GridLayout";
import {
  getDashboardRequest,
  updateDashboardRequest,
  getContentKey
} from "src/components/dashboards/DashboardStandardMode/utils";

export function DashboardStandardMode() {
  // in the real version, we would read this from the URL
  const [dashboardIdFromURL] = useState(1212);

  const [dashboard, setDashboard] = useState({
    title: `Default title`,
    layout: { order: [], rows: {} },
    filters: null,
    is_favorited: false,
    rows: []
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

      <GridLayout footer={<ContentAdder />}>
        {dashboard.rows.map(({ id: rowId, height, cards }) => (
          <GridRow
            key={`card-${rowId}`}
            id={rowId}
            height={height}
            addAction={<ContentAdder onContentAdded={null} />}
          >
            {cards.map((card, idx) => (
              <GridCell
                key={`card-${rowId}-${idx}`}
                width={card.width}
                onCellUpdated={(cellUpdates) => {
                  const updatedCards = [...dashboard.layout.rows[rowId].cards];
                  const delta = cellUpdates.width - updatedCards[idx].width;
                  updatedCards[idx] = {
                    ...updatedCards[idx],
                    width: cellUpdates.width
                  };
                  updatedCards[idx + 1] = {
                    ...updatedCards[idx + 1],
                    width: updatedCards[idx + 1].width - delta
                  };

                  updateDashboard({
                    layout: {
                      ...dashboard.layout,
                      rows: {
                        ...dashboard.layout.rows,
                        [rowId]: {
                          ...dashboard.layout.rows[rowId],
                          cards: updatedCards
                        }
                      }
                    }
                  });
                }}
              >
                <Card
                  card={card}
                  on={{
                    onContentUpdated: (updatedContent) => {
                      const contentKey = getContentKey({
                        content_type: card.content_type
                      });
                      updateDashboard({
                        [contentKey]: dashboard[contentKey].map((content) =>
                          content.id === updatedContent.id
                            ? updatedContent
                            : content
                        )
                      });
                    },
                    onCardDeleted: () => {
                      const contentKey = getContentKey({
                        content_type: card.content_type
                      });
                      updateDashboard({
                        [contentKey]: dashboard[contentKey].filter(
                          (content) => content.id !== card.content_id
                        ),
                        layout: {
                          ...dashboard.layout,
                          rows: {
                            ...dashboard.layout.rows,
                            [rowId]: {
                              ...dashboard.layout.rows[rowId],
                              cards: dashboard.layout.rows[rowId].cards.filter(
                                (c) => c.id !== card.id
                              )
                            }
                          }
                        }
                      });
                    }
                  }}
                />
              </GridCell>
            ))}
          </GridRow>
        ))}
      </GridLayout>
    </div>
  );
}
