import AccountActions from "./accountActions/accountActions";
import AccountDetails from "./accountDetails";
import { AccountSettingsProps } from "./interfaces";
import styles from "./styles.module.scss";
import { useAccountSettings } from "./useAccountSettings";

const AccountSettings = ({ closeModal }: AccountSettingsProps) => {
  const { setShowDetails, showDetails } = useAccountSettings();
  /**
   *
   * Be able to view the following
   *
   * Avatar
   * Email
   * Password
   * Date of your account creation
   * Last time you edited a Note
   *
   *
   * Options to include the following
   *
   * Change Password
   * Change Picutre/Avatar
   * Delete Account
   */
  return (
    <>
      <div className={styles.backdrop} onClick={() => closeModal(false)}></div>
      <div className={styles.modalContent}>
        <h1>Account Settings</h1>
        <div className={styles.content}>
          <div className={styles.col1}>
            <h3 onClick={() => setShowDetails((prev) => !prev)}>Account</h3>
            <h3 onClick={() => setShowDetails((prev) => !prev)}>Options</h3>
          </div>
          <div className={styles.col2}>
            {showDetails ? <AccountDetails /> : <AccountActions />}
          </div>
        </div>
      </div>
    </>
  );
};
export default AccountSettings;
