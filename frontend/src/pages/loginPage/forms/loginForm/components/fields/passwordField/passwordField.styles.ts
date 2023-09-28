import { styled } from "@stitches/react";

export const StyledPasswordField = styled("input", {
  fontFamily: "CormorantGaramond",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  height: "2rem",
  padding: "0 1rem",
  boxSizing: "border-box",

  background: "unset",
  color: "white",
  ":-webkit-autofill, &:-webkit-autofill:focus": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
});

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
