import { ErrorWithFeaturesProps } from "./interfaces";
import styles from "./styles.module.scss";

const ErrorWithFeature = ({ message }: ErrorWithFeaturesProps) => {
  return <h3 className={styles.errorWithFeature}>{message}</h3>;
};
export default ErrorWithFeature;
