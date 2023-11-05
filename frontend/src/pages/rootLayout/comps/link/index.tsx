import { StyledLink } from "./link.styles";
import { LinkProps } from "./link.types";

const Link = ({ children, ...props }: LinkProps) => {
  return <StyledLink {...props}>{children}</StyledLink>;
};
export default Link;
