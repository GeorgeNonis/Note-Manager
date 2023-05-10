import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import { useLogoutHandler } from "../hooks/useLogoutHandler";

const Error = () => {
  const { logoutHandler } = useLogoutHandler();
  return (
    <div className={styles.content}>
      <h2>Something went wrong</h2>
      <h3>
        We apologize for any inconvenience this may caused and we appreciate
        your understanding
      </h3>

      <Link to={"/"} onClick={logoutHandler}>
        Head back to the main page
      </Link>
    </div>
  );
};
export default Error;
