// src/components/Navbar.jsx
import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/");
  };

  const activeClass = ({ isActive }) =>
    isActive ? "btn btn-primary" : "btn btn-ghost";

  return (
    <nav className="navbar bg-base-200 px-4 shadow">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <Link
            to="/"
            className="btn btn-ghost normal-case text-2xl font-semibold"
          >
            AssetVerse
          </Link>
        </div>

        <div className="flex-none items-center gap-2">
          {!user ? (
            <>
              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
              <NavLink to="/register-employee" className={activeClass}>
                Join as Employee
              </NavLink>
              <NavLink to="/register-hr" className="btn btn-primary">
                Join as HR
              </NavLink>
              <NavLink to="/login" className={activeClass}>
                Login
              </NavLink>
            </>
          ) : (
            <>
              {user.role === "hr" ? (
                <>
                  <NavLink to="/hr/assets" className={activeClass}>
                    Assets
                  </NavLink>
                  <NavLink to="/hr/requests" className={activeClass}>
                    Requests
                  </NavLink>
                  <NavLink to="/hr/packages" className={activeClass}>
                    Packages
                  </NavLink>
                  <NavLink to="/hr/dashboard" className={activeClass}>
                    Dashboard
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/my-assets" className={activeClass}>
                    My Assets
                  </NavLink>
                  <NavLink to="/request-asset" className={activeClass}>
                    Request Asset
                  </NavLink>
                  <NavLink to="/my-team" className={activeClass}>
                    My Team
                  </NavLink>
                </>
              )}

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li className="px-2 py-1">
                    <span className="font-medium">{user.name}</span>
                  </li>
                  <li className="px-2 py-1 text-sm text-neutral">
                    {user.email}
                  </li>
                  <li>
                    <Link to="/profile" className="w-full text-left">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout} className="w-full text-left">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
