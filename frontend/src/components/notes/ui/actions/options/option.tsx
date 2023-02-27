import { OptionProps } from "./interfaces";
import styles from "../../../note.module.scss";

const Option = ({ children, text, onClick, textStyle }: OptionProps) => {
  return (
    <div role={"button"} onClick={onClick} className={styles.option}>
      {children}
      <h3 className={textStyle}>{text}</h3>
    </div>
  );
};
export default Option;
