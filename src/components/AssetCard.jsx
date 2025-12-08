import React from "react";

const AssetCard = ({ asset, onEdit, onDelete }) => {
  return (
    <div className="card shadow hover:shadow-lg transition">
      <figure className="h-40 bg-gray-100 flex items-center justify-center">
        {asset.productImage ? (
          // keep image aspect ratio constrained
          <img
            src={asset.productImage}
            alt={asset.productName}
            className="h-full object-contain"
          />
        ) : (
          <div className="text-sm text-neutral">No image</div>
        )}
      </figure>
      <div className="card-body p-4">
        <h3 className="font-medium">{asset.productName}</h3>
        <p className="text-sm text-neutral">{asset.productType}</p>
        <div className="mt-2 text-sm">
          <span className="mr-3">
            Available: <strong>{asset.availableQuantity ?? 0}</strong>
          </span>
          <span>
            Total: <strong>{asset.productQuantity ?? 0}</strong>
          </span>
        </div>

        <div className="card-actions mt-4">
          <button className="btn btn-sm btn-outline" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-error" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
export default AssetCard;
