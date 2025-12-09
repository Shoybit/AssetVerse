// src/pages/auth/RegisterEmployee.jsx
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function RegisterEmployee() {
  const { register: registerApi } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      // payload shape matches backend registration expectations
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        role: "employee",
        profileImage: data.profileImage || null,
      };
      await registerApi(payload);
      nav("/my-assets");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <div className="card shadow-lg">
        <div className="card-body">
          <h2 className="text-2xl font-semibold text-center mb-4">
            Create employee account
          </h2>

          {serverError && (
            <div className="alert alert-error mb-3">{serverError}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Full name</span>
              </label>
              <input
                {...register("name", { required: "Name required" })}
                className={`input input-bordered w-full ${
                  errors.name ? "input-error" : ""
                }`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", { required: "Email required" })}
                type="email"
                className={`input input-bordered w-full ${
                  errors.email ? "input-error" : ""
                }`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password required",
                  minLength: 6,
                })}
                type="password"
                className={`input input-bordered w-full ${
                  errors.password ? "input-error" : ""
                }`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Date of birth</span>
              </label>
              <input
                {...register("dateOfBirth", { required: "DOB required" })}
                type="date"
                className={`input input-bordered w-full ${
                  errors.dateOfBirth ? "input-error" : ""
                }`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Profile image URL (optional)</span>
              </label>
              <input
                {...register("profileImage")}
                className="input input-bordered w-full"
                placeholder="https://..."
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create account"}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => (nav("/"))}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
