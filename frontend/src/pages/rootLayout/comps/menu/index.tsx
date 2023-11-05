import { Account, MenuThreeLines } from "../../../../components";
import { StyledMenu } from "./menu.styles";

const Menu = () => {
  return (
    <StyledMenu>
      <MenuThreeLines />
      <Account />
    </StyledMenu>
  );
};
export default Menu;
