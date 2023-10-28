import { styled } from "../../../../globalStyles";
import { Button } from "../../Atoms";
import { Grid } from "../../Molecules";

export const StyledButton = styled(Button, {
  bgc: "rgba(154, 160, 166, 0.039)",
  padding: "20px",
  display: "grid",
  placeContent: "center",
  margin: 0,
  marginInline: "auto",
  width: "100%",
});

export const StyledLabelsDiv = styled(Grid, {
  marginBlock: "$2",
  gridTemplateColumns: "1fr 11fr",
});
