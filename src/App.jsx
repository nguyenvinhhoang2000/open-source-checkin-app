import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@/components/layouts/layout";

import { LOCATIONS } from "@/constants/routes";

import {
  AbsentRequest,
  Dashboard,
  Login,
  PrivateRoute,
  Ranking,
  UnauthorizedPage,
} from "./routes";

function App() {
  const router = createBrowserRouter([
    {
      path: LOCATIONS.LOGIN,
      element: <Login />,
    },
    {
      path: LOCATIONS.MEMBER_LAYOUT,
      element: <Layout />,
      children: [
        {
          path: LOCATIONS.MEMBER_DASHBOARD,
          element: (
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          ),
        },
        {
          path: LOCATIONS.MEMBER_ABSENT,
          element: (
            <PrivateRoute>
              <AbsentRequest />
            </PrivateRoute>
          ),
        },
        {
          path: LOCATIONS.MEMBER_RANKING,
          element: (
            <PrivateRoute>
              <Ranking />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: LOCATIONS.UNAUTHORIZED,
      element: <UnauthorizedPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
