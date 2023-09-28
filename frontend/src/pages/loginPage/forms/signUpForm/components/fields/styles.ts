import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import { styled } from "../../../../../../../globalStyles";

export const StyledInputWrapper = styled("div", {
  display: "grid",
  gridTemplateColumns: "11fr 1fr",
  background: "rgba(0, 0, 0, 0.4588235294)",
  borderRadius: "8px",
});

export const StyledSpan = styled("span", {
  display: "grid",
  placeSelf: "center",
  placeContent: "center",
  cursor: "pointer",
  padding: "0 0.5rem",
});

export const StyledCheckMark = styled("span", {
  float: "right",
  background: "none",
  border: "none",
  marginTop: "1vh",

  variants: {
    show: {
      true: {
        display: "grid",
        gridTemplateColumns: "1fr 15fr",
        alignItems: "center",
        "& svg": {
          placeSelf: "center",
        },
      },
      false: {
        display: "grid",
        gridTemplateColumns: "1fr 15fr",
        alignItems: "center",
        margin: 0,
        opacity: 0,
      },
    },
  },
});

export const StyledFieldSet = styled("fieldset", {
  all: "unset",
  position: "relative",

  legend: {
    display: "grid",
    gridTemplateColumns: "10fr 3fr",
    marginBottom: "0.4rem",
    width: "100%",
  },
});

export const StyledPasswordNote = styled("p", {
  display: "grid",
  gridTemplateColumns: "1fr 15fr",
  alignItems: "center",

  "& span": {
    fontSize: "1rem",
  },

  "& svg": {
    placeSelf: "center",
  },

  variants: {
    invalidPassword: {
      true: {
        opacity: 1,
      },
      false: {
        opacity: 0,
      },
    },
  },
});

export const StyledCorrect = styled(TbCircleCheck, {
  color: "Lime",
});
export const StyledXmark = styled(TbCircleX, {
  color: "red",
});
