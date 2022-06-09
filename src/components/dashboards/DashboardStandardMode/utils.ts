import * as dashboardApi from "src/utils/api/dashboard";

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
    ...dashboard
  };
}

export async function updateDashboardRequest(id, dashboardParams) {
  const dashboardResponse = await dashboardApi.patch(dashboardParams);
  const dashboard = dashboardResponse.results;

  return {
    ...dashboard
  };
}
