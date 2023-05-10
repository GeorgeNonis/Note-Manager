import { useState } from "react";
import styles from "./styles.module.scss";
import { InitialState } from "../../../../store/interfaces";

interface AccountInfoProps {
  initialState: InitialState;
}

const AccountInfo = ({ initialState }: AccountInfoProps) => {
  const { email, date, lastTimeDitedNote } = initialState;
  return (
    <div className={styles.accountDetails}>
      <div className={styles.mainContent}>
        <fieldset>
          <legend>E-Mail</legend>
          <input type="text" value={email} readOnly />
        </fieldset>
        <fieldset>
          <legend>Date of registration</legend>
          <input type="date" value={date} readOnly />
        </fieldset>
        <fieldset>
          <legend>Last time you edited a Note</legend>
          <input type="date" value={lastTimeDitedNote} readOnly />
        </fieldset>
      </div>
    </div>
  );
};
export default AccountInfo;
