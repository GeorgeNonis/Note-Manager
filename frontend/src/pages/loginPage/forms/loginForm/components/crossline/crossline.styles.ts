import { styled } from "@stitches/react";

export const StyledCrossLine = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "9fr 3fr 9fr",
  placeItems: "center",

  "& div": {
    border: "1px solid rgba(0, 0, 0, 0.4588235294)",
    width: "100%",
  },
});
