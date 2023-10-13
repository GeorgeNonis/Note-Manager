import { styled } from "../../../../../globalStyles";

export const StyledDiv = styled("div", {
  display: "grid",
  alignItems: "center",
  justifyItems: "center",
  position: "absolute",
  inset: "50% auto auto 50%",
  transform: "translate(-50%, -50%)",
  svg: {
    width: "7rem",
    height: "7rem",
    color: "gray",
  },
});
