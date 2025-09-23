import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/Auth';

const ProtectedAuth = ({ children, authOnly = false }) => {
  const { isAuth, user } = useAuthContext();
  const location = useLocation();

  // If user is authenticated and trying to access /auth routes
  if (isAuth && authOnly && location.pathname.startsWith("/auth")) {
    return <Navigate to={user.role === "Donor" ? "/donor/donations" : "/dashboard/overview"} replace />;
  }

  // If user is not authenticated and trying to access private routes
  if (!isAuth && !authOnly) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, render children
  return children;
};

export default ProtectedAuth;
