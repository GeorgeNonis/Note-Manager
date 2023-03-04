import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { MdLabel } from "react-icons/md";
import { useOutsideHover } from "../../../hooks";
import styles from "./style.module.scss";

const Label = ({ label }: { label: string }) => {
  const [mouseOverLabel, setMouseOverLabel] = useState(false);
  const hoverOutsideLabel = useOutsideHover(() => setMouseOverLabel(false));
  return (
    <div
      ref={hoverOutsideLabel}
      className={styles.modalDiv}
      key={label}
      onMouseEnter={() => setMouseOverLabel(true)}
    >
      {mouseOverLabel ? <BiTrash /> : <MdLabel />}
      <input
        className={styles.modalEditInput}
        type="text"
        name={label}
        id={label}
        placeholder={label}
      />
    </div>
  );
};
export default Label;
