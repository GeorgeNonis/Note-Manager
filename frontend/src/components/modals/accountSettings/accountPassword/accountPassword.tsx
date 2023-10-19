import { useAccountPassword } from "./useAccountPassword";
import styles from "./styles.module.scss";
import { Grid, InputField } from "../../../Molecules";
import { Button } from "../../../Atoms";

const AccountPassword = () => {
  const {
    confirmPasswordProps,
    currentPasswordProps,
    newPasswordProps,
    onSubmitHandler,
    validInputs,
    loading,
  } = useAccountPassword();
  return (
    <div className={styles.mainContent}>
      <Grid>
        <InputField {...currentPasswordProps} />
        <InputField {...newPasswordProps} />
        <InputField {...confirmPasswordProps} />
        <Button
          disabled={!validInputs}
          loading={loading}
          onClick={onSubmitHandler}
        >
          Update Password
        </Button>
      </Grid>
    </div>
  );
};
export default AccountPassword;
