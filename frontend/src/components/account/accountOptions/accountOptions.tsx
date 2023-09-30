import { Link } from "react-router-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountOptions } from "./useAccountOptions";
import styles from "./styles.module.scss";
import { AccountOptionsProps } from "./interfaces";
import { Button } from "../../Atoms";

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
        <Button
          onClick={() => handlers.accountSettingsHandler()}
          css={{ w: "80%" }}
        >
          Manage your Account
        </Button>
        <Button onClick={handlers.logoutHandler} css={{ w: "80%" }}>
          Sign Out
        </Button>
      </div>
    </>
  );
};
export default AccountOptions;
