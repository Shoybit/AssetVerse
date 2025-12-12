import React, { useState } from "react";
import api from "../services/api";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

export default function AffiliationRow({ affiliation, onRemoved = () => {} }) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      html: `
        Remove <b>${affiliation.employeeName || affiliation.employeeEmail}</b> from your company?<br>
        <span style="font-size:13px;color:#666">This will return all assigned assets.</span>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e3342f",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Remove",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    // User clicked Yes → Call API
    setLoading(true);
    try {
      const emailParam = encodeURIComponent(affiliation.employeeEmail);
      const res = await api.delete(`/affiliations/${emailParam}`);

      toast.success(res.data?.message || "Employee removed");
      onRemoved(); // Refresh list
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to remove");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden shrink-0">
            {affiliation.companyLogo ? (
              <img src={affiliation.companyLogo} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-sm text-gray-500">
                {affiliation.employeeName ? affiliation.employeeName.charAt(0) : "U"}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{affiliation.employeeName || "Unnamed"}</div>
            <div className="text-xs text-neutral">{affiliation.employeeEmail}</div>
          </div>
        </div>
      </td>

      <td className="text-sm">{affiliation.employeeEmail}</td>
      <td className="text-sm">{affiliation.companyName || "-"}</td>
      <td className="text-sm">{new Date(affiliation.affiliationDate).toLocaleDateString()}</td>
      <td className="text-sm">{affiliation.status || "active"}</td>
      <td className="text-sm">{affiliation.assetsCount ?? 0}</td>

      <td>
        <button
          className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm"
          onClick={handleRemove}
          disabled={loading}
        >
          {loading ? "Removing..." : "Remove"}
        </button>
      </td>
    </tr>
  );
}
