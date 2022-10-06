import React, { useState, ChangeEvent } from "react";
import styles from "./Login.module.scss";
import logo1 from "../../assets/company-logo.jpg"


interface Inputs {
  email?: string;
  password?: string;
}

function Login() {
  const [inputs, setInputs] = useState<Inputs>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <div className={styles.loginContainer}>
      <div>
        <div >
        <img src={logo1} alt='logo'/>
        </div>
        <form >
          <div className={styles.formInput}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div className={styles.formInput}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
