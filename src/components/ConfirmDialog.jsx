import React from "react";

const ConfirmDialog = ({
  title = "Confirm",
  description = "",
  onCancel,
  onConfirm,
  loading = false,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="card w-full max-w-md">
        <div className="card-body">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-neutral my-3">{description}</p>

          <div className="flex justify-end gap-3">
            <button
              className="btn btn-ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className={`btn btn-error ${loading ? "loading" : ""}`}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Processing..." : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ConfirmDialog;