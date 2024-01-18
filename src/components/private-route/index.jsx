import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import AppLoadingPage from "@/components/apps/app-page-loading";

import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
import useAuthStore from "@/store/use-auth-store";

function PrivateRoute({ children }) {
  const location = useLocation();

  const user = useAuthStore().user;

  const isForceLogout = useAppMounted().isForceLogout;
  const isAppMounted = useAppMounted().isAppMounted;

  if (isAppMounted && !user) {
    return (
      <Navigate
        to={`${LOCATIONS.LOGIN}${
          isForceLogout ? "" : `?redirect=${location.pathname}`
        }`}
      />
    );
  }

  if (!user) {
    return <AppLoadingPage />;
  }

  return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
