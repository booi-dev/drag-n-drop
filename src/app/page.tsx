"use client";

import { useState, useRef } from "react";
import DragDropContainer from "../components/DragDropContainer";

function Home() {
  const widgetRefs = useRef<(HTMLDivElement | null)[]>([]);

  const rawWidgetList = ["widget A", "widget B", "widget C"];

  const handleOnDrag = (
    e: React.DragEvent,
    widgetType: string,
    idx: number
  ) => {
    e.dataTransfer.setData("widgetType", widgetType);
  };

  const handleOnDragOver = (e: React.DragEvent, idx: number) => {
    e.preventDefault();
    widgetRefs.current[idx]?.classList.add("bg-gray-800");
  };

  const handleDragLeave = (idx: number) => {
    widgetRefs.current[idx]?.classList.remove("bg-gray-800");
  };

  return (
    <div className="m-4 w-full flex gap-12">
      <div>
        {rawWidgetList.map((widget, idx) => (
          <div
            ref={(el) => (widgetRefs.current[idx] = el)}
            key={idx}
            className="p-2 border-2 m-2 w-28"
            draggable
            onDragStart={(e) => handleOnDrag(e, widget, idx)}
            onDragOver={(e) => handleOnDragOver(e, idx)}
            onDragLeave={(e) => handleDragLeave(idx)}
          >
            {widget}
          </div>
        ))}
      </div>
      <DragDropContainer />
    </div>
  );
}

export default Home;
