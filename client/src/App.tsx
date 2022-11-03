import Login from "./components/Login/Login";
import ShiftNotes from "./components/ShiftNotes/ShiftNotes";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "./context";

function App() {
  const userContext = useContext(UserContext);

  useEffect(() => {
    axios
      .get("api/login/me")
      .then((res) => {
        const id = res.data.id;
        const email = res.data.email;
        userContext.setUser({ id, email });
        userContext.setUserState(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Routes>
      <Route path="/shiftnotes" element={userContext.userState ? <ShiftNotes /> : <Navigate to="/" />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
