import React from "react";
import { Button } from "src/components/common/Button";
import { Report } from "../Report";
import "./styles.css";

export function getReportLinkCardTitle(content) {
  return content.title;
}

export function ReportLink({ content }: { content: any }) {
  return (
    <div className="ReportLink">
      <Report content={content.bookmark} icon="👀" />
    </div>
  );
}

export function ReportLinkOptions({ content }) {
  return (
    <>
      <Button
        icon="❌"
        label="Delete"
        onClick={() => {
          console.log("card deleted");
        }}
      />
      <Button
        icon="🎨"
        label="Change color"
        onClick={() => {
          console.log("card deleted");
        }}
      />
    </>
  );
}
