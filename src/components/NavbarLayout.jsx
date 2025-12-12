import React from "react";
import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function NavbarLayout() {
  return (
    // make root a column flex container and full viewport height
    <div className="min-h-screen flex flex-col bg-base-100">
      <Navbar />

      {/* main should expand to fill remaining space so Footer stays at bottom */}
      <main className="grow w-10/12 mx-auto pt-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
