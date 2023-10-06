import { styled } from "../../../../../globalStyles";

export const StyledWrapper = styled("div", {
  display: "grid",
  gridTemplateRows: "2fr 7.5fr 1.5fr 1.5fr",
  w: "100%",
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",

  marginInline: "auto",
  boxSizing: "border-box",
  color: "gray",
  border: "1px solid gray",
  borderRadius: "$1",
  outline: "none",
  textOverflow: "ellipsis",
  overflowWrap: "anywhere",
  letterSpacing: "0.01785714em",
  fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
  variants: {
    review: {
      true: {
        w: 500,
        h: 700,
        zIndex: 10065,
        backgroundColor: "#242424",
        display: "grid",
      },
      false: {
        minHeight: "15rem",
        maxHeight: "20rem",
      },
    },
  },
});
