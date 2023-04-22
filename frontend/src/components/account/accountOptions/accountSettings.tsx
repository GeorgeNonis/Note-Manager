import styles from "./styles.module.scss";

const AccountOptions = () => {
  return (
    <div className={styles.mainContent}>
      <div className={styles.profpicture}>
        <img
          className={styles.profimg}
          src="https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png"
          alt="user_picture"
        />
      </div>
      <button className={styles.manageaccount}>Manage your Account</button>
      <button className={styles.signoutbutton}>Sign Out</button>
    </div>
  );
};
export default AccountOptions;
