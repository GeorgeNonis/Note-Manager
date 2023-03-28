import { Dispatch, SetStateAction } from "react";
import styles from "./style.module.scss";

interface Props {
  setReview?: Dispatch<SetStateAction<boolean>>;
  transitionState: string;
}

const ReviewModal = ({ setReview, transitionState }: Props) => {
  const trans = `${
    transitionState === " entering" ? styles.backdrop : styles.removeBackdrop
  }`;
  const duration = 1000;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  type Test = {
    [key: string]: { opacity: number };
    // [key :string]: {opacity: number}
  };

  const transitionStyles: Test = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
  };
  console.log(trans);
  return (
    <div
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState as keyof Test],
      }}
      className={trans}
      onClick={(e) => {
        if (!setReview) return;
        e.stopPropagation();
        setReview(false);
      }}
    ></div>
  );
};

export default ReviewModal;
