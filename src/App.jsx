import React from "react";
import cookie from "react-cookies";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { useBoolean } from "usehooks-ts";

import Layout from "@/components/layouts/layout";

import { LOCATIONS } from "@/constants/routes";

import { COOKIES_KEYS } from "./constants/local-storage-keys";
import { useAuthStore } from "./store/use-auth-store";
import {
  AbsentRequest,
  Dashboard,
  Login,
  PrivateRoute,
  Ranking,
  UnauthorizedPage,
} from "./routes";

function App() {
  const { value: isAppMounted, setTrue: setAppMounted } = useBoolean(false);
  const onGetUserInformation = useAuthStore().onGetUserInformation;

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

  React.useEffect(() => {
    const token = cookie.load(COOKIES_KEYS.TOKEN);
    if (token) {
      /** Get user info
       * @api {get} /client/user Get user info
       * @action set user to zustand
       * */
      onGetUserInformation(token);
    }

    setAppMounted();
  }, [onGetUserInformation, setAppMounted]);

  if (!isAppMounted) {
    return (
      <div className="flex min-h-screen flex-row items-center justify-center">
        <img
          className="animate-ping duration-500"
          src="/assets/icons/wiicamp-logo.svg"
          alt="w-logo"
        />
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

export default App;
