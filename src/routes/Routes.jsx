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

// Note: lazy() imports can be used for big apps. Keep simple for now.

const routes = [
  {
    path: "/",
    element: <NavbarLayout />, // renders Navbar + outlet
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register/> },

      // Employee routes (requires employee or hr)
      {
        path: "/",
        element: <ProtectedRoute allowedRoles={["employee", "hr"]} />,
        children: [
          { path: "my-assets", element: <MyAssets/> },
          { path: "request-asset", element: <RequestAsset/> },
        ],
      },

      // HR routes (requires hr)
      {
        path: "/hr",
        element: <ProtectedRoute allowedRoles={["hr"]} />,
        children: [
          { path: "assets", element: <Assets/> },
          { path: "requests", element: <Requests/> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
];

// createBrowserRouter consumes the same route object
const router = createBrowserRouter(routes);

export default router;
