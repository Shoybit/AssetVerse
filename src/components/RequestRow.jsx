// src/components/RequestRow.jsx
import React, { useState } from "react";
import api from "../services/api";

const RequestRow = ({ req, onActionDone }) => {
  const [loading, setLoading] = useState(false);

  const approve = async () => {
    setLoading(true);
    try {
      await api.put(`/requests/${req._id}/approve`);
      alert("Approved");
      onActionDone();
    } catch (err) {
      alert(err.response?.data?.message || "Approval failed");
    } finally {
      setLoading(false);
    }
  };

  const reject = async () => {
    setLoading(true);
    try {
      await api.put(`/requests/${req._id}/reject`);
      alert("Rejected");
      onActionDone();
    } catch (err) {
      alert(err.response?.data?.message || "Rejection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr>
      <td>
        <div>
          <div className="font-medium">{req.requesterName}</div>
          <div className="text-xs text-neutral">{req.requesterEmail}</div>
        </div>
      </td>

      <td>
        <div className="font-medium">{req.assetName}</div>
        <div className="text-xs text-neutral">{req.assetType}</div>
      </td>

      <td>{new Date(req.requestDate).toLocaleDateString()}</td>

      <td className="max-w-xs truncate">{req.note || "—"}</td>

      <td>
        <div className="flex gap-2">
          <button
            className={`btn btn-xs btn-primary ${loading ? "loading" : ""}`}
            onClick={approve}
            disabled={loading}
          >
            Approve
          </button>
          <button
            className={`btn btn-xs btn-error ${loading ? "loading" : ""}`}
            onClick={reject}
            disabled={loading}
          >
            Reject
          </button>
        </div>
      </td>
    </tr>
  );
}
export default RequestRow;