// src/routes/routes.jsx
import React from "react";
import { createBrowserRouter } from "react-router";

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
import MyAssets from "../pages/dashboard/Employee/MyAssets";

import Packages from "../pages/Payments/Packages";
import PaymentHistory from "../pages/Payments/PaymentHistory";
import { path } from "framer-motion/client";
import MyTeam from "../pages/dashboard/Employee/MyTeam";


const routes = [
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      { index: true, element: <Home /> },

      // Public-only routes (redirect if already logged in)
      {
        element: <PublicRoute />,
        children: [
          { path: "login", element: <Login /> },
          { path: "register-employee", element: <RegisterEmployee /> },
          { path: "register-hr", element: <RegisterHR /> },
        ],
      },

      // Routes accessible to both employee and hr (protected)
      {
        element: <PrivateRoute allowedRoles={["employee", "hr"]} />,
        children: [
          { path: "my-assets", element: <MyAssets /> },
          { path: "request-asset", element: <RequestAsset /> },
          {path: "my-team", element: <MyTeam/> }
        ],
      },

      // HR-only protected subtree
      {
        path: "hr",
        element: <PrivateRoute allowedRoles={["hr"]} />,
        children: [
          { path: "assets", element: <Assets /> },
          { path: "requests", element: <Requests /> },
          { path: "employees", element: <EmployeeList /> },
          { path: "packages", element: <Packages /> },
          { path: "payments", element: <PaymentHistory /> },
          { path: "dashboard", element: <HRDashboard /> },
        ],
      },

      // Fallback 404
      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
