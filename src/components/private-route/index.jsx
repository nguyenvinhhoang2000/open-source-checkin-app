import React from "react";
import cookie from "react-cookies";
import { Navigate, useLocation } from "react-router-dom";
import { message } from "antd";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import axiosClient from "@/services/memberApi";
import { useAuthStore } from "@/store/use-auth-store";

function PrivateRoute({ children }) {
  const location = useLocation();
  const token = cookie.load("token") || "";
  const { onGetUserInfo } = useAuthStore();

  const onGetUserProfile = async () => {
    try {
      const {
        data: { payload: userInfo },
      } = await axiosClient.get(`/client/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onGetUserInfo(userInfo);
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  if (token && location.pathname !== "/") {
    onGetUserProfile();
  }

  if (token && location.pathname === "/") {
    return <Navigate to={LOCATIONS.MEMBER_DASHBOARD} />;
  }
  if (!token && location.pathname !== "/") {
    return <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
