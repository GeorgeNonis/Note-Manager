import { FaRegLightbulb } from "react-icons/fa";
import { Account, MenuThreeLines } from "../../../../components";
import Link from "../link";
import { StyledMenu, StyledSideBar } from "./menu.styles";
import LabelLinks from "./comps/labels-links";
import { MdOutlineArchive, MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { ReactNode } from "react";
import Wrapper from "./comps/wrapper";

const Menu = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Wrapper>
      <MenuThreeLines />
      <Account />

      <StyledSideBar>
        <Link to={"/notes"} end>
          <FaRegLightbulb />
          <h3>Notes</h3>
        </Link>
        <LabelLinks />
        <Link onClick={onClick} to={""} button>
          <MdOutlineModeEditOutline />
          <h3>Edit Labels</h3>
        </Link>
        <Link to={"archivenotes"}>
          <MdOutlineArchive />
          <h3>Archive</h3>
        </Link>
        <Link to={"deletednotes"}>
          <BiTrash />
          <h3>Trash</h3>
        </Link>
      </StyledSideBar>
      {children}
    </Wrapper>
  );
};
export default Menu;
