import React, { useState, useCallback, useEffect } from "react";

import { Select } from "src/components/common/Select";
import { Button } from "src/components/common/Button";

import "./styles.css";

export function ContentAdder({ onContentAdded }: { onContentAdded?: any }) {
  const [isOpen, setIsOpen] = useState(false);

  const escFunction = useCallback((event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  });

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleOptionSelected(optionValue) {
    onContentAdded?.(optionValue);
    toggleMenu();
  }

  return (
    <div className="ContentAdder">
      <Select icon={"➕"}>
        <Button
          icon="✏️"
          label="Text"
          onClick={() => {
            handleOptionSelected(`text`);
          }}
        />
        <Button
          icon="📊"
          label="Report"
          onClick={() => {
            handleOptionSelected(`report`);
          }}
        />
        <Button
          icon="👀"
          label="Report Link"
          onClick={() => {
            handleOptionSelected(`report-link`);
          }}
        />
      </Select>
    </div>
  );
}
