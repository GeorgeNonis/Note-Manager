import { GrPersonalComputer } from "react-icons/gr";
import { styled } from "../../../../globalStyles";
import { Grid } from "noniscomponents";

export const StyledComputer = styled("div", {
  position: "relative",
});

export const StyledSvg = styled(GrPersonalComputer, {
  minW: "80px",
  minH: "80px",
});

export const StyledImagesContainer = styled(Grid, {
  gridTemplateColumns: "repeat(3,1fr)",

  "@mobile": {
    gridAutoFlow: "row",
    gridTemplateColumns: "repeat(2,1fr)",
  },
  img: {
    width: "150px",
    br: "$round",
    cursor: "pointer",
  },
});
