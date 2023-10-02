import { styled } from "../../../../globalStyles";

export const StyledButton = styled("button", {
  position: "relative",
  color: "white",
  minW: "fit-content",
  paddingInline: "$4",
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
    color: "$primaryDisableText !important",
  },

  variants: {
    size: {
      small: {
        fontSize: "0.875rem",
        h: 24,
      },
      medium: {
        fontSize: "1rem",
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
