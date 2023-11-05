import { FaRegLightbulb } from "react-icons/fa";
import { Account, MenuThreeLines } from "../../../../components";
import Link from "../link";
import { StyledMenu, StyledSideBar } from "./menu.styles";
import LabelLinks from "./comps/labels-links";
import { MdOutlineArchive, MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { ReactNode } from "react";

const Menu = ({ children }: { children: ReactNode }) => {
  return (
    <StyledMenu>
      <MenuThreeLines />
      <Account />

      <StyledSideBar>
        <Link to={"/notes"} end>
          <FaRegLightbulb />
          <h3>Notes</h3>
        </Link>
        <LabelLinks />
        {/* <a
          className={
            state.values.displayState.error ? styles.disable : styles.inactive
          }
          tabIndex={1}
          onClick={state.actions.labelModalHandler}
        >
          <MdOutlineModeEditOutline />
          <h3>Edit Labels</h3>
        </a> */}
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
    </StyledMenu>
  );
};
export default Menu;
