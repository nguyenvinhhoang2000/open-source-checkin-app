import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      {/* Navigation  */}
      <Header />

      <main className="mb-auto bg-mainBg">
        {/* Pages Section  */}
        <Outlet />
      </main>

      {/* Footer  */}
      <Footer />
    </div>
  );
}

export default Layout;
