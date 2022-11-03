import { Navigate, useLocation } from 'react-router-dom';
import React, { Fragment, useContext } from 'react';
import { UserContext } from "../../context";




const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn } = useContext(UserContext);
    const location = useLocation();
    if (!isLoggedIn) { return <Navigate to="/" replace state={{ from: location }} />; }
    return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;