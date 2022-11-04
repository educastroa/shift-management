import { Fragment, useEffect } from "react";
import { Navigate, Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import ShiftNotes from "./components/ShiftNotes/ShiftNotes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { useAuth } from "./auth";

const App = () => {
  const { checkLogin, isChecked } = useAuth();

  useEffect(() => {
    checkLogin();
  }, [checkLogin]);

  return (
    <Fragment>
      {isChecked && (
        <Routes>
          <Route path="/shiftnotes" element={<ProtectedRoute><ShiftNotes /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/shiftnotes" replace />} />
        </Routes>
      )}
    </Fragment>
  );
}

export default App;
