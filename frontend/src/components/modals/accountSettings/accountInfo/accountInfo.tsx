import Info from "./info";
import { AccountInfoProps } from "./accountInfo.props";
import styles from "./styles.module.scss";

const AccountInfo = ({ initialState }: AccountInfoProps) => {
  const { email, date, lastTimeDitedNote } = initialState;
  const info = [
    { name: "E-Mail", type: "text", value: email },
    { name: "Date of registration", value: date },
    { name: "Last time you edited a Note", value: lastTimeDitedNote },
  ];
  return (
    <div className={styles.accountDetails}>
      <div className={styles.mainContent}>
        {info.map((inf) => (
          <Info {...inf} />
        ))}
      </div>
    </div>
  );
};
export default AccountInfo;
