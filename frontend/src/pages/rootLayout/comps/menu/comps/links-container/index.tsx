import { MdOutlineArchive, MdOutlineModeEditOutline } from "react-icons/md";
import LabelLinks from "../labels-links";
import { StyledLinkContainers } from "./links-container.styles";
import { BasicLinksProps } from "./links-container.types";
import { BiTrash } from "react-icons/bi";
import { FaRegLightbulb } from "react-icons/fa";
import Link from "../../../link";

const LinkContainer = () => {
  const basicLinks: BasicLinksProps[] = [
    { Icon: FaRegLightbulb, label: "Notes", to: "/notes" },
    { Icon: MdOutlineModeEditOutline, label: "Edit Labels", to: "#" },
    { Icon: MdOutlineArchive, label: "Archive", to: "archivenotes" },
    { Icon: BiTrash, label: "Trash", to: "deletednotes" },
  ];

  const mappedLinks = basicLinks.map(({ Icon, label, to }) => {
    return (
      <Link to={to} Icon={Icon}>
        {label}
      </Link>
    );
  });

  return (
    <StyledLinkContainers>
      {mappedLinks}
      <LabelLinks />
    </StyledLinkContainers>
  );
};
export default LinkContainer;
