import { styled } from "@stitches/react";

export const StyledEmailInput = styled("input", {
  backgroundColor: "rgba(0, 0, 0, 0.4588235294) !important",
  color: "white !important",
  ":-webkit-autofill, &:-webkit-autofill:focus": {
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
});
