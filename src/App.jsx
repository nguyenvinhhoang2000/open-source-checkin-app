import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "@/components/layouts/layout";

import { LOCATIONS } from "@/constants/routes";
import {
  AbsentRequest,
  CheckUserRole,
  Dashboard,
  Login,
  Ranking,
  UnauthorizedPage,
} from "@/routes";

import "@/App.css";

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
          element: <CheckUserRole element={Dashboard} />,
        },
        {
          path: LOCATIONS.MEMBER_ABSENT,
          element: <CheckUserRole element={AbsentRequest} />,
        },
        {
          path: LOCATIONS.MEMBER_RANKING,
          element: <CheckUserRole element={Ranking} />,
        },
      ],
    },
    {
      path: "/unauthorized",
      element: <UnauthorizedPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
