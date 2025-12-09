/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ redirectTo = "/" }) => {
  const { user } = useContext(AuthContext);
  // if logged in, redirect to an appropriate page by role
  if (user) {
    if (user.role === "hr") return <Navigate to="/hr/assets" replace />;
    return <Navigate to="/my-assets" replace />;
  }
  return <Outlet />;
}
export default PublicRoute;