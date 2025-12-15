import React, { useState } from "react";
import api from "../services/api";

const RemoveAffiliationModal = ({
  affiliation,
  onClose,
  onRemoved,
}) => {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const doRemove = async () => {
    setLoading(true);
    setErr(null);
    try {
      await api.delete(
        `/affiliations/${encodeURIComponent(affiliation.employeeEmail)}`
      );

      // success
      onRemoved && onRemoved();
    } catch (e) {
      console.error("Remove affiliation error", e);
      setErr(e.response?.data?.message || "Failed to remove affiliation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="card w-full max-w-lg">
        <div className="card-body">
          <h3 className="text-xl font-semibold">Remove employee</h3>
          <p className="text-sm text-neutral mt-2">
            You are about to remove <strong>{affiliation.employeeName}</strong>{" "}
            ({affiliation.employeeEmail}) from your company.
          </p>
          <p className="text-sm text-warning mt-2">
            This will also mark any currently assigned items as returned and
            remove the affiliation. This action is transactional and cannot be
            undone.
          </p>

          {err && <div className="alert alert-error mt-3">{err}</div>}

          <div className="flex justify-end gap-3 mt-4">
            <button
              className="btn btn-ghost"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={`btn btn-error ${loading ? "loading" : ""}`}
              onClick={doRemove}
              disabled={loading}
            >
              {loading ? "Removing..." : "Remove employee"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RemoveAffiliationModal;