import { Link } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountOptions } from "./useAccountOptions";
import styles from "./styles.module.scss";
import { AccountOptionsProps } from "./interfaces";

const AccountOptions = ({ openAccountModal, image }: AccountOptionsProps) => {
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
          <img className={styles.profimg} src={image} alt="user_picture" />
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
