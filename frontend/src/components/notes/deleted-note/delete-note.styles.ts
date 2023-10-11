import { styled } from "../../../../globalStyles";
import { Grid } from "../../Molecules";

export const StyledActions = styled(Grid, {
  fontSize: "0.8rem",
  button: {
    fontSize: "0.7rem",
    borderRadius: "5px",
    color: "white",
    padding: "0.3rem",
    border: "none",
    backgroundColor: "transparent",
    fontStyle: "italic",

    "&:hover": {
      backgroundColor: "#28292c",
    },
  },
});
