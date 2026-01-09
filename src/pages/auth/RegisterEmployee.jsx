import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { User, Mail, Lock, Calendar, Image, ArrowRight, X } from "lucide-react";


function PageLoader({ text = "Loading your assets..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function RegisterEmployee() {
    useEffect(() => {
    document.title = "RegisterEmployee | AssetVerse";
  }, []);
  const { register: registerApi } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  
    /* -------- Page load loader -------- */
    useEffect(() => {
      const timer = setTimeout(() => {
        setPageLoading(false);
      }, 600); // smooth UX
  
      return () => clearTimeout(timer);
    }, []);
  

  const profileImageUrl = watch("profileImage");

  // Handle image preview
  React.useEffect(() => {
    if (profileImageUrl) {
      setImagePreview(profileImageUrl);
    } else {
      setImagePreview(null);
    }
  }, [profileImageUrl]);

  const onSubmit = async (data) => {
    setServerError(null);
    setLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        role: "employee",
        profileImage: data.profileImage || null,
      };
      await registerApi(payload);
      navigate("/dashboard");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearImage = () => {
    setImagePreview(null);
  };


  if (pageLoading) {
  return <PageLoader text="Preparing Regester Employee screen..." />;
}

if (loading) {
  return <PageLoader text="Signing you in..." />;
}


  return (
    <div className="min-h-screen bg-gradient-to-brpy-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        {/* Back to Home Link */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to home
          </Link>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="px-8 pt-8 pb-6 bg-linear-to-r from-blue-50 to-indigo-50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-linear-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg mb-4">
                <User className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Join AssetVerse
              </h1>
              <p className="text-gray-600">
                Create your employee account to get started
              </p>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-8 py-8">
            {serverError && (
              <div className="mb-6 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700">{serverError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("name", { required: "Full name is required" })}
                    type="text"
                    placeholder="John Doe"
                    className={`pl-10 w-full px-4 py-3 border ${
                      errors.name
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="email"
                    placeholder="john.doe@company.com"
                    className={`pl-10 w-full px-4 py-3 border ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    type="password"
                    placeholder="••••••••"
                    className={`pl-10 w-full px-4 py-3 border ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.password && (
                  <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>
                )}
                <p className="mt-2 text-xs text-gray-500">
                  Must be at least 6 characters long
                </p>
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("dateOfBirth", { required: "Date of birth is required" })}
                    type="date"
                    className={`pl-10 w-full px-4 py-3 border ${
                      errors.dateOfBirth
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="mt-2 text-sm text-red-600">{errors.dateOfBirth.message}</p>
                )}
              </div>

              {/* Profile Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL (Optional)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Image className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    {...register("profileImage")}
                    type="url"
                    placeholder="https://example.com/profile.jpg"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={loading}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Enter a valid image URL. Image will be previewed below.
                </p>

                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Preview</span>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-full h-48 object-cover"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Image+URL";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
                  disabled={loading}
                >
                  Already have an account? Sign in
                </button>
              </div>
            </form>

            {/* Terms & Privacy */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                By creating an account, you agree to our{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-500 font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-blue-600 hover:text-blue-500 font-medium">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <Link to="/contact" className="text-blue-600 hover:text-blue-500 font-medium">
              Contact support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}