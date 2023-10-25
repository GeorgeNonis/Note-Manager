import { styled } from "../../../../globalStyles";
import { Grid } from "../../Molecules";

export const StyledTitle = styled("textarea", {
  all: "unset",
  color: "white",
  padding: "0.5rem 1rem",
  marginBlock: "0",
  outline: "none",
  fontSize: "smaller",
  fontWeight: "400",
  width: "85%",
});

export const StyledNoteDetails = styled("div", {
  whiteSpace: "pre-wrap",
  wordWrap: "break-word",
  outline: "none",
  color: "white",
  fontSize: "0.875rem",
  overflowX: "auto",
});

export const StyledTextArea = styled("textarea", {
  all: "unset",
  padding: "1rem",
  height: "100%",
  boxSizing: "border-box",
  fontSize: "smaller",
  color: "white",
  fontWeight: "400",
});

export const StyledActions = styled(Grid, {
  opacity: 0,
  backgroundColor: "#202124",
  textAlign: "center",
});

export const StyledButton = styled("button", {
  all: "unset",
  w: "100%",
  boxSizing: "border-box",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  letterSpacing: "0.01785714em",
  fontFamily: '"Google Sans", Roboto, Arial, sans-serif',
  fontSize: "0.875rem",
  fontWeight: 500,
  lineHeight: "1.25rem",
  padding: "8px 24px",
  color: "#dadce0",

  "&:hover": {
    backgroundColor: "rgba(138, 180, 248, 0.039)",
    cursor: "pointer",
  },

  "&:disabled": {
    pointerEvents: "none",
    color: "gray",
  },
});

export const StyledSpan = styled("span", {
  textAlign: "center",
  opacity: 0,
});
export const Icon = styled("div", {
  width: "1.5rem",
  height: "1.5rem",
  display: "block",
  marginInline: "auto",

  opacity: 1,
  variants: {
    rotate: {
      true: {
        transform: "rotate(315deg)",
      },
    },
  },
});

export const StyledPinnedIcon = styled(Icon, {
  color: "gray",
});

export const StyledOptionsContent = styled("div", {
  opacity: 0,
  position: "relative",
  display: "grid",
  gridRow: 4,
  width: "100%",
  fontSize: "1rem",
  color: "white",
});

export const StyledNoteOptions = styled(Grid, {
  opacity: 0,
});
export const StyledPin = styled("div", {
  position: "absolute",
  inset: "7px -5px auto auto",
  color: "gray",
  cursor: "pointer",
  opacity: 0,

  "&:hover": {
    color: "white",
    [`& ${StyledSpan},${Icon}`]: {
      color: "white",
      opacity: 1,
    },
  },
});

export const StyledOption = styled("div", {
  position: "relative",
  svg: {
    padding: "0.5rem",
    "&:hover": {
      cursor: "pointer",
      borderRadius: "50%",
      backgroundColor: "gray",
    },
  },
  h3: {
    zIndex: 1,
    position: "absolute",
    visibility: "hidden",
    inset: "50% auto auto 50%",
    transform: "translate(-50%, 50%)",
    fontSize: "0.7rem",
    backgroundColor: "gray",
    padding: "0.2rem",
    borderRadius: "3px",
    minWidth: "7rem",
    textAlign: "center",
  },
  "&:hover": {
    cursor: "pointer",
    h3: {
      visibility: "visible",
    },
  },
});

export const StyledOptions = styled(Grid, {
  backgroundColor: "#202124",
});

export const StyledDotedOptions = styled("div", {
  zIndex: "1",
  position: "absolute",
  right: "0rem",
  bottom: "2.2rem",
  backgroundColor: "#202124",
  borderRadius: "5px",
  boxShadow: "-1px -1px 14px -6px black",
  display: "grid",
  gap: "1rem",

  h3: {
    fontSize: "0.75rem",
    padding: "0.5rem",
    margin: "0",
    "&:hover": {
      backgroundColor: "gray",
      cursor: "pointer",
    },
  },
});
