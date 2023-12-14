import { useAccountOptions } from "./useAccountOptions";
import { AccountOptionsProps } from "./interfaces";
import { StyledContent, StyledProfileImage } from "./accountOptions.styles";
import { Button, Grid } from "noniscomponents";

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
          css={{ w: "80%", h: 30 }}
          size={"s"}
          theme={"#f26716"}
        >
          Manage your Account
        </Button>
        <Button
          onClick={handlers.logoutHandler}
          css={{ w: "80%", h: 30 }}
          size={"s"}
          theme={"#f26716"}
        >
          Sign Out
        </Button>
      </StyledContent>
    </>
  );
};
export default AccountOptions;
