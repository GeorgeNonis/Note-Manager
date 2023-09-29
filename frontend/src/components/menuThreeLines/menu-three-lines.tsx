import { AiOutlineMenu } from "react-icons/ai";
import { useMenuThreeLines } from "./useMenuThreeLines";
import styles from "./styles.module.scss";

const MenuThreeLines = () => {
  const { BarIsOn, toggleMenuThreeLines } = useMenuThreeLines();
  return (
    <div className={styles.menuThreeLines}>
      <AiOutlineMenu className={styles.burger} onClick={toggleMenuThreeLines} />
      <img
        src="./googlekeeplogo.png"
        alt="notes_logo"
        className={styles.logo}
      />
      <h3 className={styles.title}>Your Note's</h3>
    </div>
  );
};
export default MenuThreeLines;
