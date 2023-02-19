import React, { useState } from "react";

export const useDnd = () => {
  const [index, setIndex] = useState<number>(0);
  const [indexOf, setIndexOf] = useState<number>(0);

  const onDragStart = (e: React.DragEvent, position: number) => {
    setIndexOf(position);
  };

  const onDragEnter = (e: React.DragEvent, position: number) => {
    setIndex(position);
  };

  return {
    onDragStart,
    onDragEnter,
    indexOf,
    index,
    setIndex,
  };
};
