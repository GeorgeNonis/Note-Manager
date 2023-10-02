import { useAccountDelete } from "./useAccountDelete";
import { Button, Input } from "../../../Atoms";
import { AccountDeleteProps } from "./interfaces";
import styles from "./style.module.scss";

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
      <Input
        type="text"
        onChange={(e) => setConfirmEmail(e.target.value)}
        css={{
          textAlign: "center",
          w: "50%",
        }}
      />
      <Button
        disabled={!validMatch}
        onClick={deleteAccountHandler}
        variant={"danger"}
      >
        Delete Account
      </Button>
    </div>
  );
};
export default AccountDelete;
