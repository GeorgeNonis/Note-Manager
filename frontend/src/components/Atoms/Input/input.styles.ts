import { styled } from "../../../../globalStyles";

export const StyledInput = styled("input", {
  fontFamily: "CormorantGaramond",
  outline: "none",
  border: "none",
  borderRadius: "8px",
  width: "100%",
  height: "2rem",
  padding: "0 1rem",
  boxSizing: "border-box",

  backgroundColor: "$inputShadow",
  color: "white",

  ":-webkit-autofill, &:-webkit-autofill:focus": {
    "-webkit-text-fill-color": "white",
    transition: "background-color 600000s 0s, color 600000s 0s",
  },

  variants: {
    backgroundUnset: {
      true: {
        bgc: "unset",
      },
    },
  },
});
