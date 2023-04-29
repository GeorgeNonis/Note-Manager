import { useState } from "react";
import styles from "./styles.module.scss";

const AccountInfo = () => {
  const [showPassword, setShowPassword] = useState(false);
  /*
   * Email
   * Password
   * Date of your account creation
   * Last time you edited a Note
   */
  return (
    <div className={styles.accountDetails}>
      <div className={styles.mainContent}>
        <fieldset>
          <legend>E-Mail</legend>
          <input type="text" value={"Georgenonis@gmail.com"} readOnly />
        </fieldset>
        <fieldset>
          <legend>Passowrd</legend>
          <input
            type={showPassword ? "password" : "text"}
            value={"Georgenonis@gmail.com"}
            readOnly
          />
        </fieldset>
        <fieldset>
          <legend>Date of registration</legend>
          <input type="text" value={"Georgenonis@gmail.com"} readOnly />
        </fieldset>
        <fieldset>
          <legend>Last time you edited a Note</legend>
          <input
            type="date"
            name="begin"
            placeholder="dd-mm-yyyy"
            min="1997-01-01"
            max="2030-12-31"
            //   value={"Georgenonis@gmail.com"}
            readOnly
          />
        </fieldset>
      </div>
      {/* <div>
        <img
          className={styles.profimg}
          src="https://cdn.discordapp.com/attachments/1056419450473152533/1090660819492147310/Neilyo77_background_image_where_theres_a_person_looking_for_hes_8875f0c2-ec7f-4826-8465-9c71c09fc32e.png"
          alt="user_picture"
        />
      </div> */}
    </div>
  );
};
export default AccountInfo;
