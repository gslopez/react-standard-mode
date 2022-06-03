import React from "react";
import { Button } from "src/components/common/Button";
import "./styles.css";

export function getEmojiCardTitle(content) {
  return `content.title`;
}

export function Emoji({ content }: { content: any }) {
  return <div className="Emoji"> {content.emoji} </div>;
}

export function EmojiOptions({ content }) {
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
        icon="♻️"
        label="Change emoji"
        onClick={() => {
          console.log("card deleted");
        }}
      />
    </>
  );
}
