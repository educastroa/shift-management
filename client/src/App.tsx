import Login from "./components/Login/Login";
import ShiftNotes from "./components/ShiftNotes/ShiftNotes";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "./context";
import axios from "axios";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const { setIsLoggedIn, setUser } = useContext(UserContext);

  useEffect(() => {
    const checkUser = async () => await axios
      .get("api/login/me")
      .then((res) => {
        const id = res.data.id;
        const email = res.data.email;
        setUser({ id, email });
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
    checkUser()
  }, []);


  return (
    <Routes>
      <Route path="/" element={<ProtectedRoute><Login /></ProtectedRoute>} />
      <Route path="/shiftnotes" element={<ProtectedRoute><ShiftNotes /></ProtectedRoute>} />
    </Routes>
  );
}

export default App;
