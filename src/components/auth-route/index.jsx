import React from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import AppLoadingPage from "@/components/apps/app-page-loading";

import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
import useAuthStore from "@/store/use-auth-store";

function AuthRoute({ children }) {
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const user = useAuthStore().user;
  const isAppMounted = useAppMounted().isAppMounted;

  if (user) {
    return <Navigate to={redirect || LOCATIONS.MEMBER_DASHBOARD} />;
  }

  if (!user && !isAppMounted) {
    return <AppLoadingPage />;
  }

  return children;
}

export default React.memo(AuthRoute);

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
