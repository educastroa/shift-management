import styles from "./Login.module.scss";
import logo1 from "../../assets/company-logo.jpg";
import { useAuth } from '../../auth';

const Login = () => {
  const { login } = useAuth();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email, password } = event.target as HTMLFormElement;
    login({ email: email.value, password: password.value });
  };

  return (
    <div className={styles.loginContainer}>
      <div>
        <div>
          <img src={logo1} alt="logo" />
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formInput}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <button className={styles.loginButton} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;