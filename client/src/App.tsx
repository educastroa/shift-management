import Login from "./components/Login/Login";
import { UserContextProvider } from "./context";
import ShiftNotes from "./components/ShiftNotes/ShiftNotes";
import { Routes, Route } from "react-router-dom";
import { useEffect, useContext } from "react";
import axios from "axios";
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/shiftnotes" element={<ShiftNotes />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
