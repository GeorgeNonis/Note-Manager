import { MdOutlineAddAPhoto } from "react-icons/md";
import { styled } from "../../../../../globalStyles";
import { Button } from "../../../Atoms";

export const StyledCancelButton = styled(Button, {
  placeSelf: "self-end",
});

export const StyledButton = styled(Button, {
  minW: "fit-content",
  w: "130px",
  "@mobile": {
    fontSize: "small !important",
  },
});

export const StyledImage = styled("img", {
  placeSelf: "center",
  zIndex: "10",
  w: "100px",
  h: "100px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",

  padding: "0.5rem",
  "&:hover": {
    backgroundColor: "gray",
  },

  variants: {
    background: {
      true: {
        background: "gray",
      },
      false: {
        background: "none",
      },
    },
    avatar: {
      true: {
        transform: "translate(-50%, -50%)",
        inset: "50% auto auto 25%",
        "@mobile": {
          inset: "65% auto auto 50%",
        },
      },
    },
    selectedAvatar: {
      true: {
        transform: "translate(-50%, -50%)",
        inset: "50% auto auto 75%",

        "@mobile": {
          inset: "25% auto auto 50%",
        },
      },
    },
  },
});

export const StyledSvg = styled(MdOutlineAddAPhoto, {
  placeSelf: "center",

  w: "50px",
  h: "50px",
  borderRadius: "50%",
  position: "absolute",
  opacity: "0.7",
  zIndex: "12",
  cursor: "pointer",

  variants: {
    avatar: {
      true: {
        transform: "translate(-50%, -50%)",
        inset: "50% auto auto 25%",
        "@mobile": {
          inset: "65% auto auto 50%",
        },
      },
    },
  },
});
