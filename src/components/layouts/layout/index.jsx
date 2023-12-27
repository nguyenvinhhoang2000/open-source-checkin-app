import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

function Layout() {
  return (
    <>
      <header>
        {/* Navigation  */}
        <Header />
      </header>

      <main>
        {/* Pages  */}
        <Outlet />
      </main>

      <footer>
        {/* Footer  */}
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
