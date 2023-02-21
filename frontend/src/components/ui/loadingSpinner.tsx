import styles from "../../styles/loadingSpinner.module.scss";

const LoadingSpinner = () => {
  return (
    <div className={styles.content}>
      {[...Array(4).keys()].map((e, i) => {
        return <span key={i}></span>;
      })}
    </div>
  );
};
export default LoadingSpinner;
