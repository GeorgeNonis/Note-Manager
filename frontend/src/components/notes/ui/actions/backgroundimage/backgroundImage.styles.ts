import { styled } from "../../../../../../globalStyles";
import { Grid } from "../../../../Molecules";

export const StyledContainer = styled(Grid, {
  padding: "$4",
  gridTemplateColumns: "repeat(3,1fr)",
  height: "100%",
  boxSizing: "border-box",
  placeItems: "center",

  "@mobile": {
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "$4",
  },
});

export const StyledImg = styled("img", {
  w: "100px",
  h: "100px",
  cursor: "pointer",
});
export const StyledDefault = styled("div", {
  w: "100px",
  h: "100px",
  cursor: "pointer",
  display: "grid",
  placeItems: "center",
});
