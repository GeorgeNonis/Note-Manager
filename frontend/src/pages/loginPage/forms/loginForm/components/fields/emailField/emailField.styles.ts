import { styled } from "@stitches/react";

export const StyledEmailInput = styled("input", {
  fontFamily: "CormorantGaramond",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  height: "2rem",
  padding: "0 1rem",
  boxSizing: "border-box",

  backgroundColor: "rgba(0, 0, 0, 0.4588235294)",
  color: "white",
  ":-webkit-autofill, &:-webkit-autofill:focus": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
});
