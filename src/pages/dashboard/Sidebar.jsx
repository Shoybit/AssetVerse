import { NavLink } from "react-router";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64">
      {user.role === "employee" && (
        <>
          <NavLink to="/dashboard/employee/my-assets">My Assets</NavLink>
          <NavLink to="/dashboard/employee/request-asset">Request Asset</NavLink>
          <NavLink to="/dashboard/employee/profile">Profile</NavLink>
        </>
      )}

      {user.role === "hr" && (
        <>
          <NavLink to="/dashboard/hr">Overview</NavLink>
          <NavLink to="/dashboard/hr/assets">Assets</NavLink>
          <NavLink to="/dashboard/hr/employees">Employees</NavLink>
          <NavLink to="/dashboard/hr/requests">Requests</NavLink>
        </>
      )}

      {user.role === "admin" && (
        <>
          <NavLink to="/dashboard/hr">Admin Dashboard</NavLink>
          <NavLink to="/dashboard/payments/packages">Packages</NavLink>
          <NavLink to="/dashboard/payments/history">Payment History</NavLink>
        </>
      )}
    </aside>
  );
};
export default Sidebar;