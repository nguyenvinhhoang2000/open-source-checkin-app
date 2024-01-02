import React from "react";
import { Link } from "react-router-dom";

import { LOCATIONS } from "@/constants/routes";

import Navigation from "./components/navigation";
import UserInfo from "./components/user-info";

function Header() {
  return (
    <header className="bg-white">
      <div className="container flex w-full flex-row items-center justify-between py-[0.9375rem]">
        <Link to={LOCATIONS.MEMBER_LAYOUT}>
          <img
            src="/assets/icons/wiicamp-logo.svg"
            alt="logo"
            title="wiicamp-logo"
          />
        </Link>
        <div className="hidden md:block">
          <Navigation />
        </div>
        <UserInfo />
      </div>
    </header>
  );
}

export default Header;
