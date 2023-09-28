import { styled } from "../../../../../globalStyles";

export const StyledForm = styled("form", {
  width: "300px",
  padding: "1rem",
  display: "grid",
  gap: "1rem",
  border: "1px solid black",
  borderRadius: "8px",
  backgroundColor: "#00000075",

  fieldset: {
    all: "unset",
    position: "relative",

    legend: {
      marginBottom: "0.4rem",
      width: "100%",
    },
  },
});
