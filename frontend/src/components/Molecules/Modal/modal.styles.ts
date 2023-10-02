import { HiXMark } from "react-icons/hi2";
import { styled, fadeIn, fadeOut } from "../../../../globalStyles";

export const StyledModal = styled("div", {
  bgc: "#313235",
  left: "50%",
  overflowY: "auto",
  p: "$3",
  br: "$2",
  position: "absolute",
  top: "50%",
  transform: "translate(-50%, -50%)",
  transition: "$default",

  variants: {
    innerModal: {
      true: {
        zIndex: "$innerModal",
      },
      false: {
        zIndex: "$modal",
      },
    },
    fullscreen: {
      true: {
        br: 0,
        inset: 0,
        transform: "none",
      },
      false: {
        "@mobile": {
          maxW: "calc(100% - 32px)",
        },

        w: "800px",
        height: "80dvh",
        "@desktop": {
          maxW: 1168,
        },
      },
    },
  },
});

export const StyledBackdrop = styled("div", {
  position: "fixed",
  top: 0,
  right: "auto",
  bottom: "auto",
  left: 0,
  width: "100%",
  height: "100vh",
  bgc: "rgba(10, 10, 10, 0.6)",
  transition: "$default",
  zIndex: "$background",

  variants: {
    innerModal: {
      true: {
        zIndex: "$innerModal",
      },
    },
    isOpen: {
      true: {
        fadeIn,
        opacity: 1,
        visibility: "visible",
      },
      false: {
        fadeOut,
        opacity: 0,
        visibility: "hidden",
      },
    },
  },
});

export const StyledXmark = styled(HiXMark, {
  position: "fixed",
  top: "1rem",
  right: "1rem",
  width: "2rem",
  height: "2rem",
  cursor: "pointer",
});
