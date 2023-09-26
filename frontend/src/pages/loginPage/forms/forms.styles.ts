import { styled } from "@stitches/react";

export const StyledButton = styled("button", {
  fontSize: "1rem",
  color: "white",
  height: "2.5rem",
  width: "80%",
  marginBlock: "0.7rem",
  marginInline: "auto",
  borderRadius: "8px",
  background: "#f26716",
  border: "none",
  cursor: "pointer",
  fontFamily: "CormorantGaramond",
  transition: "all 250ms ease-in-out",

  variants: {
    disableButton: {
      true: {
        pointerEvents: "none",
        backgroundColor: "rgb(255 144 79)",
        color: "#ffffff8c",
      },
      false: {
        cursor: "pointer",
      },
    },
  },
});
