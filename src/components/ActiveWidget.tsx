import React, { useState } from "react";
import { forwardRef } from "react";

type ActiveWidgetProp = {
  idx: number;
  widget: string;
  isIn: true;
  handleWidgetLeaving: (cb?: () => void) => void;
};

type ActiveWidgetRef = HTMLDivElement;

const ActiveWidget = forwardRef<ActiveWidgetRef, ActiveWidgetProp>(
  function ActiveWidget(props, ref) {
    const { widget, idx, handleWidgetLeaving } = props;

    const [isInContainer, setIsInContainer] = useState(true);

    // console.log(isInContainer);

    const handleOnDragStart = (e: React.DragEvent) => {
      //   handleWidgetLeaving(() => setIsInContainer(false));
      e.dataTransfer.dropEffect = "link";
    };

    const handleOnDragOver = (e: React.DragEvent) => {
      e.preventDefault();
    };

    return (
      <div
        ref={ref}
        className="p-2 border-2 m-2 w-28"
        draggable
        onDragStart={handleOnDragStart}
        onDragOver={handleOnDragOver}
      >
        {widget}
      </div>
    );
  }
);

export default ActiveWidget;
