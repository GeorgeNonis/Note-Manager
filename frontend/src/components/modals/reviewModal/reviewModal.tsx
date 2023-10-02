import { ReviewModalProps } from "./reviewModal.props";
import styles from "./style.module.scss";

const ReviewModal = ({ setReview, transitionState }: ReviewModalProps) => {
  const duration = 500;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  type Test = {
    [key: string]: { opacity: number };
  };

  const transitionStyles: Test = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
  };
  return (
    <div
      style={{
        ...defaultStyle,
        ...transitionStyles[transitionState as keyof Test],
      }}
      className={styles.backdrop}
      onClick={(e) => {
        if (!setReview) return;
        e.stopPropagation();
        setReview(false);
      }}
    ></div>
  );
};

export default ReviewModal;
