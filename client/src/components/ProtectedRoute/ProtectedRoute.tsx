import { Fragment, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();
    const location = useLocation();

    return auth.user != null ? <Fragment>{children}</Fragment> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
};

export default ProtectedRoute;