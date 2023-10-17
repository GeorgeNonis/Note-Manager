import { styled } from "../../../globalStyles";
import { Input } from "../Atoms";

export const StyledForm = styled("div", {
  display: "grid",
  marginInline: "auto",
  position: "relative",
  border: "1px solid gray",
  borderRadius: "5px",
  padding: "0.5rem",
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
});
