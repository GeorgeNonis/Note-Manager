import { styled } from "../../../../../../../globalStyles";

export const StyledInputWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "11fr 1fr",
  background: "rgba(0, 0, 0, 0.4588235294)",
  borderRadius: "8px",
});

export const StyledSpan = styled("span", {
  display: "grid",
  placeSelf: "center",
  placeContent: "center",
  cursor: "pointer",
  padding: "0 0.5rem",
});

export const StyledInput = styled("input", {
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
    "-webkit-text-fill-color": "white",
    transition: "background-color 600000s 0s, color 600000s 0s",
  },
});
