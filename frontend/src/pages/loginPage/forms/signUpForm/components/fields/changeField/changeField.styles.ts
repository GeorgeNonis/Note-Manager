import { styled } from "../../../../../../../../globalStyles";

export const StyledFieldSetImage = styled("fieldset", {
  all: "unset",
  position: "relative",
  img: {
    display: "grid",
    marginInline: "auto",
    marginBlock: "1rem 2rem",
    borderRadius: "50%",
    size: "$5",
  },
});

export const StyledFieldSetDiv = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gap: "$3",
  position: "relative",
  height: "4rem",
  width: "90%",
  margin: "auto",
  marginTop: "0.5rem",
});
