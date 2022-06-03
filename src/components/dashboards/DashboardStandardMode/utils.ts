import * as dashboardApi from "src/utils/api/dashboard";

function toContentHash(contentArray) {
  if (!contentArray) {
    return {};
  }
  return Object.fromEntries(
    contentArray.map((content) => [content.id, content])
  );
}

function getParsedRows(dashboard) {
  if (!dashboard.layout) {
    return [];
  }

  const { rows, order } = dashboard.layout;
  const contentsHash = {
    text: toContentHash(dashboard.text_cards),
    report: toContentHash(dashboard.bookmarks),
    "report-link": toContentHash(dashboard.dashboard_cards),
    emoji: toContentHash(dashboard.emojis)
  };
  const orderedRows = order.map((rowId) => {
    const { cards, ...row } = rows[rowId];
    cards.forEach((card) => {
      card.content = contentsHash[card.content_type][card.content_id];
    });
    return { id: rowId, cards, ...row };
  });
  return orderedRows;
}

export function getContentKey({ content_type }) {
  if (content_type === `text`) {
    return `text_cards`;
  } else if (content_type === `report`) {
    return `bookmarks`;
  } else if (content_type === `report-link`) {
    return `dashboard-cards`;
  } else if (content_type === `emoji`) {
    return `emojis`;
  }
  throw new Error("Error ##3 no valid content type");
}

export async function getDashboardRequest(id) {
  const dashboardResponse = await dashboardApi.get(id);
  const dashboard = dashboardResponse.results;
  console.log(dashboard);

  return {
    ...dashboard,
    rows: getParsedRows(dashboard)
  };
}

export async function updateDashboardRequest(id, dashboardParams) {
  const dashboardResponse = await dashboardApi.patch(dashboardParams);
  const dashboard = dashboardResponse.results;

  return {
    ...dashboard,
    rows: getParsedRows(dashboard)
  };
}
