import React, { useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiMapPin,
  FiUpload,
  FiSave,
  FiBriefcase,
  FiCamera,
} from "react-icons/fi";

/* ===== Page Loader (ADDED) ===== */
function PageLoader({ text = "Loading profile..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}
/* ============================== */

export default function MyProfile() {
  const { user, setUser } = useContext(AuthContext);

  const [initialLoading, setInitialLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [companies, setCompanies] = useState([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        if (user) {
          setForm({
            name: user.name || "",
            phone: user.phone || "",
            address: user.address || "",
          });
          setPreview(user.photo || "");
        }

        const res = await api.get("/affiliations/my");
        setCompanies(res.data.items || []);
      } catch (err) {
        console.error("Profile load failed", err);
      } finally {
        setInitialLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  /* ===== PAGE LOAD → LOADER ===== */
  if (initialLoading) {
    return <PageLoader text="Preparing your profile..." />;
  }
  /* =============================== */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size should be less than 5MB", "error");
      return;
    }

    if (!file.type.includes("image/")) {
      showToast("Please select an image file", "error");
      return;
    }

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const saveProfile = async () => {
    setSaving(true);
    try {
      let photoBase64 = preview;

      if (photoFile) {
        photoBase64 = await toBase64(photoFile);
      }

      const res = await api.put("/users/me", {
        ...form,
        photo: photoBase64,
      });

      setUser(res.data.user);
      showToast("Profile updated successfully!", "success");
    } catch (err) {
      console.error("UPDATE ERROR ", err.response?.data || err.message);
      showToast(
        err.response?.data?.message || "Update failed. Please try again.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  };


  return (
    <div className="max-12/12 mx-auto px-4 py-8">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Profile</span></h1>
        <p className="text-gray-600">
          Manage your personal information and company affiliations
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Image & Companies */}
        <div className="lg:col-span-1 space-y-8">
          {/* Profile Image Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="text-center">
              <div className="relative inline-block mb-6">
                <div className="w-48 h-48 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50">
                  <img
                    src={preview || "/avatar.png"}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/avatar.png";
                    }}
                  />
                </div>
                
                <label className="absolute bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg cursor-pointer transition-all duration-200 hover:scale-105">
                  <FiCamera size={18} />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="hidden"
                  />
                </label>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-3">Profile Picture</h3>
              
              <label className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer font-medium">
                <FiUpload />
                Upload New Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>
              <p className="text-xs text-gray-500 mt-3">
                JPG, PNG or GIF • Max 5MB
              </p>
            </div>
          </div>

          {/* Companies Card */}
          {companies.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiBriefcase className="text-blue-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Company Affiliations</h3>
              </div>
              
              <div className="space-y-4">
                {companies.map((c) => (
                  <div
                    key={c._id}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                      <FiBriefcase className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{c.companyName}</p>
                      {c.role && (
                        <p className="text-sm text-gray-600 mt-1">{c.role}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FiUser className="text-blue-600" size={20} />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
            </div>

            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" />
                  </div>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Email Field (Read-only) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    value={user?.email || ""}
                    disabled
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                    Read-only
                  </span>
                </div>
              </div>

              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiPhone className="text-gray-400" />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Address Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3">
                    <FiMapPin className="text-gray-400" />
                  </div>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Enter your complete address"
                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                    rows="4"
                  />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <button
                onClick={saveProfile}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <FiSave />
                    Save Changes
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500 mt-4">
                Your profile information is private and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}