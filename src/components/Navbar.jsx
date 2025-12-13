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
    isActive
      ? "font-semibold text-primary bg-gradient-to-r from-primary/20 to-primary/10 rounded-lg shadow-inner"
      : "text-base-content hover:text-primary hover:bg-base-200 rounded-lg transition-colors duration-200";

  return (
    <nav className="bg-base-100 shadow-lg border-b border-base-300 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-10/12 mx-auto h-16 flex items-center">

        {/* LEFT: Logo */}
        <div className="flex items-center">
          {/* Mobile Menu */}
          <div className="dropdown lg:hidden mr-3">
            <label tabIndex={0} className="btn btn-ghost btn-circle hover:bg-base-200">
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
                  <li className="mb-2">
                    <NavLink to="/" className={activeClass}>
                      <span className="px-4 py-2 block">Home</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/register-employee" className={activeClass}>
                      <span className="px-4 py-2 block">Join as Employee</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/register-hr" className={activeClass}>
                      <span className="px-4 py-2 block">Join as HR Manager</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/login" className="btn btn-primary btn-block mt-2">
                      <span className="block">Login</span>
                    </NavLink>
                  </li>
                </>
              ) : user.role === "hr" ? (
                <>
                  <li className="mb-2">
                    <NavLink to="/hr/assets" className={activeClass}>
                      <span className="px-4 py-2 block">Asset List</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/hr/add-asset" className={activeClass}>
                      <span className="px-4 py-2 block">Add Asset</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/hr/requests" className={activeClass}>
                      <span className="px-4 py-2 block">All Requests</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/hr/employees" className={activeClass}>
                      <span className="px-4 py-2 block">Employee List</span>
                    </NavLink>
                  </li>
                  <li className="border-t border-base-300 my-3" />
                  <li className="mb-2">
                    <NavLink to="/my-profile" className={activeClass}>
                      <span className="px-4 py-2 block">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="px-4 py-2 text-error hover:bg-error/10 rounded-lg w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="mb-2">
                    <NavLink to="/my-assets" className={activeClass}>
                      <span className="px-4 py-2 block">My Assets</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/my-team" className={activeClass}>
                      <span className="px-4 py-2 block">My Team</span>
                    </NavLink>
                  </li>
                  <li className="mb-2">
                    <NavLink to="/request-asset" className={activeClass}>
                      <span className="px-4 py-2 block">Request Asset</span>
                    </NavLink>
                  </li>
                  <li className="border-t border-base-300 my-3" />
                  <li className="mb-2">
                    <NavLink to="/my-profile" className={activeClass}>
                      <span className="px-4 py-2 block">Profile</span>
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout} 
                      className="px-4 py-2 text-error hover:bg-error/10 rounded-lg w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Professional Logo */}
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200">
            <div className="relative">
              <div className="w-9 h-9 bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow">
                <span className="text-white font-bold text-lg">AV</span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></div>
            </div>
            <span className="hidden sm:inline">
              Asset<span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Verse</span>
            </span>
            <span className="sm:hidden">
              Asset<span className="text-primary">V</span>
            </span>
          </Link>
        </div>

        {/* RIGHT: Desktop Menu + Profile */}
        <div className="ml-auto hidden lg:flex items-center gap-6">

          {/* Public Desktop Links */}
          {!user && (
            <ul className="menu menu-horizontal gap-2">
              <li>
                <NavLink to="/" className={activeClass}>
                  <span className="px-4 py-2 block">Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/register-employee" className={activeClass}>
                  <span className="px-4 py-2 block">Join as Employee</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/register-hr" className={activeClass}>
                  <span className="px-4 py-2 block">Join as HR Manager</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/login" className="btn btn-primary px-6 shadow hover:shadow-md transition-shadow">
                  <span className="block">Login</span>
                </NavLink>
              </li>
            </ul>
          )}

          {/* PROFILE DROPDOWN (Employee + HR) */}
          {user && (
            <div className="dropdown dropdown-end">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium hidden xl:inline-block">{user.name}</span>
                <label tabIndex={0} className="btn btn-circle avatar bg-linear-to-br from-primary to-secondary text-white hover:scale-105 transition-transform cursor-pointer shadow">
                  {user.photo ? (
                    <img src={user.photo} alt="profile" className="rounded-full" />
                  ) : (
                    <span className="text-lg font-bold">
                      {user.name?.charAt(0).toUpperCase()}
                    </span>
                  )}
                </label>
              </div>

              {/* EMPLOYEE MENU */}
              {user.role !== "hr" && (
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content mt-4 p-3 shadow-2xl bg-base-100 rounded-box w-56 border"
                >
                  <li className="px-3 py-2 mb-2 border-b border-base-300">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/my-assets" className={activeClass}>
                      <span className="py-2 px-3 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        My Assets
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/my-team" className={activeClass}>
                      <span className="py-2 px-3 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        My Team
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/request-asset" className={activeClass}>
                      <span className="py-2 px-3 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Request Asset
                      </span>
                    </NavLink>
                  </li>
                  <li className="border-t border-base-300 my-2" />
                  <li className="mb-1">
                    <NavLink to="/my-profile" className={activeClass}>
                      <span className="py-2 px-3 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Profile
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="py-2 px-3 text-error hover:bg-error/10 rounded-lg flex items-center gap-2 w-full text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
                      Logout
                    </button>
                  </li>
                </ul>
              )}

              {/* HR MANAGER MENU */}
              {user.role === "hr" && (
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content mt-4 p-3 shadow-2xl bg-base-100 rounded-box w-56 border"
                >
                  <li className="px-3 py-2 mb-2 border-b border-base-300">
                    <div className="font-bold">{user.name}</div>
                    <div className="text-sm text-gray-500 truncate">{user.email}</div>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/hr/assets" className={activeClass}>
                      <span className="py-2 px-2 block hover:bg-base-200 rounded-lg items-center gap-2 ">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Asset List
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/hr/add-asset" className={activeClass}>
                      <span className="py-2 px-2 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Add Asset
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/hr/requests" className={activeClass}>
                      <span className="py-2 px-2 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        All Requests
                      </span>
                    </NavLink>
                  </li>
                  <li className="mb-1">
                    <NavLink to="/hr/employees" className={activeClass}>
                      <span className="py-2 px-2 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Employee List
                      </span>
                    </NavLink>
                  </li>
                  <li className="border-t border-base-300 my-2" />
                  <li className="mb-1">
                    <NavLink to="/my-profile" className={activeClass}>
                      <span className="py-2 px-2 block hover:bg-base-200 rounded-lg items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        Profile
                      </span>
                    </NavLink>
                  </li>
                  <li>
                    <button 
                      onClick={handleLogout}
                      className="py-2 px-3 text-error hover:bg-error/10 rounded-lg flex items-center gap-2 w-full text-left"
                    >
                      <span className="w-1.5 h-1.5 bg-error rounded-full"></span>
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Mobile Login Button */}
        {!user && (
          <div className="ml-auto lg:hidden">
            <NavLink to="/login" className="btn btn-primary btn-sm">
              <span className="block">Login</span>
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}