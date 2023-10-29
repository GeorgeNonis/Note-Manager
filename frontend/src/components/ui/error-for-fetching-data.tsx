import { ErrorFetchingProps } from "./interfaces";
import styles from "./styles.module.scss";

const ErrorFetching = ({ errorMessage }: ErrorFetchingProps) => {
  return <p className={styles.error}>{errorMessage}</p>;
};
export default ErrorFetching;
