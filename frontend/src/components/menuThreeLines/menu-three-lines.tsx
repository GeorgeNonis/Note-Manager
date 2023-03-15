import { AiOutlineMenu } from "react-icons/ai";
import { useMenuThreeLines } from "./useMenuThreeLines";
import styles from "./styles.module.scss";

const MenuThreeLines = () => {
  const { BarIsOn, toggleMenuThreeLines } = useMenuThreeLines();
  return (
    <AiOutlineMenu
      className={styles.menuThreeLines}
      onClick={toggleMenuThreeLines}
    />
  );
};
export default MenuThreeLines;
