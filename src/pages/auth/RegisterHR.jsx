/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../../context/AuthContext";
import { useNavigate, Link } from "react-router";
import { 
  User, 
  Mail, 
  Lock, 
  Calendar, 
  Building2, 
  Image as ImageIcon,
  Users,
  ArrowRight,
  X,
  Briefcase
} from "lucide-react";

function PageLoader({ text = "Loading your assets..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function RegisterHR() {
    useEffect(() => {
    document.title = "RegisterHR | AssetVerse";
  }, []);
  const { register: registerApi } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { 
      role: "hr",
      packageLimit: 5 
    },
  });
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    
      /* -------- Page load loader -------- */
      useEffect(() => {
        const timer = setTimeout(() => {
          setPageLoading(false);
        }, 600); // smooth UX
    
        return () => clearTimeout(timer);
      }, []);
    

  const companyLogoUrl = watch("companyLogo");

  // Handle logo preview
  useEffect(() => {
    if (companyLogoUrl) {
      setLogoPreview(companyLogoUrl);
    } else {
      setLogoPreview(null);
    }
  }, [companyLogoUrl]);

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
        packageSubscription: "Basic",
        packageLimit: data.packageLimit ? Number(data.packageLimit) : 5,
        currentEmployees: 0,
      };
      await registerApi(payload);
      navigate("/hr/assets");
    } catch (err) {
      setServerError(
        err?.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const clearLogo = () => {
    setLogoPreview(null);
  };


  if (pageLoading) {
  return <PageLoader text="Preparing Regester HR Manager screen..." />;
}

if (loading) {
  return <PageLoader text="Signing you in..." />;
}


  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
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

        {/* Main Registration Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
          {/* Premium Header Section */}
          <div className="px-10 pt-10 pb-8 bg-linear-to-r from-blue-600 to-indigo-700 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl p-3 mb-4">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold mb-2">HR Manager Registration</h1>
                <p className="text-blue-100">
                  Set up your company's asset management system
                </p>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold">Basic Plan</div>
                  <div className="text-sm text-blue-100">Starting Package</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="px-10 py-10">
            {serverError && (
              <div className="mb-8 animate-fade-in">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
                  <div className="flex items-center">
                    <div className="shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-red-700 font-medium">{serverError}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
                  <h2 className="ml-4 text-lg font-semibold text-gray-900">Personal Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("name", { required: "Full name is required" })}
                        type="text"
                        placeholder="John Smith"
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
                      Email Address *
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
                        placeholder="hr@company.com"
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
                      Password *
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
                      Minimum 6 characters
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
                        {...register("dateOfBirth")}
                        type="date"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Company Information Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="w-10 h-1 bg-indigo-600 rounded-full"></div>
                  <h2 className="ml-4 text-lg font-semibold text-gray-900">Company Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Company Name */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("companyName", {
                          required: "Company name is required",
                        })}
                        type="text"
                        placeholder="TechCorp International"
                        className={`pl-10 w-full px-4 py-3 border ${
                          errors.companyName
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        } rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200`}
                        disabled={loading}
                      />
                    </div>
                    {errors.companyName && (
                      <p className="mt-2 text-sm text-red-600">{errors.companyName.message}</p>
                    )}
                  </div>

                  {/* Company Logo */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Logo URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        {...register("companyLogo")}
                        type="url"
                        placeholder="https://company.com/logo.png"
                        className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        disabled={loading}
                      />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      Enter a valid image URL for your company logo
                    </p>

                    {/* Logo Preview */}
                    {logoPreview && (
                      <div className="mt-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Logo Preview</span>
                          <button
                            type="button"
                            onClick={clearLogo}
                            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="border-2 border-dashed border-gray-200 rounded-xl overflow-hidden bg-gray-50">
                          <img
                            src={logoPreview}
                            alt="Company logo preview"
                            className="w-full h-48 object-contain p-4"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = "https://via.placeholder.com/400x200?text=Invalid+Logo+URL";
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>


                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={loading}
                  className={`flex-1 flex justify-center items-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-base font-semibold text-white ${
                    loading
                      ? "bg-blue-400 cursor-not-allowed"
                      : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating HR Account...
                    </>
                  ) : (
                    <>
                      Create HR Manager Account
                      <ArrowRight className="ml-3 w-5 h-5" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="py-4 px-6 border-2 border-gray-300 rounded-xl text-base font-semibold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Terms & Contact */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-500 mb-4 md:mb-0">
                  Already have an account?{" "}
                  <Link to="/login" className="text-blue-600 hover:text-blue-500 font-semibold">
                    Sign in here
                  </Link>
                </p>
                <div className="text-xs text-gray-500 text-center md:text-right">
                  <p>
                    By registering, you agree to our{" "}
                    <Link to="/terms" className="text-blue-600 hover:text-blue-500">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-blue-600 hover:text-blue-500">
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}