import ReactDom from "react-dom";
import { Link } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountOptions } from "./useAccountOptions";
import styles from "./styles.module.scss";
import { AccountOptionsProps } from "./interfaces";
import AccountSettings from "../../modals/accountSettings/accountSettings";

const AccountOptions = ({ openAccountModal }: AccountOptionsProps) => {
  const { handlers, values } = useAccountOptions({ openAccountModal });

  return (
    <>
      <div className={styles.mainContent}>
        <div
          className={styles.profpicture}
          onMouseEnter={() => handlers.setChangePicture(true)}
          onMouseLeave={() => handlers.setChangePicture(false)}
        >
          {values.changePicutre && (
            <MdOutlineAddAPhoto className={styles.svg} />
          )}
          <img
            className={styles.profimg}
            src="https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png"
            alt="user_picture"
          />
        </div>
        <button
          className={styles.manageaccount}
          onClick={() => handlers.accountSettingsHandler()}
        >
          Manage your Account
        </button>
        <Link to={"/"} className={styles.signoutbutton}>
          Sign Out
        </Link>
      </div>
    </>
  );
};
export default AccountOptions;
