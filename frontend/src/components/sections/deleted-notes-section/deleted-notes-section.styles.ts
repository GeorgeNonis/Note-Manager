import { styled } from "../../../../globalStyles";
import { Grid } from "noniscomponents";

export const StyledSection = styled(Grid, {
  gap: "1rem",
  margin: "1rem",
  paddingTop: "4rem",

  "@mobile": {
    gridAutoFlow: "row",
  },
  "@desktop": {
    gridTemplateColumns: "repeat(4, minmax(100px, 1fr))",
  },
});

export const StyledWarning = styled("h3", {
  fontStyle: "italic",
  textAlign: "center",

  "@mobile": {
    fontSize: "medium",
  },
});
