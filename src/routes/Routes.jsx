import DashboardLayout from "../pages/dashboard/DashboardLayout";

import React from "react";
import { createBrowserRouter, Navigate } from "react-router";

import PrivateRoute from "../routes/PrivateRoute";
import PublicRoute from "../routes/PublicRoute";
import NavbarLayout from "../components/NavbarLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import RegisterHR from "../pages/auth/RegisterHR";
import RegisterEmployee from "../pages/auth/RegisterEmployee";

import Assets from "../pages/dashboard/HR/Assets";
import Requests from "../pages/dashboard/HR/Requests";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import HRDashboard from "../pages/dashboard/HR/HRDashboard";

import RequestAsset from "../pages/dashboard/Employee/RequestAsset";

import Packages from "../pages/Payments/Packages";
import PaymentHistory from "../pages/Payments/PaymentHistory";
import MyTeam from "../pages/dashboard/Employee/MyTeam";
import AddAssetForm from "../components/AddAssetForm";
import PaymentsSuccess from "../pages/Payments/PaymentsSuccess";
import MyProfile from "../pages/dashboard/Employee/MyProfile";
import MyAssets from "../pages/dashboard/Employee/MyAssets";


const routes = [
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      { index: true, element: <Home /> },
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
    element: <PrivateRoute allowedRoles={["employee", "hr"]} />,
    children: [
{
  path: "",
  element: <DashboardLayout />,
  children: [
    // ⭐⭐ DEFAULT DASHBOARD PAGE ⭐⭐
    { index: true, element: <Navigate to="my-assets" replace /> },

    // ---------- EMPLOYEE ----------
    { path: "my-profile", element: <MyProfile /> },
    { path: "my-assets", element: <MyAssets /> },
    { path: "request-asset", element: <RequestAsset /> },
    { path: "my-team", element: <MyTeam /> },

    // ---------- HR ----------
    {
      path: "hr",
      element: <PrivateRoute allowedRoles={["hr"]} />,
      children: [
        { index: true, element: <Navigate to="dashboard" replace /> },
        { path: "dashboard", element: <HRDashboard /> },
        { path: "assets", element: <Assets /> },
        { path: "requests", element: <Requests /> },
        { path: "employees", element: <EmployeeList /> },
        { path: "add-asset", element: <AddAssetForm /> },
        { path: "packages", element: <Packages /> },
        { path: "payments", element: <PaymentHistory /> },
      ],
    },
  ],
}
,
    ],
  },

  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(routes);

export default router;
