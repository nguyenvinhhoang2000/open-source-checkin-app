import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

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
      element: (
        <PrivateRoute>
          <Layout />
        </PrivateRoute>
      ),
      children: [
        {
          path: LOCATIONS.MEMBER_DASHBOARD,
          element: <Dashboard />,
        },
        {
          path: LOCATIONS.MEMBER_ABSENT,
          element: <AbsentRequest />,
        },
        {
          path: LOCATIONS.MEMBER_RANKING,
          element: <Ranking />,
        },
      ],
    },
    {
      path: LOCATIONS.UNAUTHORIZED,
      element: <UnauthorizedPage />,
    },
    {
      path: LOCATIONS.INVALID,
      element: <Navigate to={LOCATIONS.MEMBER_DASHBOARD} />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
