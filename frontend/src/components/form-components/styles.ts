import { styled } from "../../../globalStyles";
import { Input } from "../Atoms";
import { Grid } from "../Molecules";

export const StyledForm = styled("div", {
  display: "grid",
  boxSizing: "border-box",
  w: "600px",
  h: "fit-content",
  marginInline: "auto",
  position: "relative",
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "0.5rem",

  "@mobile": {
    w: "80%",
  },
});

export const StyledInput = styled(Input, {
  marginBlock: "0.5rem",
  border: "none",
  width: "100%",
  boxSizing: "border-box",
  backgroundColor: "transparent",
  outline: "none",
  color: "white",
  padding: "0.2rem 0",
  fontSize: "medium",
});

export const StyledActions = styled(Grid, {});
