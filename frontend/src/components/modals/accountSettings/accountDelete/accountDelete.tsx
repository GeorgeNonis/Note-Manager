import { Link } from "react-router-dom";
import { useAccountDelete } from "./useAccountDelete";
import styles from "./style.module.scss";

const AccountDelete = () => {
  const { validMatch, setConfirmEmail, deleteAccountHandler } =
    useAccountDelete();
  console.log(validMatch);
  return (
    <div className={styles.mainContent}>
      <p>
        Are you sure you want to delete your whole Account? <br />
        You will lose all your notes permantently
      </p>

      <p>To confirm fill the box below with your email</p>
      <input type="text" onChange={(e) => setConfirmEmail(e.target.value)} />
      <button disabled={!validMatch} onClick={deleteAccountHandler}>
        Delete Account
      </button>
    </div>
  );
};
export default AccountDelete;
