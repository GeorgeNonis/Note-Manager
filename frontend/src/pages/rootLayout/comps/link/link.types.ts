import { ReactNode } from "react";
import { StyledComponentProps } from "../../../../components/Atoms/Button/button.props";
import { StyledLink } from "./link.styles";
import { IconType } from "react-icons/lib";

export type StyledLinkProps = StyledComponentProps<typeof StyledLink>;

export interface LinkProps extends StyledLinkProps {
  // Icon: IconType;
  children: ReactNode;
}
