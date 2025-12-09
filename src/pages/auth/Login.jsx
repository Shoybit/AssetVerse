// src/pages/auth/Login.jsx
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router"; // <-- fixed import

const Login = () => {
  const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      // login() from AuthContext returns res.data (usually { token, user })
      const res = await login(data.email, data.password);

      // normalize possible shapes:
      // - { token, user }
      // - { user }
      // - user (if login directly returned user)
      const possibleUser = (res && (res.user || res.data)) || res;
      const role = possibleUser?.role || (res && res.role);

      // if no role found, try to read from AuthContext (login should have set it)
      if (!role) {
        // fallback: navigate to home
        nav("/");
        return;
      }

      if (role === "hr") nav("/hr/assets");
      else nav("/my-assets");
    } catch (err) {
      console.error("Login error", err);
      const msg = err?.response?.data?.message || err.message || "Login failed";
      setServerError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Sign in to AssetVerse
          </h2>

          {serverError && (
            <div className="alert alert-error mb-3">
              <div>{serverError}</div>
            </div>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
            noValidate
          >
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="you@company.com"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
              />
              {errors.email && (
                <p className="text-sm text-error mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                type="password"
                placeholder="••••••••"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />
              {errors.password && (
                <p className="text-sm text-error mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link to="/register-employee" className="link">
                Create an account
              </Link>
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
