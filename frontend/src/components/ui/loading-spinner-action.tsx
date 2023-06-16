import styles from "./styles.module.scss";

const LoadingSpinnerAction = () => {
  return (
    <div className={styles.loadingSpinnerAction}>
      {[...Array(4).keys()].map((e, i) => {
        return <span key={i}></span>;
      })}
    </div>
  );
};
export default LoadingSpinnerAction;
