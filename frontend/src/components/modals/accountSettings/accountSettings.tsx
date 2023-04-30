import { ReactElement, useState } from "react";
import { AccountSettingsProps } from "./interfaces";
import { useDispatch } from "react-redux";
import { openAccountSettings } from "../../../store/display-state-slice";
import styles from "./styles.module.scss";
import * as Components from "../../index";

const AccountSettings = ({}: AccountSettingsProps) => {
  const [option, setOption] = useState<string>("Info");
  const dispatch = useDispatch();

  type Key = {
    [key: string]: {
      el: ReactElement<any>;
    };
  };

  const options: Key = {
    Info: {
      el: <Components.AccountInfo />,
    },
    Delete: {
      el: <Components.AccountDelete />,
    },
    Avatar: {
      el: <Components.AccountAvatar />,
    },
    Password: {
      el: <p>password</p>,
    },
  };

  console.log(option);
  console.log(options[option]);
  return (
    <>
      <div
        className={styles.backdrop}
        onClick={() => dispatch(openAccountSettings())}
      ></div>
      <div className={styles.modalContent}>
        <h1 className={styles.title}>Account Settings</h1>
        <div className={styles.content}>
          <div className={styles.col1}>
            <Components.NavLinkCompo
              onClick={setOption}
              styles={styles}
              text="Info"
              active={option}
              key={1}
            />
            <Components.NavLinkCompo
              onClick={setOption}
              styles={styles}
              text="Avatar"
              active={option}
              key={2}
            />
            <Components.NavLinkCompo
              onClick={setOption}
              styles={styles}
              text="Password"
              active={option}
              key={3}
            />
            <Components.NavLinkCompo
              onClick={setOption}
              styles={styles}
              text="Delete"
              active={option}
              key={4}
            />
          </div>
          <div className={styles.col2}>{options[option as keyof Key].el}</div>
        </div>
      </div>
    </>
  );
};
export default AccountSettings;

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
