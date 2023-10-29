import { StyledBackdrop } from "../Molecules/Modal/modal.styles";
import styles from "./styles.module.scss";

const LoadingSpinner = ({
  open = true,
  innerModal = false,
}: {
  open?: boolean;
  innerModal?: boolean;
}) => {
  return (
    <>
      <StyledBackdrop isOpen={open} innerModal={innerModal} />
      <div className={styles.loadingSpinner} style={{ zIndex: 800 }}>
        {[...Array(4).keys()].map((e, i) => {
          return <span key={i}></span>;
        })}
      </div>
    </>
  );
};
export default LoadingSpinner;
