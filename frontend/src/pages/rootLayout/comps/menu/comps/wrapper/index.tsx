import { slide as BurgerMenu } from "react-burger-menu";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../../../../config";
import { ReactNode } from "react";
import { StyledMenu } from "../../menu.styles";
import { BurgerStyle } from "./wrapper.styles";

const Wrapper = ({ children }: { children: ReactNode }) => {
  const isMobile = useMediaQuery({ maxWidth: SCREENS.sm });

  if (isMobile) {
    return <StyledMenu>{children}</StyledMenu>;
  } else {
    return <BurgerMenu styles={BurgerStyle}>{children}</BurgerMenu>;
  }
};
export default Wrapper;
