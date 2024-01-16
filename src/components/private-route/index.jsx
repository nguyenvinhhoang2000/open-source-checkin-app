import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import { useAuthStore } from "@/utils/use-auth-store";

function PrivateRoute({ children }) {
  const location = useLocation();
  const { token, user } = useAuthStore();

  if (!token && !user?._id) {
    return <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
  }

  return <div>{children}</div>;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
