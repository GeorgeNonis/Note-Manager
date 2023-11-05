import { styled } from "../../../../../globalStyles";

export const StyledMenu = styled("div", {
  display: "grid",
  gridTemplateColumns: "2fr 8fr",
  transition: "all ease-in-out 500ms",
  borderTop: "1px solid gray",
  marginTop: "4.3rem",
  paddingTop: "1rem",

  variants: {
    sideBarClosed: {
      true: {
        gridTemplateColumns: "1fr 11fr",
      },
    },
  },
});
