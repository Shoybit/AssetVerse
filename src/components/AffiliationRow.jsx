import React, { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export default function AffiliationRow({ affiliation, onRemoved = () => {} }) {
  const [loading, setLoading] = useState(false);

  const handleRemove = async () => {
    const ok = window.confirm(
      `Remove ${affiliation.employeeName || affiliation.employeeEmail} from your company? This will return assigned assets.`
    );
    if (!ok) return;

    setLoading(true);
    try {
      // call DELETE /affiliations/:employeeEmail
      const emailParam = encodeURIComponent(affiliation.employeeEmail);
      const res = await api.delete(`/affiliations/${emailParam}`);
      toast.success(res.data?.message || "Employee removed");
      onRemoved(); // parent will refresh list and counts
    } catch (err) {
      console.error("Remove affiliation failed:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to remove";
      toast.error(msg);
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
