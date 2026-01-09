import { NavLink, useNavigate } from "react-router";

import { useAuth } from "../../context/AuthContext";
import {
  HiOutlineLogout,
  HiOutlineUser,
  HiOutlineUsers,
  HiOutlineCube,
  HiOutlineClipboardList,
  HiOutlineCreditCard,
  HiOutlineChartBar,
  HiOutlineShoppingCart,
  HiOutlineArchive,
  
  HiOutlineBell,
  HiOutlineQuestionMarkCircle
} from "react-icons/hi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <aside className="w-72 min-h-screen flex flex-col bg-linear-to-b from-base-100 to-base-200 border-r border-base-300">
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <HiOutlineBuildingOffice className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-lg">AssetFlow</h2>
            <p className="text-sm text-base-content/70">Management System</p>
          </div>
        </div>
        
        <div className="mt-6 p-4 rounded-xl bg-base-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold">
              {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user.name || "User"}</p>
              <p className="text-sm text-base-content/70 truncate">{user.email}</p>
              <div className="mt-1">
                <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
          Navigation
        </p>
        
        {user.role !== "hr" && user.role !== "admin" && (
          <div className="space-y-1">
            <NavLink 
              to="/dashboard/my-assets"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineCube className="w-5 h-5" />
              <span>My Assets</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/my-team"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineUsers className="w-5 h-5" />
              <span>My Team</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/request-asset"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineClipboardList className="w-5 h-5" />
              <span>Request Asset</span>
              <span className="ml-auto px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary">
                New
              </span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/my-profile"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineUser className="w-5 h-5" />
              <span>Profile</span>
            </NavLink>
          </div>
        )}

        {/* ===== HR ===== */}
        {user.role === "hr" && (
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              HR Dashboard
            </p>
            
            <NavLink 
              to="/dashboard/hr/dashboard"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineChartBar className="w-5 h-5" />
              <span>Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/hr/assets"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineArchive className="w-5 h-5" />
              <span>Assets</span>
              <span className="ml-auto px-2 py-1 text-xs rounded-full bg-primary/20 text-primary">
                42
              </span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/hr/employees"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineUsers className="w-5 h-5" />
              <span>Employees</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/hr/requests"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineBell className="w-5 h-5" />
              <span>Requests</span>
              <span className="ml-auto px-2 py-1 text-xs rounded-full bg-error/20 text-error">
                5
              </span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/hr/payments"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineCreditCard className="w-5 h-5" />
              <span>Payments</span>
            </NavLink>
          </div>
        )}

        {/* ===== ADMIN ===== */}
        {user.role === "admin" && (
          <div className="space-y-1">
            <p className="px-4 text-xs font-semibold text-base-content/50 uppercase tracking-wider mb-2">
              Administration
            </p>
            
            <NavLink 
              to="/dashboard/hr/dashboard"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineChartBar className="w-5 h-5" />
              <span>Admin Dashboard</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/payments/packages"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineShoppingCart className="w-5 h-5" />
              <span>Packages</span>
            </NavLink>
            
            <NavLink 
              to="/dashboard/payments/history"
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-primary text-primary-content shadow-sm' 
                    : 'hover:bg-base-300'
                }`
              }
            >
              <HiOutlineCreditCard className="w-5 h-5" />
              <span>Payment History</span>
            </NavLink>
          </div>
        )}


      </div>

      <div className="p-4 border-t border-base-300">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-linear-to-r from-error/10 to-error/5 hover:from-error/20 hover:to-error/10 text-error font-medium transition-all duration-200 hover:shadow-sm group"
        >
          <HiOutlineLogout className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          <span>Logout</span>
        </button>
        
        <div className="mt-4 text-center text-xs text-base-content/50">
          <p>© {new Date().getFullYear()} AssetFlow</p>
          <p className="mt-1">v2.1.0</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;