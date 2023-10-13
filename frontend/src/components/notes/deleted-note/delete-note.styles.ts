import { styled } from "../../../../globalStyles";
import { Button } from "../../Atoms";
import { Grid } from "../../Molecules";

export const StyledActions = styled(Grid, {
  alignSelf: "self-end",
});

export const StyledButton = styled(Button, {
  w: "unset !important",
  minH: "$2",
  h: "unset !important",
  m: 0,
  p: "$2",
});
