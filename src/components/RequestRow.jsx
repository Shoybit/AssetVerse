// src/components/RequestRow.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import { toast } from "react-toastify";

function prettyDate(d) {
  try {
    return new Date(d).toLocaleString();
  } catch {
    return "-";
  }
}

export default function RequestRow({ req, onActionDone = () => {} }) {
  const [loading, setLoading] = useState(false);

  const requestId = req._id || req.id;
  const assetId =
    req.assetId ||
    req.asset ||
    (req.assetObj && (req.assetObj._id || req.assetObj.id));
  const assetName =
    req.assetName ||
    (req.assetObj && (req.assetObj.productName || req.assetObj.name));
  const requesterName =
    req.requesterName || req.requester || req.requesterFullName || "-";
  const requesterEmail =
    req.requesterEmail || req.requester_email || req.requesterEmail;

  const handleApprove = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/requests/${requestId}/approve`);
      toast.success(res?.data?.message || "Approved");
      onActionDone();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Approve failed"
      );
      onActionDone();
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    setLoading(true);
    try {
      const res = await api.put(`/requests/${requestId}/reject`);
      toast.success(res?.data?.message || "Rejected");
      onActionDone();
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Reject failed"
      );
      onActionDone();
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.tr
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
    >
      <td>
        <div className="font-medium">{requesterName}</div>
        <div className="text-xs text-neutral">{requesterEmail || "-"}</div>
      </td>

      <td>
        <div className="font-medium">{assetName || assetId || "Unknown"}</div>
        <div className="text-xs text-neutral">ID: {assetId || "-"}</div>
      </td>

      <td className="text-sm text-neutral">
        {prettyDate(req.requestDate || req.requestedAt || req.requestDate)}
      </td>

      <td className="text-sm">{req.note || "-"}</td>

      <td>
        <div className="flex items-center gap-2">
          <button
            className="px-3 py-1 bg-green-50 text-green-700 rounded text-sm"
            onClick={handleApprove}
            disabled={
              loading ||
              (req.requestStatus &&
                String(req.requestStatus).toLowerCase() !== "pending")
            }
          >
            {loading ? "..." : "Approve"}
          </button>

          <button
            className="px-3 py-1 bg-red-50 text-red-700 rounded text-sm"
            onClick={handleReject}
            disabled={
              loading ||
              (req.requestStatus &&
                String(req.requestStatus).toLowerCase() !== "pending")
            }
          >
            Reject
          </button>
        </div>
      </td>
    </motion.tr>
  );
}
