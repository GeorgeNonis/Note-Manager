import { styled } from "../../../../globalStyles";

export const StyledButton = styled("button", {
  position: "relative",
  color: "white",
  height: "2.5rem",
  width: "$defaultSize",
  marginBlock: "0.7rem",
  marginInline: "auto",
  borderRadius: "8px",
  border: "none",
  cursor: "pointer",
  fontFamily: "CormorantGaramond",
  transition: "all 250ms ease-in-out",

  "&:disabled": {
    cursor: "default",
    pointerEvents: "none",
    backgroundColor: "$primaryDisableBackground",
    color: "$primaryDisableText !important",
  },

  variants: {
    size: {
      small: {
        fontSize: "0.875rem",
        h: 24,
      },
      medium: {
        h: 32,
      },
      large: {
        fontSize: "1.125rem",
        h: 48,
      },
    },

    variant: {
      default: {
        backgroundColor: "#f26716",
      },
      danger: {
        backgroundColor: "#ff7272",
      },
    },
  },

  defaultVariants: {
    size: "medium",
    variant: "default",
  },
});
