import { NavLink } from "react-router-dom";
import { styled } from "../../../../../globalStyles";

export const StyledLink = styled(NavLink, {
  variants: {
    active: {
      true: {
        color: "white",
        backgroundColor: "#41331c",
      },
      false: {
        color: "gray",
        "&:hover": {
          cursor: "pointer",
        },
      },
    },
  },
});
