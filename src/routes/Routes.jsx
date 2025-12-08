import { createBrowserRouter } from "react-router";
import ProtectedRoute from "../routes/PrivateRoute";
import Navbar from "../components/Navbar";
import NavbarLayout from "../components/NavbarLayout";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

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
          { path: "my-assets", element: <h1>My Assets</h1> },
          { path: "request-asset", element: <h1>request assets</h1> },
        ],
      },

      // HR routes (requires hr)
      {
        path: "/hr",
        element: <ProtectedRoute allowedRoles={["hr"]} />,
        children: [
          { path: "assets", element: <h1>Hr Assets</h1> },
          { path: "requests", element: <h1>hr req</h1> },
        ],
      },

      { path: "*", element: <NotFound /> },
    ],
  },
];

// createBrowserRouter consumes the same route object
const router = createBrowserRouter(routes);

export default router;
