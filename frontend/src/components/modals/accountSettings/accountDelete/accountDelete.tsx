import { Link } from "react-router-dom";
import { useAccountDelete } from "./useAccountDelete";
import { InitialState } from "../../../../store/interfaces";
import styles from "./style.module.scss";
interface AccountDeleteProps {
  initialState: InitialState;
}
const AccountDelete = ({ initialState }: AccountDeleteProps) => {
  const { email } = initialState;
  const { validMatch, setConfirmEmail, deleteAccountHandler } =
    useAccountDelete({ email });
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
