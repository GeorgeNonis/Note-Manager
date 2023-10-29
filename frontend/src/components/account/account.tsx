import { useAccount } from "./useAccount";
import AccountOptions from "./accountOptions/accountOptions";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";
import { StyledContent, StyledImage } from "./account.styles";

const Account = () => {
  const { handlers, values } = useAccount();
  const { image } = useSelector((state: IRootState) => state.notes);

  return (
    <StyledContent ref={values.OnclickOutside}>
      <StyledImage
        loading="lazy"
        onClick={handlers.accountSettingsHandler}
        src={image}
        alt="user_picture"
      />
      {values.accountSettings && (
        <AccountOptions
          accountSettingsHandler={handlers.accountSettingsHandler}
          image={image}
        />
      )}
    </StyledContent>
  );
};
export default Account;
