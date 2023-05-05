import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccount } from "./useAccount";
import AccountOptions from "./accountOptions/accountOptions";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store";

const Account = () => {
  const { handlers, values } = useAccount();
  const { image } = useSelector((state: IRootState) => state.notes);

  return (
    <div className={styles.mainContent} ref={values.OnclickOutside}>
      <img
        className={styles.userImage}
        onClick={() => {
          handlers.setAccountSettings(!values.accountSettings);
        }}
        src={image}
        alt="user_picture"
      />
      {values.accountSettings && (
        <AccountOptions
          openAccountModal={handlers.setAccountSettings}
          image={image}
        />
      )}
    </div>
  );
};
export default Account;
