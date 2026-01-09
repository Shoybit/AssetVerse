import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { HiMenu } from "react-icons/hi";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-base-100">

      <div className="lg:hidden h-14 flex items-center px-4 border-b border-base-300">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-primary text-primary-content rounded-lg"
        >
          <HiMenu className="w-6 h-6" />
        </button>
        <h2 className="ml-4 font-semibold text-lg">Dashboard</h2>
      </div>

      <div className="flex min-h-[calc(100vh-3.5rem)] lg:min-h-screen">

        {/* Overlay (mobile only) */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            transform transition-transform duration-300
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:translate-x-0
          `}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto lg:ml-72">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;
