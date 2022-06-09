import { DashboardResponse } from "src/components/dashboards/types";

const BOOKMARKS = {
  101: {
    id: 101,
    title: `Report 101`,
    params: {
      metric: 101
    }
  },
  102: {
    id: 102,
    title: `Report 102`,
    params: {
      metric: 102
    }
  }
};

const TEXT_CARDS = {
  301: {
    id: 301,
    markdown: `<p>This is a text card</p>`
  }
};

const DASHBOARD_CARDS = {
  201: {
    id: 201,
    title: `Link to Report 102`,
    bookmark: {
      id: 102,
      params: {
        metric: 85
      }
    }
  }
};

const LAYOUT = {
  rows: {
    DYF1SRjy: {
      cells: [
        {
          id: `PXoTG74V`,
          width: 12,
          content_id: 201,
          content_type: `report-link`
        }
      ],
      height: 336
    },
    v8KBmhCz: {
      cells: [
        {
          id: `3CPzPW8G`,
          width: 4,
          content_id: 101,
          content_type: `report`
        },
        {
          id: `PNY6w44i`,
          width: 4,
          content_id: 301,
          content_type: `text`
        },
        {
          id: `1Noq4Yym`,
          width: 4,
          content_id: 102,
          content_type: `report`
        }
      ],
      height: 400
    }
  },
  order: [`v8KBmhCz`, `DYF1SRjy`],
  version: `2.0.0`
};

export const DASHBOARD_RESPONSE: {
  status: string;
  results: DashboardResponse;
} = {
  status: `ok`,
  results: {
    id: 1212,
    title: `Most Important Dashboard`,
    layout: LAYOUT,
    contents: {
      text: TEXT_CARDS,
      report: BOOKMARKS,
      "report-link": DASHBOARD_CARDS
    },
    is_favorited: false,
    filters: null
  }
};
