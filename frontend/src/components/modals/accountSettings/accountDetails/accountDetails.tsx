import { useState } from "react";
import styles from "./styles.module.scss";

const AccountDetails = () => {
  const [showPassword, setShowPassword] = useState(false);
  /*
   * Email
   * Password
   * Date of your account creation
   * Last time you edited a Note
   * Avatar
   */
  return (
    <div className={styles.accountDetails}>
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
  );
};
export default AccountDetails;
