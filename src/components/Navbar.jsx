/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import AuthContext from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const onLogout = () => {
    logout();
    nav('/');
  };

  return (
    <motion.header
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="bg-white border-b"
    >
      <div className="container mx-auto flex items-center justify-between gap-4 py-3 px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow">
              AV
            </div>
            <div className="hidden md:block">
              <div className="text-lg font-semibold text-slate-800">AssetVerse</div>
              <div className="text-sm text-slate-500">Corporate Asset Management</div>
            </div>
          </Link>
        </div>

        <div className="flex-1 hidden md:flex justify-center px-4">
          <div className="w-full max-w-2xl">
            <div className="relative">
              <input
                aria-label="Search assets"
                className="input input-bordered w-full rounded-full pr-12"
                placeholder="Search assets, employees, companies..."
              />
              <button className="btn btn-ghost absolute right-1 top-1/2 -translate-y-1/2">
                🔎
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link to="/notifications" className="btn btn-ghost btn-circle">
            🔔
          </Link>

          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full bg-slate-600 text-white flex items-center justify-center">
                  {user.name ? user.name[0].toUpperCase() : 'U'}
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52">
                <li><div className="font-medium">{user.name}</div></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><button onClick={onLogout}>Logout</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
export default Navbar
