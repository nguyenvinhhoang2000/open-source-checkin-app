import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PropTypes from "prop-types";

import AppLoadingPage from "@/components/apps/app-page-loading";

import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
import useAuthStore from "@/store/use-auth-store";

function AuthRoute({ children }) {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect");

  const { user } = useAuthStore();
  const isAppMounted = useAppMounted().isAppMounted;

  React.useEffect(() => {
    if (user) {
      navigate(redirect || LOCATIONS.MEMBER_DASHBOARD);
    }
  }, [user]);

  if (!user && !isAppMounted) {
    return <AppLoadingPage />;
  }

  return children;
}

export default AuthRoute;

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
