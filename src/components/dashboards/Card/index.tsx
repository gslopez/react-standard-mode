import React from "react";
import { Header } from "src/components/common/Header";
import { Select } from "src/components/common/Select";

import "./styles.css";
import {
  ReportOptions,
  Report,
  getReportCardTitle
} from "src/components/dashboards/Content/Report";
import {
  ReportLinkOptions,
  ReportLink,
  getReportLinkCardTitle
} from "src/components/dashboards/Content/ReportLink";
import {
  TextOptions,
  Text,
  getTextCardTitle
} from "src/components/dashboards/Content/Text";
import {
  EmojiOptions,
  Emoji,
  getEmojiCardTitle
} from "src/components/dashboards/Content/Emoji";

function getContentRenderers({ content_type }) {
  // Inheritance is better here
  if (content_type === `report`) {
    return {
      ContentOptions: ReportOptions,
      Content: Report,
      getCardTitle: getReportCardTitle
    };
  } else if (content_type === `report-link`) {
    return {
      ContentOptions: ReportLinkOptions,
      Content: ReportLink,
      getCardTitle: getReportLinkCardTitle
    };
  } else if (content_type === `text`) {
    return {
      ContentOptions: TextOptions,
      Content: Text,
      getCardTitle: getTextCardTitle
    };
  } else if (content_type === `emoji`) {
    return {
      ContentOptions: EmojiOptions,
      Content: Emoji,
      getCardTitle: getEmojiCardTitle
    };
  }
  throw new Error(`Error ##2 ${content_type} doesn't exist`);
}

export function Card({ card, on }: { card: any; on }) {
  const { ContentOptions, Content, getCardTitle } = getContentRenderers({
    content_type: card.content_type
  });
  return (
    <div className={`DashboardCell cell-${card.id}`}>
      <Header title={`${getCardTitle(card.content)}`}>
        <Select icon="☰">
          <ContentOptions content={card.content} on={on} />
        </Select>
      </Header>
      <div className="content">
        <Content content={card.content} on={on} />
      </div>
    </div>
  );
}
