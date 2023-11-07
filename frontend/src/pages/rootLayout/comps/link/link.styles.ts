import { NavLink } from "react-router-dom";
import { styled } from "../../../../../globalStyles";

const commonStyles = {
  color: "gray",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "1fr 1fr",
  gap: "1vw",
  placeItems: "center",
  borderRadius: "0 25px 25px 0",
  height: "3.3rem",
  textDecoration: "none",
  letterSpacing: "0.01785714em",
  fontFamily: `"Google Sans", Roboto, Arial, sans-serif`,
  transition: "all 250ms ease-in-out",

  "&:hover": {
    backgroundColor: "#28292c",
  },

  "&.active": {
    color: "white",
    backgroundColor: "#41331c",
  },
};

export const StyledLink = styled(NavLink, {
  ...commonStyles,
});

export const StyledButton = styled("a", {
  ...commonStyles,
});
