import { MdFormatColorReset } from "react-icons/md";
import { ColorPalleteProps } from "./interfaces";
import { useColorPallete } from "./useColorPallete";
import styles from "./styles.module.scss";

const ColorPallete = ({ setDisplayPalette, id, pinned }: ColorPalleteProps) => {
  const { displayHandler, colors } = useColorPallete({
    setDisplayPalette,
    id,
    pinned,
  });
  return (
    <div className={styles.content}>
      <div
        className={styles.colors}
        onClick={() => displayHandler("transparent")}
      >
        <MdFormatColorReset />
      </div>
      {colors.map((value, i) => {
        return (
          <div
            onClick={() => displayHandler(value)}
            key={i}
            style={{ background: value }}
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
