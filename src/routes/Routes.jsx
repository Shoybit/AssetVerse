import React from "react";
import { createBrowserRouter, Navigate } from "react-router";

import NavbarLayout from "../components/NavbarLayout";
import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";

import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import RegisterHR from "../pages/auth/RegisterHR";
import RegisterEmployee from "../pages/auth/RegisterEmployee";
import Blog from "../pages/Blog";

import DashboardLayout from "../pages/dashboard/DashboardLayout";

// ===== EMPLOYEE =====
import MyAssets from "../pages/dashboard/Employee/MyAssets";
import MyTeam from "../pages/dashboard/Employee/MyTeam";
import RequestAsset from "../pages/dashboard/Employee/RequestAsset";
import MyProfile from "../pages/dashboard/Employee/MyProfile";
import MyRequestedAssets from "../pages/dashboard/Employee/MyRequestedAssets";

// ===== HR =====
import HRDashboard from "../pages/dashboard/HR/HRDashboard";
import Assets from "../pages/dashboard/HR/Assets";
import Requests from "../pages/dashboard/HR/Requests";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import AddAssetForm from "../components/AddAssetForm";

// ===== PAYMENTS =====
import Packages from "../pages/Payments/Packages";
import PaymentHistory from "../pages/Payments/PaymentHistory";
import PaymentsSuccess from "../pages/Payments/PaymentsSuccess";

import { useAuth } from "../context/AuthContext";

const DashboardRedirect = () => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "hr" || user.role === "admin") {
    return <Navigate to="hr/dashboard" replace />;
  }

  return <Navigate to="my-assets" replace />;
};

const router = createBrowserRouter([
  // ================= PUBLIC =================
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      { index: true, element: <Home /> },

      // ✅ BLOG IS PUBLIC (FIXED)
      { path: "blog", element: <Blog /> },

      { path: "payments/success", element: <PaymentsSuccess /> },

      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register-employee", element: <RegisterEmployee /> },
          { path: "register-hr", element: <RegisterHR /> },
        ],
      },
    ],
  },

  // ================= DASHBOARD =================
  {
    path: "/dashboard",
    element: <PrivateRoute allowedRoles={["employee", "hr", "admin"]} />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },

          // ===== EMPLOYEE =====
          { path: "my-assets", element: <MyAssets /> },
          { path: "my-team", element: <MyTeam /> },
          { path: "request-asset", element: <RequestAsset /> },
          { path: "my-profile", element: <MyProfile /> },
          { path: "my-requests", element: <MyRequestedAssets /> },

          // ===== HR =====
          {
            path: "hr",
            element: <PrivateRoute allowedRoles={["hr", "admin"]} />,
            children: [
              { path: "dashboard", element: <HRDashboard /> },
              { path: "assets", element: <Assets /> },
              { path: "add-asset", element: <AddAssetForm /> },
              { path: "requests", element: <Requests /> },
              { path: "employees", element: <EmployeeList /> },
              { path: "packages", element: <Packages /> },
              { path: "payments", element: <PaymentHistory /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
