import { MdFormatColorReset } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateNoteColorHttp } from "../../../api/api";
import { setColor } from "../../../store/notesSlice";
import styles from "../../../styles/colorPalette.module.scss";

interface Props {
  closePalette: (value: boolean) => void;
  id: string;
  pinned: boolean;
}

const ColorPallete = ({ closePalette, id, pinned }: Props) => {
  const dispatch = useDispatch();

  const colorGenerator = () => {
    return (
      "#" +
      Math.floor(Math.random() * (0xffffff + 1))
        .toString(16)
        .padStart(6, "0") +
      "f9"
    );
  };

  const displayHandler = async (value: string) => {
    closePalette(false);
    dispatch(setColor({ value, id, pinned }));
    await updateNoteColorHttp(value, id, pinned);
  };

  const colors = [
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
    colorGenerator(),
  ];
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
