const BOOKMARKS = [
  {
    id: 101,
    title: `Report 101`,
    params: {
      metric: 101
    }
  },
  {
    id: 102,
    title: `Report 102`,
    params: {
      metric: 102
    }
  }
];

const TEXT_CARDS = [
  {
    id: 301,
    markdown: `<p>This is a text card</p>`
  }
];

const LAYOUT = {
  rows: {
    DYF1SRjy: {
      cards: [
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
      cards: [
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

const DASHBOARD_CARDS = [
  {
    id: 201,
    title: `Link to Report 102`,
    bookmark: {
      id: 102,
      params: {
        metric: 85
      }
    }
  }
];

export const DASHBOARD_RESPONSE = {
  status: `ok`,
  results: {
    id: 1212,
    title: `Most Important Dashboard`,
    layout: LAYOUT,
    text_cards: TEXT_CARDS,
    dashboard_cards: DASHBOARD_CARDS,
    bookmarks: BOOKMARKS,
    is_favorited: false,
    filters: null
  }
};
