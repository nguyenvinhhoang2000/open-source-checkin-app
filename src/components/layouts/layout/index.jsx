import React from "react";
import { Outlet } from "react-router-dom";

import Footer from "@/components/layouts/Footer";
import Header from "@/components/layouts/Header";

function Layout() {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default Layout;
