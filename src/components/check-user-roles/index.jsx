import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { LOCATIONS } from "@/constants/routes";
import { useAuthStore } from "@/utils/useAuthStore";

function CheckUserRole({ element: Element }) {
  const location = useLocation();

  const { token, user } = useAuthStore();
  if (!token && !user?._id) {
    return <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
  }

  return <Element />;
}

export default CheckUserRole;

CheckUserRole.propTypes = {
  element: PropTypes.elementType.isRequired,
};
