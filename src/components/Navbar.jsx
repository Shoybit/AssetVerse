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
      ? "font-semibold text-primary"
      : "text-base-content hover:text-primary";

  return (
    <nav className="bg-base-100 shadow-md sticky top-0 z-50">
      <div className="max-w-10/12 mx-auto h-16 flex items-center">

        {/*LEFT: Logo */}
        <div className="flex items-center">
          {/*Mobile Menu */}
          <div className="dropdown lg:hidden mr-2">
            <label tabIndex={0} className="btn btn-ghost text-xl">☰</label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-64"
            >
              {!user ? (
                <>
                  <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
                  <li><NavLink to="/register-employee" className={activeClass}>Join as Employee</NavLink></li>
                  <li><NavLink to="/register-hr" className={activeClass}>Join as HR Manager</NavLink></li>
                  <li><NavLink to="/login" className={activeClass}>Login</NavLink></li>
                </>
              ) : user.role === "hr" ? (
                <>
                  <li><NavLink to="/hr/assets" className={activeClass}>Asset List</NavLink></li>
                  <li><NavLink to="/hr/add-asset" className={activeClass}>Add Asset</NavLink></li>
                  <li><NavLink to="/hr/requests" className={activeClass}>All Requests</NavLink></li>
                  <li><NavLink to="/hr/employees" className={activeClass}>Employee List</NavLink></li>
                  <li className="border-t mt-2" />
                  <li><NavLink to="/profile" className={activeClass}>Profile</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              ) : (
                <>
                  <li><NavLink to="/my-assets" className={activeClass}>My Assets</NavLink></li>
                  <li><NavLink to="/my-team" className={activeClass}>My Team</NavLink></li>
                  <li><NavLink to="/request-asset" className={activeClass}>Request Asset</NavLink></li>
                  <li className="border-t mt-2" />
                  <li><NavLink to="/profile" className={activeClass}>Profile</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </>
              )}
            </ul>
          </div>

          {/*  Professional Logo */}
          <Link to="/" className="text-2xl p-2 font-bold tracking-wide">
            Asset<span className="text-primary">Verse</span>
          </Link>
        </div>

        {/* RIGHT: Desktop Menu + Profile */}
        <div className="ml-auto hidden lg:flex items-center gap-6">

          {/* Public Desktop Links */}
          {!user && (
            <ul className="menu menu-horizontal gap-3 ">
              <li><NavLink to="/" className={activeClass}>Home</NavLink></li>
              <li><NavLink to="/register-employee" className={activeClass}>Join as Employee</NavLink></li>
              <li><NavLink to="/register-hr" className={activeClass}>Join as HR Manager</NavLink></li>
              <li>
                <NavLink to="/login" className="btn btn-sm btn-primary">
                  Login
                </NavLink>
              </li>
            </ul>
          )}

          {/* PROFILE DROPDOWN (Employee + HR) */}
          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-circle avatar bg-primary text-white">
                {user.photo ? (
                  <img src={user.photo} alt="profile" />
                ) : (
                  <span className="text-lg font-semibold">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                )}
              </label>

              {/* EMPLOYEE MENU */}
              {user.role !== "hr" && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
                >
                  <li><NavLink to="/my-assets">My Assets</NavLink></li>
                  <li><NavLink to="/my-team">My Team</NavLink></li>
                  <li><NavLink to="/request-asset">Request Asset</NavLink></li>
                  <li className="border-t mt-2" />
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              )}

              {/* HR MANAGER MENU */}
              {user.role === "hr" && (
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-56"
                >
                  <li><NavLink to="/hr/assets">Asset List</NavLink></li>
                  <li><NavLink to="/hr/add-asset">Add Asset</NavLink></li>
                  <li><NavLink to="/hr/requests">All Requests</NavLink></li>
                  <li><NavLink to="/hr/employees">Employee List</NavLink></li>
                  <li className="border-t mt-2" />
                  <li><NavLink to="/profile">Profile</NavLink></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
            </div>
          )}
        </div>

        {!user && (
          <div className="ml-auto lg:hidden">
            <NavLink to="/login" className={activeClass}>
              Login
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
}
