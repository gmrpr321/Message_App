import { useDispatch } from "react-redux";
import { authActions } from "../store";
import classes from "../styles/LoginPage.module.css";
function LoginPage() {
  const dispatch = useDispatch();
  const submithandler = () => {
    dispatch(authActions.loggedIn());
  };
  return (
    <main className={classes.container}>
      <div className={classes.msg}>
        <h1>Talk Easy</h1>
      </div>
      <section>
        <form onSubmit={submithandler} className={classes.form}>
          <div>
            <label htmlFor="username" className={classes.username}>
              Username
            </label>
            <input type="text" id="username" className={classes.input} />
          </div>
          <div>
            <label htmlFor="password" className={classes.password}>
              Password
            </label>
            <input type="password" id="password" className={classes.input} />
          </div>
          <button className={classes.submit}>Login</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;
