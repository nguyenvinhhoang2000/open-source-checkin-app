import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
import useAuthStore from "@/store/use-auth-store";

import AppLoadingPage from "../apps/app-page-loading";

function PrivateRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  const user = useAuthStore().user;

  const isForceLogout = useAppMounted().isForceLogout;

  const isAppMounted = useAppMounted().isAppMounted;

  React.useEffect(() => {
    if (isAppMounted && !user) {
      navigate(
        `${LOCATIONS.LOGIN}${
          isForceLogout ? "" : `?redirect=${location.pathname}`
        }`,
      );
    }
  }, [isAppMounted, user]); // eslint-disable-line

  if (!user) {
    return <AppLoadingPage />;
  }

  return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
