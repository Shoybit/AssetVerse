import React, { useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router";
import AuthContext from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "font-semibold text-primary bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg shadow-inner"
      : "text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition-colors duration-200";

  return (
    <nav className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-10/12 mx-auto h-16 flex items-center">

        <div className="flex items-center">

          {/* Mobile menu */}
          <div className="dropdown lg:hidden mr-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <div className="flex flex-col gap-1">
                <span className="h-0.5 w-5 bg-base-content"></span>
                <span className="h-0.5 w-5 bg-base-content"></span>
                <span className="h-0.5 w-5 bg-base-content"></span>
              </div>
            </label>

            <ul
              tabIndex={0}
              className="menu menu-lg dropdown-content mt-3 p-4 shadow-2xl bg-base-100 rounded-box w-64 border"
            >
              {!user ? (
                <>
                  <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
                  <li><NavLink to="/register-employee" className={activeClass}>Join as Employee</NavLink></li>
                  <li><NavLink to="/register-hr" className={activeClass}>Join as HR Manager</NavLink></li>
                  <li>
                    <NavLink to="/login" className="btn btn-primary btn-block mt-2">
                      Login
                    </NavLink>
                  </li>
                  <li><NavLink to="/blog" className={activeClass}>Blog</NavLink></li>

                </>
              ) : (
                <>
                  <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
                <li><NavLink to="/about" className={activeClass}>About</NavLink></li>
                <li><NavLink to="/blog" className={activeClass}>Blog</NavLink></li>
                <li><NavLink to="/support" className={activeClass}>Support</NavLink></li>
               <li><NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink></li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10 px-4 py-2 rounded-lg text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* ===== LOGO (UNCHANGED) ===== */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200"
          >
            <div className="relative">
              <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow">
                <span className="text-white font-bold text-lg">AV</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
            </div>

            <span className="hidden sm:inline">
              Asset
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Verse
              </span>
            </span>

            <span className="sm:hidden">
              Asset<span className="text-primary">V</span>
            </span>
          </Link>
        </div>

        {/* ================= DESKTOP RIGHT ================= */}
        <div className="ml-auto hidden lg:flex items-center gap-6">

          {/* Logged OUT */}
          {!user && (
            <ul className="menu menu-horizontal gap-2">
              <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
              <li><NavLink to="/register-employee" className={activeClass}>Join as Employee</NavLink></li>
              <li><NavLink to="/register-hr" className={activeClass}>Join as HR Manager</NavLink></li>
              <li>
                <NavLink to="/login" className="btn btn-primary px-6">
                  Login
                </NavLink>
              </li>
            </ul>
          )}

          {/* Logged IN (5+ routes) */}
          {user && (
            <>
              <ul className="menu menu-horizontal gap-2">
                <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
                <li><NavLink to="/about" className={activeClass}>About</NavLink></li>
                <li><NavLink to="/blog" className={activeClass}>Blog</NavLink></li>
                <li><NavLink to="/support" className={activeClass}>Support</NavLink></li>
               <li><NavLink to="/dashboard" className={activeClass}>Dashboard</NavLink></li>

              </ul>

              {/* Profile dropdown */}
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-circle avatar bg-linear-to-br from-primary to-secondary text-white shadow"
                >
                  {user.photo ? (
                    <img src={user.photo} alt="profile" className="rounded-full" />
                  ) : (
                    <span className="text-lg font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content mt-4 p-3 shadow-2xl bg-base-100 rounded-box w-52 border"
                >
                  <li className="px-3 py-2 border-b border-base-300">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm text-gray-500 truncate">
                      {user.email}
                    </div>
                  </li>

                  <li>
                    <NavLink to="/dashboard" className={activeClass}>
                      Dashboard
                    </NavLink>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="text-error hover:bg-error/10 px-3 py-2 rounded-lg text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mobile login button */}
        {!user && (
          <div className="ml-auto lg:hidden">
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
