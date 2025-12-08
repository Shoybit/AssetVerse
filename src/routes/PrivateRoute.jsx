import { Navigate, Outlet } from 'react-router';

export default function ProtectedRoute({ allowedRoles = [] }) {
const user = {
    name: "ss",
    role: "hr"
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
