import { styled } from "../../../../globalStyles";

export const StyledContent = styled("div", {
  position: "absolute",
  top: "3rem",
  left: "-13.5rem",
  width: "15rem",
  height: "15rem",
  display: "grid",
  gridAutoFlow: "row",
  zIndex: 2,
  background: "#4c4e52",
  borderRadius: "8px",
  placeItems: "center",
  paddingBottom: "1rem",
});

export const StyledProfileImage = styled("img", {
  width: "4.5rem",
  height: "4.5rem",
  borderRadius: "50%",
  cursor: "pointer",
});
