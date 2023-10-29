import { styled } from "../../../../globalStyles";
import { Button } from "../../Atoms";
import { Grid } from "../../Molecules";

export const StyledActions = styled(Grid, {
  alignSelf: "self-end",
});

export const StyledButton = styled(Button, {
  w: "100%",
  minH: "$2",
  h: "unset !important",
  m: "$0 !important",
  p: "$2",
});
