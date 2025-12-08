// src/components/NavbarLayout.jsx
import React from 'react';
import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function NavbarLayout() {
  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <main className="container mx-auto p-4">
        <Outlet />
      </main>
    </div>
  );
}
