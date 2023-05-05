import { TbCircleX, TbCircleCheck } from "react-icons/tb";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { useAccountPassword } from "./useAccountPassword";
import { InitialState } from "../../../../store/interfaces";
import styles from "./styles.module.scss";

interface AccountPasswordProps {
  initialState: InitialState;
}

const AccountPassword = ({ initialState }: AccountPasswordProps) => {
  const { handlers, values } = useAccountPassword();
  console.log(values.validInputs);
  return (
    <div className={styles.mainContent}>
      <form onSubmit={handlers.onSumbitHandler}>
        <fieldset>
          <legend>
            Current Passowrd
            <span
              className={
                values.validCurrentPassword ? styles.show : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                !values.validCurrentPassword && values.currentPassword
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <input
            type="text"
            onChange={(e) => handlers.setCurrentPassword(e.target.value)}
            onFocus={() => handlers.setFocusCurrentPassword(true)}
            onBlur={() => handlers.setFocusCurrentPassword(false)}
            required
            aria-invalid={values.validCurrentPassword ? true : false}
            aria-describedby="currentPassword"
          />
          <p
            ref={values.errRef}
            id="currentPassword"
            className={
              values.focusCurrentPassword &&
              !values.validCurrentPassword &&
              values.currentPassword
                ? styles.show
                : styles.hide
            }
          >
            <AiOutlineInfoCircle />
            <h3>You have to enter your Current Password!</h3>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            New Passowrd
            <span
              className={
                values.validNewPassword && values.newPassword
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                !values.validNewPassword && values.newPassword
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <input
            type="text"
            onChange={(e) => handlers.setNewPassword(e.target.value)}
            onFocus={() => handlers.setFocusNewPassword(true)}
            onBlur={() => handlers.setFocusNewPassword(false)}
            required
            aria-invalid={values.validNewPassword ? true : false}
            aria-describedby="pwdnote"
          />
          <p
            ref={values.errRef}
            id="pwdnote"
            className={
              values.focusNewPassword &&
              !values.validNewPassword &&
              values.newPassword
                ? styles.show
                : styles.hide
            }
          >
            <AiOutlineInfoCircle />
            <h3>
              Minimum eight characters, at least one uppercase letter, one
              lowercase letter, one number and one special character
            </h3>
          </p>
        </fieldset>
        <fieldset>
          <legend>
            Confirm Passowrd
            <span
              className={
                values.validMatch && values.validNewPassword
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleCheck className={styles.correct} />
            </span>
            <span
              className={
                (!values.validMatch && !values.validNewPassword) ||
                values.newPassword
                  ? styles.show
                  : styles.hide
              }
            >
              <TbCircleX className={styles.xmark} />
            </span>
          </legend>
          <input
            type="text"
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
            ref={values.errRef}
            id="confirmpwd"
            className={
              values.focusConfirmPassword &&
              !values.validNewPassword &&
              values.newPassword
                ? styles.show
                : styles.hide
            }
          >
            <AiOutlineInfoCircle />
            <h3> Must match your New Password</h3>
          </p>
        </fieldset>
        <button className={styles.updateButton} disabled={!values.validInputs}>
          Update Password
        </button>
      </form>
    </div>
  );
};
export default AccountPassword;
