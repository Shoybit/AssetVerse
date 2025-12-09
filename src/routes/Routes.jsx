// src/routes/routes.jsx
import React from "react";
import { createBrowserRouter } from "react-router";

import PrivateRoute from "../routes/PrivateRoute";
import NavbarLayout from "../components/NavbarLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";

import Assets from "../pages/dashboard/HR/Assets";
import Requests from "../pages/dashboard/HR/Requests";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import HRDashboard from "../pages/dashboard/HR/HRDashboard";

import RequestAsset from "../pages/dashboard/Employee/RequestAsset";
import MyAssets from "../pages/dashboard/Employee/MyAssets";

import Packages from "../pages/Payments/Packages";
import PaymentHistory from "../pages/Payments/PaymentHistory";
import RegisterHR from "../pages/auth/RegisterHR";
import RegisterEmployee from "../pages/auth/RegisterEmployee";

/**
 * Routes:
 * - Root layout is NavbarLayout
 * - PrivateRoute is used as element for nested protected groups (it renders an <Outlet/>)
 * - Paths are relative when nested (no leading slashes in children)
 */

const routes = [
  {
    path: "/",
    element: <NavbarLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },

      // Separate register pages for Employee and HR
      { path: "register-employee", element: <RegisterEmployee /> },
      { path: "register-hr", element: <RegisterHR /> },

      // Employee & HR can access these routes (PrivateRoute checks allowedRoles)
      {
        element: <PrivateRoute allowedRoles={["employee", "hr"]} />,
        children: [
          { path: "my-assets", element: <MyAssets /> },
          { path: "request-asset", element: <RequestAsset /> },
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
