import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
import useAuthStore from "@/store/use-auth-store";

import AppLoadingPage from "../apps/app-page-loading";

function AuthRoute({ children }) {
  const user = useAuthStore().user;
  const isAppMounted = useAppMounted().isAppMounted;

  if (user) {
    return <Navigate to={LOCATIONS.MEMBER_DASHBOARD} />;
  }
  if (!user && !isAppMounted) {
    return <AppLoadingPage />;
  }
  return children;
}

export default AuthRoute;

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
