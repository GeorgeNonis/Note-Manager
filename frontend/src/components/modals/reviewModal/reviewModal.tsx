import { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";

interface Props {
  setReview: Dispatch<SetStateAction<boolean>>;
}

const ReviewModal = ({ setReview }: Props) => {
  return (
    <div
      className={styles.backdrop}
      onClick={() => {
        setReview(false);
      }}
    ></div>
  );
};

export default ReviewModal;
