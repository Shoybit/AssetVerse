import React, { useState } from "react";
import RemoveAffiliationModal from "./RemoveAffiliationModal";

const AffiliationRow= ({ affiliation, onRemoved }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <tr>
        <td>
          <div className="font-medium">{affiliation.employeeName}</div>
        </td>
        <td className="text-sm text-neutral">{affiliation.employeeEmail}</td>
        <td className="text-sm">{affiliation.companyName || "—"}</td>
        <td>{new Date(affiliation.affiliationDate).toLocaleDateString()}</td>
        <td>
          <span
            className={`badge ${
              affiliation.status === "active" ? "badge-success" : "badge-ghost"
            }`}
          >
            {affiliation.status}
          </span>
        </td>
        <td className="text-sm">
          {/* placeholder if you have assigned count */}—
        </td>
        <td>
          <div className="flex gap-2">
            <button
              className="btn btn-sm btn-error"
              onClick={() => setModalOpen(true)}
            >
              Remove
            </button>
          </div>
        </td>
      </tr>

      {modalOpen && (
        <RemoveAffiliationModal
          affiliation={affiliation}
          onClose={() => setModalOpen(false)}
          onRemoved={() => {
            setModalOpen(false);
            onRemoved && onRemoved();
          }}
        />
      )}
    </>
  );
}
export default AffiliationRow;