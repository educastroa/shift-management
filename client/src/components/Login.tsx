import React, { useState, ChangeEvent } from "react";

interface Inputs {
  email: string;
  password: string;
}


function Login() {
  const [inputs, setInputs] = useState<Array<Inputs>>([]);
  // const [shift, setShift] = useState<Shift[]>([]);

const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  const name = (event.target as HTMLInputElement).name;
  const value = (event.target as HTMLInputElement).value; 
  setInputs(values => ({...values, [name]: value}))
}


  return (
    <div>
      <form className="login-form">
        <label htmlFor="email">Email</label>

        <input
          type="email"
          placeholder="Email"
          name="email"
          required
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>

        <input
          type="password"
          placeholder="Password"
          name="password"
          required
          onChange={handleChange}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
