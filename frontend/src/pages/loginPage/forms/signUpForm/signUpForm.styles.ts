import { styled } from "../../../../../globalStyles";

export const StyledForm = styled("form", {
  width: "$formSize",
  height: "80vh",
  padding: "$3", // Assuming $3 corresponds to 1rem
  display: "grid",
  gap: "$3",
  border: "1px solid black",
  borderRadius: "8px",
  backgroundColor: "#00000075",
  overflow: "auto",
  color: "white !important",

  ":-webkit-autofill, &:-webkit-autofill:focus": {
    "-webkit-text-fill-color": "white",
    transition: "background-color 600000s 0s, color 600000s 0s",
  },

  "@mobile": {
    width: "$formMobileSize",
  },

  fieldset: {
    all: "unset",
    position: "relative",

    legend: {
      display: "grid",
      gridTemplateColumns: "10fr 3fr",
      marginBottom: "0.4rem",
      width: "100%",

      span: {
        float: "right",
        background: "none",
        border: "none",
        marginTop: "1vh",
      },
    },
  },

  input: {
    color: "white !important",
    fontFamily: "CormorantGaramond",
    outline: "none",
    border: "none",
    borderRadius: "8px",
    width: "100%",
    background: "none",
    padding: "0 1rem",
    boxSizing: "border-box",
  },
});
