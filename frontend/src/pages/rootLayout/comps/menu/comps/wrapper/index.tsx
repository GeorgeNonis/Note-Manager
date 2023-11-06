import { slide as BurgerMenu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../../../../config";
import { ReactNode } from "react";
import { StyledSideBar } from "../../menu.styles";
import { BurgerStyle } from "./wrapper.styles";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ minWidth: SCREENS.sm });

  if (isMobile) {
    return <StyledSideBar>{children}</StyledSideBar>;
  } else {
    return <BurgerMenu styles={BurgerStyle}>{children}</BurgerMenu>;
  }
};
export default Wrapper;
