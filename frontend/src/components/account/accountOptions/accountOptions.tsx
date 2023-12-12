import { useAccountOptions } from "./useAccountOptions";
import { AccountOptionsProps } from "./interfaces";
import { Button } from "../../Atoms";
import { StyledContent, StyledProfileImage } from "./accountOptions.styles";
// import { Grid } from "../../Molecules";
import { Grid } from "noniscomponents";

const AccountOptions = ({
  accountSettingsHandler,
  image,
}: AccountOptionsProps) => {
  const { handlers } = useAccountOptions({ accountSettingsHandler });

  return (
    <>
      <StyledContent>
        <Grid>
          <StyledProfileImage src={image} alt="user_picture" />
        </Grid>
        <Button
          onClick={() => handlers.accountSettingsHandler()}
          css={{ w: "80%" }}
        >
          Manage your Account
        </Button>
        <Button onClick={handlers.logoutHandler} css={{ w: "80%" }}>
          Sign Out
        </Button>
      </StyledContent>
    </>
  );
};
export default AccountOptions;
