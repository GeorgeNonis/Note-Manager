import styles from "./styles.module.scss";

const LoginPage = () => {
  return (
    <main className={styles.main}>
      <form className={styles.form}>
        <fieldset>
          <legend>E-Mail</legend>
          <input type="email" id="email" name="email" />
        </fieldset>
        <fieldset>
          <legend>E-Mail</legend>
          <input type="password" id="password" name="password" />
        </fieldset>
      </form>
    </main>
  );
};
export default LoginPage;
