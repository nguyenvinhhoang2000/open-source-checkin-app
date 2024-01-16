import React from "react";
import cookie from "react-cookies";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import axiosClient from "@/services/memberApi";
import { useAuthStore } from "@/store/use-auth-store";
// import { useAuthStore } from "@/store/use-auth-store";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = cookie.load("token") || "";
  const { onGetUserInfo } = useAuthStore();

  React.useEffect(() => {
    const onGetProfile = async () => {
      if (!token) {
        <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
      } else {
        const {
          data: { payload: userInfo },
        } = await axiosClient.get(`/client/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        onGetUserInfo(userInfo);
      }
    };

    onGetProfile();
  }, [location.pathname, onGetUserInfo, token]);

  if (!token) {
    return <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
