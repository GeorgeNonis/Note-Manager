import styles from "../../../styles.module.scss";
import { ChangeFieldProps } from "./changeField.props";

const ChangeField = ({
  default_avatar_pic,
  avatar,
  default_avatar,
  requestState,
  setChangeAvatar,
  setDefaultAvatar,
}: ChangeFieldProps) => {
  return (
    <fieldset className={styles.fieldsetimage}>
      <img
        src={!default_avatar ? avatar : default_avatar_pic}
        alt="avatar_image"
      />
      <div className={styles.fieldsetdiv}>
        <button
          disabled={requestState}
          style={{
            cursor: requestState ? "not-allowed" : "pointer",
          }}
          onClick={() => setChangeAvatar(true)}
          type="button"
        >
          Change
        </button>
        <button
          disabled={requestState}
          style={{
            cursor: requestState ? "not-allowed" : "pointer",
          }}
          onClick={() => setDefaultAvatar(true)}
          type="button"
        >
          Remove
        </button>
      </div>
    </fieldset>
  );
};
export default ChangeField;
