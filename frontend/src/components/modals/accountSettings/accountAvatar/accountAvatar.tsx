import ReactDOM from "react-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountAvatar } from "./useAccountAvatar";
import { DEFAULT_AVTR } from "../../../../config";
import AvatarModal from "../../avataroptions/avatarOptions";
import { AccountAvatarProps } from "./accountAvatar.props";
import { Button } from "../../../Atoms";
import { StyledCancelButton } from "./accountAvatar.styles";
import styles from "./styles.module.scss";

const AccountAvatar = ({ initialState }: AccountAvatarProps) => {
  const { values, handlers } = useAccountAvatar(initialState);
  const { image } = initialState;

  return (
    <>
      {ReactDOM.createPortal(
        <AvatarModal
          open={values.changeAvatar}
          closeModal={handlers.setChangeAvatar}
          avatarHandler={handlers.selectAvatarHandler}
        />,
        document.getElementById("avataroptions")!
      )}

      <div className={styles.mainContent}>
        <div className={styles.avatars}>
          <img
            style={{ background: `${values.changeAvatar ? "gray" : "none"}` }}
            onMouseEnter={() => handlers.setHoverOnAvatar(true)}
            onMouseLeave={() => handlers.setHoverOnAvatar(false)}
            onClick={handlers.setChangeAvatarHandler}
            className={
              !values.default_avatar &&
              !values.changeAvatar &&
              !values.saveAvatar
                ? `${styles.avatar} ${styles.test}`
                : styles.avatar
            }
            src={image}
            alt="user_picture"
          />
          {values.hoverOnAvatar && (
            <MdOutlineAddAPhoto
              onClick={() => handlers.setChangeAvatar((prev) => !prev)}
              onMouseEnter={() => handlers.setHoverOnAvatar(true)}
              className={
                !values.default_avatar &&
                !values.changeAvatar &&
                !values.saveAvatar
                  ? `${styles.svg} ${styles.test}`
                  : styles.svg
              }
            />
          )}
          <img
            style={{ zIndex: `${values.twikZindex ? 12 : 1}` }}
            onClick={() => handlers.setChangeAvatar(true)}
            className={
              !values.default_avatar &&
              !values.changeAvatar &&
              !values.saveAvatar
                ? `${styles.selectedAvatar} ${styles.test1}`
                : styles.selectedAvatar
            }
            src={values.selectedAvatar as string}
            alt={DEFAULT_AVTR}
          />
          {!values.default_avatar &&
            !values.changeAvatar &&
            !values.saveAvatar && (
              <StyledCancelButton
                onClick={() => handlers.setSelectedAvatar(DEFAULT_AVTR)}
              >
                Cancel
              </StyledCancelButton>
            )}
        </div>
        <div className={styles.actions}>
          <Button onClick={() => handlers.setChangeAvatar(true)}>
            Change Avatar
          </Button>
          <Button
            disabled={values.default_avatar || values.saveAvatar}
            onClick={handlers.saveAvatarHandler}
          >
            Save
          </Button>
        </div>
      </div>
    </>
  );
};
export default AccountAvatar;
