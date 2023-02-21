import styles from "../../styles/App.module.scss";

interface Props {
  errorMessage: string;
}

const ErrorFetching = ({ errorMessage }: Props) => {
  return <p className={styles.error}>{errorMessage}</p>;
};
export default ErrorFetching;
