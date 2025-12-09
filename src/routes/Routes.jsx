import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../routes/PrivateRoute";
import Navbar from "../components/Navbar";
import NavbarLayout from "../components/NavbarLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Assets from "../pages/dashboard/HR/Assets";
import Requests from "../pages/dashboard/HR/Requests";
import RequestAsset from "../pages/dashboard/Employee/RequestAsset";
import MyAssets from "../pages/dashboard/Employee/MyAssets";
import { path } from "framer-motion/client";
import EmployeeList from "../pages/dashboard/HR/EmployeeList";
import Packages from "../pages/Payments/Packages";
import PaymentHistory from "../pages/Payments/PaymentHistory";
import HRDashboard from "../pages/dashboard/HR/HRDashboard";

// Note: lazy() imports can be used for big apps. Keep simple for now.

const routes = [
  {
    path: "/",
    element: <NavbarLayout />, // renders Navbar + outlet
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // Employee routes (requires employee or hr)
      {
        path: "/",
        element: <ProtectedRoute allowedRoles={["employee", "hr"]} />,
        children: [
          { path: "my-assets", element: <MyAssets /> },
          { path: "request-asset", element: <RequestAsset /> },
        ],
      },

      // HR routes (requires hr)
      {
        path: "/hr",
        element: <ProtectedRoute allowedRoles={["hr"]} />,
        children: [
          { path: "assets", element: <Assets /> },
          { path: "requests", element: <Requests /> },
          { path: "employees", element: <EmployeeList /> },
        ],
      },
      // HR pages
      { path: "/hr/packages", element: <Packages /> },
      { path: "/hr/payments", element: <PaymentHistory /> },
      { path: '/hr/dashboard', element: <HRDashboard /> },

      { path: "*", element: <NotFound /> },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
