import { styled } from "../../../../globalStyles";

export const StyledSection = styled("main", {
  display: "grid",
  gap: "1rem",
});

export const StyledNotes = styled("div", {
  display: "grid",
  gap: "1rem",
  margin: "1rem",

  "@desktop": {
    gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
  },
  "@mobile": {
    gridAutoFlow: "row",
  },
});
