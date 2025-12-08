// src/components/RequestCard.jsx
import React, { useState } from "react";
import api from "../../services/api";

const RequestCard = ({ asset, onClose, onRequested }) => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [success, setSuccess] = useState(null);

  const submitRequest = async () => {
    setLoading(true);
    setErr(null);
    try {
      await api.post("/requests", {
        assetId: asset._id,
        note: note || null,
      });
      setSuccess("Request sent successfully!");
      setTimeout(() => {
        onRequested();
      }, 600);
    } catch (e) {
      setErr(e.response?.data?.message || "Failed to submit request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-xl font-semibold">Request Asset</h2>
          <p className="text-neutral text-sm mb-2">{asset.productName}</p>

          {err && <p className="text-error text-sm">{err}</p>}
          {success && <p className="text-success text-sm">{success}</p>}

          <textarea
            className="textarea textarea-bordered w-full"
            placeholder="Write a note (optional)"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div className="flex justify-end gap-2 mt-4">
            <button className="btn btn-ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              className={`btn btn-primary ${loading ? "loading" : ""}`}
              onClick={submitRequest}
              disabled={loading}
            >
              Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RequestCard;
