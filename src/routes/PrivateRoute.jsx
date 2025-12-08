import { Navigate, Outlet } from 'react-router';
// import AuthContext from '../context/AuthContext';

export default function ProtectedRoute({ allowedRoles = [] }) {
//   const { user } = useContext(AuthContext);
const user = {
    name:"SS",
    role: "admin"
}

  if (!user) {
    // not authenticated: redirect to login
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    // authenticated but unauthorized
    return <Navigate to="/" replace />;
  }

  // authorized: render nested routes
  return <Outlet />;
}
