/* eslint-disable react-hooks/set-state-in-effect */
import React, { useContext, useEffect, useState } from "react";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthContext";

export default function MyProfile() {
  const { user, setUser } = useContext(AuthContext);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        phone: user.phone || "",
        address: user.address || "",
      });
      setPreview(user.photo || "");
    }

    api.get("/affiliations/my").then((res) => {
      setCompanies(res.data.items || []);
    });
  }, [user]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  image select
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPhotoFile(file);
    setPreview(URL.createObjectURL(file));
  };

  //  convert file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const saveProfile = async () => {
    setLoading(true);
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
      alert("Profile updated successfully");
    } catch (err) {
  console.error("UPDATE ERROR ", err.response?.data || err.message);
  alert(err.response?.data?.message || "Update failed");
}

  };

  return (
    <div className="max-w-xl">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>

      {/* Profile Image Preview */}
      <img
        src={preview || "/avatar.png"}
        className="w-24 h-24 rounded-full mb-3 object-cover border"
      />

      {/* File input */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
        className="file-input file-input-bordered w-full mb-3"
      />

      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Full name"
        className="input input-bordered w-full mb-3"
      />

      {/* READ ONLY EMAIL */}
      <input
        value={user.email}
        disabled
        className="input input-bordered w-full mb-3 bg-base-200"
      />

      <input
        name="phone"
        value={form.phone}
        onChange={handleChange}
        placeholder="Phone"
        className="input input-bordered w-full mb-3"
      />

      <textarea
        name="address"
        value={form.address}
        onChange={handleChange}
        placeholder="Address"
        className="textarea textarea-bordered w-full mb-4"
      />

      {/* Company affiliations */}
      <div className="mb-4">
        <h4 className="font-medium">Company Affiliations</h4>
        <ul className="list-disc ml-5 text-sm">
          {companies.map((c) => (
            <li key={c._id}>{c.companyName}</li>
          ))}
        </ul>
      </div>

      <button
        onClick={saveProfile}
        className={`btn btn-primary ${loading ? "loading" : ""}`}
      >
        Save Changes
      </button>
    </div>
  );
}
