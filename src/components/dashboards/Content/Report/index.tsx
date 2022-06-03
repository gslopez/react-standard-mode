import React from "react";
import { Button } from "src/components/common/Button";
import "./styles.css";

export function getReportCardTitle(content) {
  return content.title;
}

export function Report({
  content,
  icon = `📊`
}: {
  content: any;
  icon?: string;
}) {
  return (
    <div className="Report">
      <>
        {icon} {content?.params?.metric} %
      </>
    </div>
  );
}

export function ReportOptions({ content, on }) {
  return (
    <>
      <Button icon="❌" label="Delete" onClick={on?.onCardDeleted} />
      <Button
        icon="🔎"
        label="Zoom Metric"
        onClick={() => {
          on?.onContentUpdated({
            ...content,
            params: { ...content.params, metric: content.params.metric + 1 }
          });
        }}
      />
    </>
  );
}
