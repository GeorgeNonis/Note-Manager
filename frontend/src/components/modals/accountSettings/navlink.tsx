import { StyledNavLink } from "./accountSettings.styles";
import { NavLinkProps } from "./interfaces";

const NavLinkCompo = ({ text, active, onClick }: NavLinkProps) => {
  return (
    <StyledNavLink isActive={active === text} onClick={() => onClick(text)}>
      {text}
    </StyledNavLink>
  );
};
export default NavLinkCompo;
