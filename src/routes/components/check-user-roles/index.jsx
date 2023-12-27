import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

function CheckUserRole({ roles, element: Element }) {
  const location = useLocation();
  const user = {
    role: "admin",
  };

  if (!user.role) {
    return <Navigate to={`/?redirect=${location.pathname}`} />;
  }
  if (user.role && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Element />;
}

export default CheckUserRole;

CheckUserRole.propTypes = {
  roles: PropTypes.instanceOf(Array),
  element: PropTypes.elementType.isRequired,
};

CheckUserRole.defaultProps = {
  roles: ["member", "admin"],
};
