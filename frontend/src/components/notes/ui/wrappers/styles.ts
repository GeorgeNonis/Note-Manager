import { styled } from "../../../../../globalStyles";
import {
  StyledActions,
  StyledNoteOptions,
  StyledOptionsContent,
  StyledPin,
} from "../styles";

export const StyledWrapper = styled("div", {
  display: "grid",
  gridTemplateRows: "2fr 7.5fr 2fr",
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
    deletedNote: {
      true: {
        gridTemplateRows: "3fr 7.5fr 1fr",
      },
    },
    review: {
      true: {
        w: 500,
        h: 700,
        zIndex: 10065,
        backgroundColor: "#242424",
        [`& ${StyledNoteOptions},${StyledPin},${StyledOptionsContent},${StyledActions}`]:
          {
            opacity: 1,
          },
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: `translate(-50%, -50%)`,

        "@mobile": {
          w: 400,
        },
      },
      false: {
        minHeight: "15rem",
        maxHeight: "20rem",
      },
    },
  },
  "&:hover": {
    color: "white",
    [`& ${StyledNoteOptions},${StyledPin},${StyledOptionsContent},`]: {
      opacity: 1,
    },
  },
});
