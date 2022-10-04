import { useState } from "react";

interface User {
  first_name: string;
  last_name: string;
}

enum ShiftTypes {
  DAY = "day",
  AFTERNOON = "afternoon",
  NIGHT = "night",
}

type Shift = {
  date: Date;
  type: `${ShiftTypes}`;
};

function Login() {
  const [user, setUser] = useState<Array<User>>([]);
  const [shift, setShift] = useState<Shift[]>([]);

  return (
    <div>
      {user.length > 0 && user.map((item) => <h1>{item.first_name}</h1>)}
    </div>
  );
}

export default Login;
