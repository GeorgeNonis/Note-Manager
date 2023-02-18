import React, { useState } from "react";
import { BlockPicker, SketchPicker } from "react-color";
const Test = () => {
  const [color, setcolor] = useState<string>("");
  console.log(color);
  return (
    <>
      <SketchPicker
        onChange={(color) => {
          console.log(typeof color);

          setcolor(color.hex);
        }}
        color={color}
      />
      {/* <BlockPicker /> */}
    </>
  );
};
export default Test;
