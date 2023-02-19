import { MdFormatColorReset } from "react-icons/md";
import styles from "../styles/colorPalette.module.scss";

const ColorPallete = () => {
  const colorGenerator = () => {
    return (
      "#" +
      Math.floor(Math.random() * (0xffffff + 1))
        .toString(16)
        .padStart(6, "0") +
      "5d"
    );
  };
  return (
    <div className={styles.content}>
      <div className={styles.colors}>
        <MdFormatColorReset />
      </div>
      {[...Array(4).keys()].map((e, i) => {
        return (
          <div
            key={i}
            style={{ background: colorGenerator() }}
            className={styles.colors}
          >
            {" "}
          </div>
        );
      })}
    </div>
  );
};
export default ColorPallete;
