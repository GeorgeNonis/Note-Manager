import { styled } from "../../../../globalStyles";

export const StyledForm = styled("form", {
  width: "$formSize",
  padding: "1rem",
  display: "grid",
  gap: "1rem",
  border: "1px solid black",
  borderRadius: "8px",
  backgroundColor: "#00000075",
  color: "white !important",
  "-webkit-text-fill-color": "white",
  "@mobile": {
    overflow: "auto",
    width: "$formMobileSize",
    height: "500px",
    marginBlock: "300px",
  },

  variants: {
    backgroundUnset: {
      true: {
        bgc: "unset",
        border: "unset",
      },
    },
  },
});
