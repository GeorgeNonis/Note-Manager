import { NavLink } from "react-router-dom";
import { styled } from "../../../../../globalStyles";

export const StyledLink = styled(NavLink, {
  color: "gray",
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "2fr 6fr",
  gap: "1vw",
  placeItems: "center",
  borderRadius: "0 25px 25px 0",
  height: "3.3rem",
  textDecoration: "none",
  letterSpacing: "0.01785714em",
  fontFamily: `"Google Sans", Roboto, Arial, sans-serif`,
  transition: "all 250ms ease-in-out",

  "&:hover": {
    height: "4rem",
    gap: "0",
    backgroundColor: "#28292c",
  },

  h3: {
    textAlign: "center",
    padding: "0",
    margin: "0",
    justifySelf: "start",
    color: "white",
    fontWeight: "400",
    overflow: "hidden",
    width: "80%",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
  },
  "&.active": {
    color: "white",
    backgroundColor: "#41331c",
  },
});
