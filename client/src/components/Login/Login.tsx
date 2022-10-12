import React, { useState, ChangeEvent, useContext } from "react";
import { UserContext } from "../../context";
import axios from "axios";
import styles from "./Login.module.scss";
import logo1 from "../../assets/company-logo.jpg";

interface Inputs {
  email?: string;
  password?: string;
}

function Login() {
  const [inputs, setInputs] = useState<Inputs>();
  const userContext = useContext(UserContext)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    setInputs({ ...inputs, [name]: value });
  };


  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    axios.post("/api/login", inputs).then((res) => {
      const email = res.data.email
      userContext.setUser({email})
    });
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
