import React from "react";
import { Button } from "src/components/common/Button";
import "./styles.css";

export function getTextCardTitle(content) {
  return ``;
}

export function Text({ content }: { content: any }) {
  return (
    <div className="Text">
      <textarea id="fname" name="fname" value={content?.markdown} />
    </div>
  );
}

export function TextOptions({ content }) {
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
        icon="🔪"
        label="Reset Text"
        onClick={() => {
          console.log("card deleted");
        }}
      />
    </>
  );
}
