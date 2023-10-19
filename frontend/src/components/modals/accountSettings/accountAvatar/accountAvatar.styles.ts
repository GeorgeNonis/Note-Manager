import { styled } from "../../../../../globalStyles";
import { Button } from "../../../Atoms";

export const StyledCancelButton = styled(Button, {
  position: "absolute",
  inset: "90% auto auto 50%",
  transform: "translate(-50%, -50%)",
});

export const StyledButton = styled(Button, {
  minW: "fit-content",
  w: "130px",
  "@mobile": {
    fontSize: "small !important",
  },
});
