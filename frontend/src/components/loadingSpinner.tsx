import styles from "../styles/loadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.content}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};
export default LoadingSpinner;
