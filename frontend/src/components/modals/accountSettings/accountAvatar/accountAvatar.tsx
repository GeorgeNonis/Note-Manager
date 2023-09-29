import ReactDOM from "react-dom";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { useAccountAvatar } from "./useAccountAvatar";
import { DEFAULT_AVTR } from "../../../../config";
import { AvatarOptions } from "../../../index";
import styles from "./styles.module.scss";
import { InitialState } from "../../../../store/interfaces";
import { Transition } from "react-transition-group";

interface AccountAvatarProps {
  initialState: InitialState;
}

const AccountAvatar = ({ initialState }: AccountAvatarProps) => {
  const { values, handlers } = useAccountAvatar(initialState);
  const { image } = initialState;

  return (
    <>
      <Transition
        in={values.changeAvatar}
        timeout={500}
        mountOnEnter
        unmountOnExit
      >
        {(transState) =>
          ReactDOM.createPortal(
            <AvatarOptions
              transitionState={transState}
              closeModal={handlers.setChangeAvatar}
              avatarHandler={handlers.selectAvatarHandler}
            />,
            document.getElementById("avataroptions")!
          )
        }
      </Transition>

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
              <button
                onClick={() => handlers.setSelectedAvatar(DEFAULT_AVTR)}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            )}
        </div>
        <div className={styles.actions}>
          <button onClick={() => handlers.setChangeAvatar(true)}>
            Change Avatar
          </button>
          <button
            disabled={values.default_avatar || values.saveAvatar}
            onClick={handlers.saveAvatarHandler}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
export default AccountAvatar;
