import { TbCircleCheck, TbCircleX } from "react-icons/tb";
import { styled } from "../../../../../../../../globalStyles";

export const StyledCheckMark = styled("span", {
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
