import React from "react";

export default function AssetCardFancy({ asset, onEdit, onDelete }) {
  const qty = asset.availableQuantity ?? asset.productQuantity ?? 0;
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border">
      <div className="h-44 bg-gray-50 flex items-center justify-center">
        {asset.productImage ? (
          <img
            src={asset.productImage}
            alt={asset.productName}
            className="object-contain h-full"
          />
        ) : (
          <div className="text-neutral">No image</div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-lg">{asset.productName}</h3>
            <div className="text-sm text-neutral">
              {asset.companyName || "—"}
            </div>
            <div className="mt-2 text-xs badge badge-outline">
              {asset.productType || "—"}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xl font-bold">{qty}</div>
            <div className="text-xs text-neutral">available</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button className="btn btn-sm btn-ghost" onClick={onEdit}>
            Edit
          </button>
          <button className="btn btn-sm btn-error" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
