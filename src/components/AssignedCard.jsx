// src/components/AssignedCard.jsx
import React, { useState } from "react";
import api from "../services/api";
import ConfirmDialog from "./ConfirmDialog";

const AssignedCard = ({ assigned, onReturned }) => {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const isReturned = assigned.status === "returned";

  const doReturn = async () => {
    setLoading(true);
    try {
      await api.post(`/assigned-assets/${assigned._id}/return`);
      // call parent to update UI
      onReturned(assigned._id);
      setConfirmOpen(false);
      // small success feedback
      alert("Return processed successfully");
    } catch (err) {
      console.error("Return failed", err);
      alert(err.response?.data?.message || "Failed to process return");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow hover:shadow-lg transition">
      <figure className="h-36 bg-base-200 flex items-center justify-center">
        {assigned.assetImage ? (
          <img
            src={assigned.assetImage}
            alt={assigned.assetName}
            className="h-full object-contain"
          />
        ) : (
          <span className="text-sm text-neutral">No image</span>
        )}
      </figure>

      <div className="card-body p-4">
        <h3 className="font-medium">{assigned.assetName}</h3>
        <p className="text-sm text-neutral">{assigned.assetType}</p>

        <div className="mt-2 text-sm">
          <div>
            Company: <strong>{assigned.companyName || "—"}</strong>
          </div>
          <div>
            Assigned:{" "}
            <strong>
              {new Date(assigned.assignmentDate).toLocaleString()}
            </strong>
          </div>
          <div>
            Status:{" "}
            <strong className={isReturned ? "text-success" : "text-primary"}>
              {assigned.status}
            </strong>
          </div>
          {assigned.returnDate && (
            <div>
              Returned:{" "}
              <strong>{new Date(assigned.returnDate).toLocaleString()}</strong>
            </div>
          )}
        </div>

        <div className="card-actions mt-4">
          <button
            className="btn btn-sm btn-outline"
            onClick={() => setConfirmOpen(true)}
            disabled={isReturned || loading}
          >
            Return
          </button>
        </div>
      </div>

      {confirmOpen && (
        <ConfirmDialog
          title="Return asset"
          description="Are you sure you want to return this asset? This will mark it as returned and update inventory."
          onCancel={() => setConfirmOpen(false)}
          onConfirm={doReturn}
          loading={loading}
        />
      )}
    </div>
  );
};
export default AssignedCard;
