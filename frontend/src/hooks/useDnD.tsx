import React, { useState } from "react";

export const useDnd = () => {
  const [index, setIndex] = useState<number>(0);
  const [indexOf, setIndexOf] = useState<number>(0);

  const onDragStart = (e: React.DragEvent, position: number) => {
    setIndexOf(position);
  };

  const onDragEnter = (e: React.DragEvent, position: number) => {
    setIndex(position);
    // console.log(position);
  };

  const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    // console.log(e);
    const div = e.dataTransfer.getData("id") as string;
    // console.log(div);
  };

  return {
    onDragStart,
    onDragEnter,
    indexOf,
    index,
    setIndex,
  };
};
