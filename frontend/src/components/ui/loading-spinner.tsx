import { StyledBackdrop } from "../Molecules/Modal/modal.styles";
import styles from "./styles.module.scss";

const LoadingSpinner = ({ open = true }: { open?: boolean }) => {
  return (
    <>
      <StyledBackdrop isOpen={open} />
      <div className={styles.loadingSpinner} style={{ zIndex: 800 }}>
        {[...Array(4).keys()].map((e, i) => {
          return <span key={i}></span>;
        })}
      </div>
    </>
  );
};
export default LoadingSpinner;
