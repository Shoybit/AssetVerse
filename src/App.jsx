import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-slate-900 to-slate-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-10/12 mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-white text-2xl font-bold tracking-wide cursor-pointer">
          Asset<span className="text-sky-400">Verse</span>
        </div>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 text-gray-200 font-medium">
          <li>
            <a href="/" className="hover:text-sky-400 transition">Home</a>
          </li>
          <li>
            <a href="/join-employee" className="hover:text-sky-400 transition">
              Join as Employee
            </a>
          </li>
          <li>
            <a href="/join-hr" className="hover:text-sky-400 transition">
              Join as HR Manager
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-gray-200 font-medium">
            <li>
              <a href="/" className="hover:text-sky-400 transition">Home</a>
            </li>
            <li>
              <a href="/join-employee" className="hover:text-sky-400 transition">
                Join as Employee
              </a>
            </li>
            <li>
              <a href="/join-hr" className="hover:text-sky-400 transition">
                Join as HR Manager
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
