import Button from "../../../../../../../components/Atoms/Button";
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
        <Button
          disabled={requestState}
          onClick={() => setChangeAvatar(true)}
          type="button"
        >
          Change
        </Button>
        <Button
          disabled={requestState}
          onClick={() => setDefaultAvatar(true)}
          type="button"
        >
          Remove
        </Button>
      </div>
    </fieldset>
  );
};
export default ChangeField;
