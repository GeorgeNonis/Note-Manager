import { styled } from "@stitches/react";

export const StyledWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "11fr 1fr",
  background: "rgba(0, 0, 0, 0.4588235294)",
  borderRadius: "8px",

  "& span": {
    display: "grid",
    placeSelf: "center",
    placeContent: "center",
    float: "right",
    background: "none",
    border: "none",
    cursor: "pointer",
  },
});
