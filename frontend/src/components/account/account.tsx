import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccount } from "./useAccount";
import AccountOptions from "./accountOptions/accountSettings";
import styles from "./styles.module.scss";

const Account = () => {
  const { handlers, values } = useAccount();

  return (
    <div className={styles.mainContent} ref={values.OnclickOutside}>
      <img
        className={styles.userImage}
        onClick={() => {
          handlers.setAccountSettings(!values.accountSettings);
        }}
        src="https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png"
        alt="user_picture"
      />
      {values.accountSettings && <AccountOptions />}
    </div>
  );
};
export default Account;
