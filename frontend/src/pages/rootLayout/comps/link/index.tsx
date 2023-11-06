import { StyledButton, StyledLink } from "./link.styles";
import { LinkProps } from "./link.types";

const Link = ({ button, children, onClick, ...props }: LinkProps) => {
  const getClassName = ({ isActive }: { isActive: boolean }) =>
    isActive ? "active" : "inactive";

  if (!button) {
    return (
      <StyledLink {...props} className={getClassName}>
        {children}
      </StyledLink>
    );
  } else {
    return <StyledButton onClick={onClick}>{children}</StyledButton>;
  }
};
export default Link;
