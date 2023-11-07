import { FaRegLightbulb } from "react-icons/fa";
import { Account, Text } from "../../../../components";
import Link from "../link";
import { StyledMenu } from "./menu.styles";
import LabelLinks from "./comps/labels-links";
import { MdOutlineArchive, MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import { ReactNode } from "react";
import Wrapper from "./comps/wrapper";
import { useMediaQuery } from "react-responsive";
import { SCREENS } from "../../../../config";

const Menu = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) => {
  const isMobile = useMediaQuery({ minWidth: SCREENS.sm });
  return (
    <StyledMenu isMobile={!isMobile}>
      <Account />

      <Wrapper>
        <Link to={"/notes"} end>
          <FaRegLightbulb />
          <Text>Notes</Text>
        </Link>
        <LabelLinks />
        <Link onClick={onClick} to={""} button>
          <MdOutlineModeEditOutline />
          <Text>Edit Labels</Text>
        </Link>
        <Link to={"archivenotes"}>
          <MdOutlineArchive />
          <Text>Archived</Text>
        </Link>
        <Link to={"deletednotes"}>
          <BiTrash />
          <Text>Trash</Text>
        </Link>
      </Wrapper>
      {children}
    </StyledMenu>
  );
};
export default Menu;
