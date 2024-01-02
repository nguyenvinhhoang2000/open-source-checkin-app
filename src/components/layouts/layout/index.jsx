import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

function Layout() {
  return (
    <div className="flex min-h-screen flex-col justify-between bg-mainBg">
      {/* Navigation  */}
      <Header />

      <main className="mb-auto">
        {/* Pages Section  */}
        <Outlet />
      </main>

      {/* Footer  */}
      <Footer />
    </div>
  );
}

export default Layout;
