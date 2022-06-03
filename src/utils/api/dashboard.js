import { DASHBOARD_RESPONSE } from "./constants";

const API_DELAY = 100;

export function get(id) {
  return new Promise((resolve) =>
    setTimeout(() => resolve(DASHBOARD_RESPONSE), API_DELAY)
  );
}

export function patch(someDashboardParams) {
  return new Promise((resolve) =>
    setTimeout(() => {
      Object.keys(someDashboardParams).forEach((key) => {
        DASHBOARD_RESPONSE.results[key] = someDashboardParams[key];
      });
      return resolve(DASHBOARD_RESPONSE);
    }, API_DELAY)
  );
}
