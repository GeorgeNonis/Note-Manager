import { NavLink } from "react-router-dom";
import { NavLinkProps } from "./interfaces";

const NavLinkCompo = ({ text, active, styles, onClick }: NavLinkProps) => {
  return (
    <h3
      className={active === text ? styles.active : styles.inactive}
      onClick={() => onClick(text)}
    >
      {text}
    </h3>
  );
};
export default NavLinkCompo;

{
  /* <NavLink
            to={"/notes"}
            end
            role={"button"}
            className={({ isActive }) => {
              return isActive ? styles.active : styles.inactive;
            }}
          >
            <FaRegLightbulb />
            <h3>Notes</h3>
          </NavLink> */
}
