import { ReactNode } from "react";
import { StyledComponentProps } from "../../../../components/Atoms/Button/button.props";
import { StyledLink } from "./link.styles";

export type StyledLinkProps = StyledComponentProps<typeof StyledLink>;

export interface LinkProps extends StyledLinkProps {
  button?: boolean;
  children: ReactNode;
}
