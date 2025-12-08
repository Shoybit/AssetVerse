import { Link, useNavigate } from 'react-router';

export default function Navbar() {
 const user = {
    name: "ss",
    role: "hr"
 }

  const nav = useNavigate();

  const doLogout = () => {
    nav('/');
  };

  return (
    <div className="navbar bg-base-200 shadow">
      <div className="container mx-auto">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">AssetVerse</Link>
        </div>

        <div className="flex-none gap-2">
          {!user ? (
            <>
              <Link to="/login" className="btn btn-ghost">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </>
          ) : (
            <>
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

              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-8 rounded-full bg-neutral-focus text-white flex items-center justify-center">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                </label>
                <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li><span className="font-medium">{user.name}</span></li>
                  <li><span className="text-xs">{user.email}</span></li>
                  <li><button onClick={doLogout}>Logout</button></li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
