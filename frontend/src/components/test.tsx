import React, { useEffect, useState } from "react";
import { SketchPicker } from "react-color";
import namedColors from "color-name-list";

const Test = () => {
  const [color, setcolor] = useState<string>("");
  console.log(color);
  useEffect(() => {
    if (color.length === 0) return;
    // console.log(namedColors.colorNameList);
    console.log(typeof color);
    console.log(color.length);
    console.log(namedColors);
    let someColor = namedColors.colorNameList.find(
      (clr, i) => clr.hex === "#3b25ab"
    )!;
    console.log(someColor);
  }, [color]);
  return (
    <>
      <SketchPicker
        onChange={(color) => {
          setcolor(color.hex);
        }}
        // color={color}
      />
      {/* <BlockPicker /> */}
    </>
  );
};
export default Test;
