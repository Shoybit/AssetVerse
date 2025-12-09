// src/pages/auth/RegisterHR.jsx
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function RegisterHR() {
  const { register: registerApi } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { role: "hr" },
  });
  const nav = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);

  
  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth || null,
        role: "hr",
        companyName: data.companyName,
        companyLogo: data.companyLogo || null,
        // Optional: send package defaults; backend should enforce defaults if omitted
        packageSubscription: "Basic",
        packageLimit: data.packageLimit ? Number(data.packageLimit) : 5,
        currentEmployees: 0,
      };
      await registerApi(payload);
      nav("/hr/assets");
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
            Create HR Manager account
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                  {...register("dateOfBirth")}
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Company name</span>
              </label>
              <input
                {...register("companyName", {
                  required: "Company name required",
                })}
                className={`input input-bordered w-full ${
                  errors.companyName ? "input-error" : ""
                }`}
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Company logo URL (optional)</span>
              </label>
              <input
                {...register("companyLogo")}
                className="input input-bordered w-full"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">
                  Initial package limit (optional)
                </span>
              </label>
              <input
                {...register("packageLimit")}
                type="number"
                min={1}
                className="input input-bordered w-full"
                placeholder="5"
              />
              <p className="text-xs text-neutral mt-1">
                Leave blank to use default Basic package limit.
              </p>
            </div>

            <div className="flex items-center justify-between">
              <button
                className={`btn btn-primary ${loading ? "loading" : ""}`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create HR account"}
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
