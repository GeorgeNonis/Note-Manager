import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountAvatar } from "./useAccountAvatar";
import styles from "./styles.module.scss";

const AccountAvatar = () => {
  const { changeAvatar, hoverOnAvatar, setChangeAvatar, setHoverOnAvatar } =
    useAccountAvatar();
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
    <div className={styles.mainContent}>
      <img
        onMouseEnter={() => setHoverOnAvatar(true)}
        onMouseLeave={() => setHoverOnAvatar(false)}
        onClick={() => setChangeAvatar((prev) => !prev)}
        className={
          !changeAvatar ? `${styles.avatar} ${styles.test}` : styles.avatar
        }
        src="https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png"
        alt="user_picture"
      />
      {hoverOnAvatar && (
        <MdOutlineAddAPhoto
          onMouseEnter={() => setHoverOnAvatar(true)}
          className={
            !changeAvatar ? `${styles.svg} ${styles.test}` : styles.svg
          }
        />
      )}
      <img
        onClick={() => setChangeAvatar((prev) => !prev)}
        className={
          !changeAvatar
            ? `${styles.selectedAvatar} ${styles.test1}`
            : styles.selectedAvatar
        }
        // className={styles.avatar}
        src="../../../../../images/default_avatar.png"
        alt="user_picture"
      />
      {/* {changeAvatar && (
        <img
          onClick={() => setChangeAvatar(false)}
          className={styles.avatar}
          src="../../../../../images/default_avatar.png"
          alt="user_picture"
        />
      )} */}
    </div>
  );
};
export default AccountAvatar;
