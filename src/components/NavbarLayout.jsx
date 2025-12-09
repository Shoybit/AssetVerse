// src/components/NavbarLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';

export default function NavbarLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="w-11/12 mx-auto p-4">
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}
