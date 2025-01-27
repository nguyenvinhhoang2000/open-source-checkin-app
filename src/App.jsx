import React from "react";
import cookie from "react-cookies";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Layout from "@/components/layouts/layout";

import { LOCATIONS } from "@/constants/routes";

import AuthRoute from "./components/auth-route";
import { COOKIES_KEYS } from "./constants/cookies-keys";
import { setAppAccessToken } from "./services/axiosConfig";
import useAppMounted from "./store/use-app-mounted";
import useAuthStore from "./store/use-auth-store";
import {
  AbsentRequest,
  Dashboard,
  Login,
  PrivateRoute,
  Ranking,
  UnauthorizedPage,
} from "./routes";

function App() {
  const onSetAppMounted = useAppMounted().onSetAppMounted;

  const onGetUserInformation = useAuthStore().onGetUserInformation;

  const router = createBrowserRouter([
    {
      path: LOCATIONS.LOGIN,
      element: (
        <AuthRoute>
          <Login />
        </AuthRoute>
      ),
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

  const onInitialize = React.useCallback(async () => {
    const token = cookie.load(COOKIES_KEYS.TOKEN);
    if (token) {
      /** Get user info
       * @api {get} /client/user Get user info
       * @action set user to zustand
       * */
      setAppAccessToken(token);
      await onGetUserInformation();
    }
    setTimeout(
      () => {
        onSetAppMounted();
      },
      token ? 500 : 0,
    );
  }, []); // eslint-disable-line

  React.useEffect(() => {
    onInitialize();
  }, []); // eslint-disable-line

  return <RouterProvider router={router} />;
}

export default App;
