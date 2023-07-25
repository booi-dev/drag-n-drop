"use client";

import React, { useState, useRef } from "react";
import ActiveWidget from "./ActiveWidget";

function DragDropContainer() {
  const dropElRef = useRef<HTMLDivElement | null>(null);
  const widgetRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [widgets, setWidgets] = useState<string[]>([]);
  const [dragginWidgetIdx, setDragginWidgetIdx] = useState<number | null>(null);

  const handleOnDrop = (e: React.DragEvent) => {
    const widget = e.dataTransfer.getData("widgetType") as string;
    setWidgets([...widgets, widget]);
    dropElRef.current?.classList.remove("bg-gray-800");
  };

  const handleOnDragOver = (e: React.DragEvent) => {
    dropElRef.current?.classList.add("bg-gray-800");
    e.dataTransfer.dropEffect = "copy";
    e.preventDefault();
  };

  const handleWidgetLeaving = (cb?: () => void) => {
    if (cb) cb();
  };

  const handleDragLeave = (e: React.DragEvent) => {
    dropElRef.current?.classList.remove("bg-gray-800");
    handleWidgetLeaving();
    // e.stopPropagation();
    console.log("A widget is leaving");
  };

  return (
    <div
      ref={dropElRef}
      className="w-60 border-2 aspect-square"
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
      onDragLeave={handleDragLeave}
    >
      {widgets.map((widget, idx) => (
        <ActiveWidget
          key={idx}
          idx={idx}
          ref={(el) => (widgetRefs.current[idx] = el)}
          widget={widget}
          isIn
          handleWidgetLeaving={handleWidgetLeaving}
        />
      ))}
    </div>
  );
}

export default DragDropContainer;
