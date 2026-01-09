import { Navigate } from "react-router";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const DashboardRedirect = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "hr") {
    return <Navigate to="hr/dashboard" replace />;
  }

  if (user.role === "employee") {
    return <Navigate to="my-assets" replace />;
  }

  return <Navigate to="/" replace />;
};

export default DashboardRedirect;
