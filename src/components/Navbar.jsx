// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router';
import AuthContext from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav('/');
  };

  return (
    <nav className="navbar bg-base-200 px-4 shadow">
      <div className="container mx-auto flex items-center">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-2xl font-semibold">AssetVerse</Link>
        </div>

        <div className="flex-none items-center gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <>
              {/* role-aware quick links */}
              {user.role === 'hr' ? (
                <>
                  <Link to="/hr/assets" className="btn btn-ghost">Assets</Link>
                  <Link to="/hr/requests" className="btn btn-ghost">Requests</Link>
                </>
              ) : (
                <>
                  <Link to="/my-assets" className="btn btn-ghost">My Assets</Link>
                  <Link to="/request-asset" className="btn btn-ghost">Request Asset</Link>
                </>
              )}

              {/* avatar + dropdown */}
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                  <li className="px-2 py-1"><span className="font-medium">{user.name}</span></li>
                  <li><span className="text-sm text-neutral">{user.email}</span></li>
                  <li><button onClick={handleLogout} className="btn btn-ghost w-full text-left">Logout</button></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
