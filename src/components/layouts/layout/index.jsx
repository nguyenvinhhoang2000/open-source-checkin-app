import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

function Layout() {
  return (
    <>
      {/* Navigation  */}
      <Header />

      <main>
        {/* Pages Section  */}
        <Outlet />
      </main>

      {/* Footer  */}
      <Footer />
    </>
  );
}

export default Layout;
