import { styled } from "../../../../globalStyles";
import { Text } from "../../Atoms";
import { Grid } from "../../Molecules";

export const StyledNavLink = styled(Text, {
  fontWeight: 300,
  margin: 0,
  borderRadius: "0 25px 25px 0",
  boxSizing: "border-box",
  cursor: "pointer",
  p: "$2",
  transition: "$default",

  variants: {
    isActive: {
      true: {
        width: "100%",
        color: "white",
        transition: "all 0.5ms ease-in-out",
        backgroundColor: "#f26716",
        pointerEvents: "none",
      },
      false: {
        "&:hover": {
          backgroundColor: "#28292c",
          width: "100%",
        },
      },
    },
  },
});

export const StyledColumn1 = styled(Grid, {
  w: "100%",
  alignSelf: "start",
});
export const StyledColumn2 = styled(Grid, {
  w: "100%",
  h: "100%",
});
