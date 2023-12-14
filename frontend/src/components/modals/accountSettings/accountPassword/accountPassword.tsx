import { useAccountPassword } from "./useAccountPassword";
import { InputField } from "../../../Molecules";
import { Grid, Button } from "noniscomponents";

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
    <Grid>
      <Grid>
        <InputField {...currentPasswordProps} />
        <InputField {...newPasswordProps} />
        <InputField {...confirmPasswordProps} />
        <Button
          disabled={!validInputs}
          loading={loading}
          onClick={onSubmitHandler}
          theme={"#f26716"}
        >
          Update Password
        </Button>
      </Grid>
    </Grid>
  );
};
export default AccountPassword;
