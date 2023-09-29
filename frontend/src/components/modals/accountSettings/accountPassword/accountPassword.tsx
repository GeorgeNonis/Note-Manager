import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useAccountPassword } from "./useAccountPassword";
import styles from "./styles.module.scss";
import { AccountPasswordProps } from "./interfaces";

const AccountPassword = ({ initialState }: AccountPasswordProps) => {
  const { handlers, values } = useAccountPassword({ initialState });
  return (
    <div className={styles.mainContent}>
      <form onSubmit={handlers.onSumbithandler}>
        <fieldset>
          <legend>
            Current Passowrd
            {values.validCurrentPassword && values.currentPassword && (
              <span
                className={
                  values.validCurrentPassword ? styles.show : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {!values.validCurrentPassword && values.currentPassword && (
              <span
                className={
                  !values.validCurrentPassword && values.currentPassword
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleX className={styles.xmark} />
              </span>
            )}
          </legend>
          <input
            type="text"
            id="currentPassword"
            value={values.currentPassword}
            onChange={(e) => handlers.setCurrentPassword(e.target.value)}
            onFocus={() => handlers.setFocusCurrentPassword(true)}
            onBlur={() => handlers.setFocusCurrentPassword(false)}
            required
            aria-invalid={values.validCurrentPassword ? true : false}
            aria-describedby="crp"
          />
          <p
            style={{
              opacity: `${
                values.focusCurrentPassword &&
                !values.validCurrentPassword &&
                values.currentPassword
                  ? 1
                  : 0
              }`,
            }}
            ref={values.errRef}
            id="crp"
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <span>You have to enter your Current Password!</span>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            New Passowrd
            {values.validNewPassword && values.newPassword && (
              <span
                className={
                  values.validNewPassword && values.newPassword
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {!values.validNewPassword && values.newPassword && (
              <span
                className={
                  !values.validNewPassword && values.newPassword
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleX className={styles.xmark} />
              </span>
            )}
          </legend>
          <input
            type="text"
            id="newpwd"
            value={values.newPassword}
            onChange={(e) => handlers.setNewPassword(e.target.value)}
            onFocus={() => handlers.setFocusNewPassword(true)}
            onBlur={() => handlers.setFocusNewPassword(false)}
            required
            aria-invalid={values.validNewPassword ? true : false}
            aria-describedby="pwdnote"
          />
          <p
            style={{
              opacity: `${
                values.focusNewPassword &&
                !values.validNewPassword &&
                values.newPassword
                  ? 1
                  : 0
              }`,
            }}
            ref={values.errRef}
            id="pwdnote"
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <span>
              Minimum eight characters, at least one uppercase letter, one
              lowercase letter, one number and one special character
            </span>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Confirm Passowrd
            {values.validMatch && values.validNewPassword && (
              <span
                className={
                  values.validMatch && values.validNewPassword
                    ? styles.show
                    : styles.hide
                }
              >
                <TbCircleCheck className={styles.correct} />
              </span>
            )}
            {!values.validMatch && (
              <span className={styles.show}>
                <TbCircleX className={styles.xmark} />
              </span>
            )}
          </legend>
          <input
            type="text"
            id="confirmpwd"
            value={values.confirmNewPassword}
            onChange={(e) => handlers.setConfirmNewPassword(e.target.value)}
            onFocus={() => handlers.setFocusConfirmPassword(true)}
            onBlur={() => handlers.setFocusConfirmPassword(false)}
            required
            aria-invalid={
              values.validMatch && values.validNewPassword ? true : false
            }
            aria-describedby="confirmpwd"
          />
          <p
            style={{
              opacity: `${
                !values.validMatch && values.focusConfirmPassword ? 1 : 0
              }`,
            }}
            ref={values.errRef}
            id="confirmpwd"
            className={styles.show}
          >
            <AiOutlineInfoCircle />
            <span> Must match your New Password</span>
          </p>
        </fieldset>
        <button
          className={styles.updateButton}
          disabled={!values.validInputs}
          type="submit"
          style={{
            cursor: `${!values.validInputs ? "not-allowed" : "pointer"}`,
          }}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};
export default AccountPassword;
