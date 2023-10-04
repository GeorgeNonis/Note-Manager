import { styled } from "../../../../globalStyles";

export const StyledTitle = styled("textarea", {
  all: "unset",
  padding: "0.5rem 1rem",
  marginBlock: "0",
  outline: "none",
  fontSize: "1rem",
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
  fontSize: "0.875rem",
  color: "white",
  fontWeight: "400",
});

export const StyledActions = styled("div", {
  gridRow: "3",
  backgroundColor: "#202124",

  "& button:nth-of-type(2)": {
    float: "right",
  },
});

export const StyledButton = styled("button", {
  all: "unset",
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
  justifySelf: "flex-end",
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
  position: "absolute",
  top: "2rem",
  textAlign: "center",
  opacity: 0,
});
export const Icon = styled("div", {
  width: "1.5rem",
  height: "1.5rem",
  display: "block",
  marginInline: "auto",
  transform: "rotate(315deg)",
  position: "absolute",
  opacity: 0,
  right: "14px",

  "&:hover": {
    color: "white",
    opacity: 1,
  },
});

export const StyledPinnedIcon = styled(Icon, {
  color: "gray",
  transform: "none",
});

export const StyledPin = styled("div", {
  position: "absolute",
  inset: "7px -5px auto auto",
  color: "gray",
  cursor: "pointer",

  "&:hover": {
    color: "white",
    [`& ${StyledSpan},${Icon}`]: {
      color: "white",
      opacity: 1,
    },
  },
});
