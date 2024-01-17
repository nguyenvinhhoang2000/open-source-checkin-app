import React from "react";
import cookie from "react-cookies";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { COOKIES_KEYS } from "@/constants/cookies-keys";
import { LOCATIONS } from "@/constants/routes";
import useAppMounted from "@/store/use-app-mounted";
// import useAuthStore from "@/store/use-auth-store";

function PrivateRoute({ children }) {
  const location = useLocation();
  const navigate = useNavigate();

  // const user = useAuthStore().user;
  const token = cookie.load(COOKIES_KEYS.TOKEN);
  const isAppMounted = useAppMounted().isAppMounted;

  React.useEffect(() => {
    if (isAppMounted && !token) {
      navigate(`${LOCATIONS.LOGIN}?redirect=${location.pathname}`);
    }
  }, [isAppMounted, location.pathname, navigate, token]);

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

  return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
