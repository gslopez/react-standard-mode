export type GridCellType = {
  id: string;
  width: number;
  content_id: number;
  content_type: string;
};

export type GridRowType = {
  id?: string;
  cells: GridCellType[];
  height: number;
};

export type DashboardLayout = {
  rows: {
    [rowId: string]: GridRowType;
  };
  order: string[];
  version: string;
};

export type TextContent = {
  id: number;
  markdown: string;
};

export type ReportContent = {
  id: number;
  title?: string;
  params: { metric: number };
};

export type ReportLinkContent = {
  id: number;
  title: string;
  bookmark: ReportContent;
};

export type Content = TextContent | ReportContent | ReportLinkContent;

export type DashboardResponse = {
  id: number;
  title: string;
  layout: DashboardLayout;
  contents: {
    text?: { [id: number]: TextContent };
    report?: { [id: number]: ReportContent };
    "report-link"?: { [id: number]: ReportLinkContent };
  };
  is_favorited: boolean;
  filters: any;
};
