import { CheckBoxProps } from "./interfaces";
import styles from "./styles.module.scss";
export const CheckBox = ({ obj, handlers, id }: CheckBoxProps) => {
  const { string, style } = handlers.isLabelChecked(obj, id);
  const { label } = obj;
  return (
    <div
      className={styles.label}
      role="menuitemcheckbox"
      key={label}
      aria-checked={string as any}
      onClick={(e) => handlers.tickLabelHandler(e, label, id)}
    >
      <div className={style}></div>
      <div>{label}</div>
    </div>
  );
};
