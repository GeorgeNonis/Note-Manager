import { StyledLink } from "./link.styles";
import { LinkProps } from "./link.types";

const Link = ({ children, ...props }: LinkProps) => {
  const getClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "inactive";
  return (
    <StyledLink {...props} className={getClassName}>
      {children}
    </StyledLink>
  );
};
export default Link;
