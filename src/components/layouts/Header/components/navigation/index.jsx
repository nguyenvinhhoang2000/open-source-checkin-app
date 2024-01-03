import React from "react";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

import { navigationList } from "@/constants/navigation";
import onCheckActiveLink from "@/utils/onCheckActiveLink";

function Navigation({ classNames }) {
  const { pathname } = useLocation();

  return (
    <nav>
      <ul className={classNames}>
        {navigationList.map((item) => (
          <li className="flex list-none items-center" key={item.href}>
            <Link
              className={onCheckActiveLink(pathname, item.href)}
              to={item.href}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;

Navigation.propTypes = {
  classNames: PropTypes.string,
};
Navigation.defaultProps = {
  classNames: "flex flex-row items-center justify-between gap-6",
};
