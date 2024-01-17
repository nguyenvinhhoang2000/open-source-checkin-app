import PropTypes from "prop-types";

import { useAuthStore } from "@/store/use-auth-store";

function PrivateRoute({ children }) {
  // if (!token) {
  //   return <Navigate to={`${LOCATIONS.LOGIN}?redirect=${location.pathname}`} />;
  // }
  const user = useAuthStore().user;

  if (!user) {
    return null;
  }

  return children;
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
