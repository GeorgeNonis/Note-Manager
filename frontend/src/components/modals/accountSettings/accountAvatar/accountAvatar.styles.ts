import { MdOutlineAddAPhoto } from "react-icons/md";
import { styled } from "../../../../../globalStyles";
import { Button } from "../../../Atoms";

export const StyledCancelButton = styled(Button, {
  position: "absolute",
  inset: "90% auto auto 50%",
  transform: "translate(-50%, -50%)",
});

export const StyledButton = styled(Button, {
  minW: "fit-content",
  w: "130px",
  "@mobile": {
    fontSize: "small !important",
  },
});

export const StyledImage = styled("img", {
  zIndex: "10",
  w: "100px",
  h: "100px",
  borderRadius: "50%",
  cursor: "pointer",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  transition: "all 500ms ease-in-out",
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
      false: {
        inset: "50% auto auto 50%",
      },
    },
  },
});

export const StyledSvg = styled(MdOutlineAddAPhoto, {
  w: "50px",
  h: "50px",
  borderRadius: "50%",
  position: "absolute",
  transform: "translate(-50%, -50%)",
  opacity: "0.7",
  zIndex: "12",
  transition: "all 500ms ease-in-out",
  cursor: "pointer",

  variants: {
    avatar: {
      false: {
        inset: "50% auto auto 50%",
      },
    },
  },
});
