import { createBrowserRouter } from 'react-router';
import ProtectedRoute from '../routes/PrivateRoute';

// Note: lazy() imports can be used for big apps. Keep simple for now.

const routes = [
  {
    path: '/',
    element: <h1>Navbar</h1>, // renders Navbar + outlet
    children: [
      { index: true, element: <h1>Home</h1> },
      { path: 'login', element: <h1>Login</h1> },
      { path: 'register', element: <h1>register</h1> },

      // Employee routes (requires employee or hr)
      {
        path: '/',
        element: <ProtectedRoute allowedRoles={['employee', 'hr']} />,
        children: [
          { path: 'my-assets', element: <h1>My Assets</h1> },
          { path: 'request-asset', element: <h1>request assets</h1> },
        ],
      },

      // HR routes (requires hr)
      {
        path: '/hr',
        element: <ProtectedRoute allowedRoles={['hr']} />,
        children: [
          { path: 'assets', element: <h1>Hr Assets</h1> },
          { path: 'requests', element: <h1>hr req</h1> },
        ],
      },

      { path: '*', element: <h1>404</h1> },
    ],
  },
];

// createBrowserRouter consumes the same route object
const router = createBrowserRouter(routes);

export default router;
