import React from "react";

const PackageCard = ({ pkg, onBuy, disabled }) => {
  return (
    <div className="card shadow hover:shadow-lg transition">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{pkg.name}</h3>
          <div className="text-xl font-bold">${pkg.price}</div>
        </div>

        <p className="text-sm text-neutral mt-2">
          {pkg.features?.slice(0, 3).join(" • ")}
        </p>

        <div className="mt-4">
          <div className="text-xs text-neutral">Employee limit</div>
          <div className="font-medium">{pkg.employeeLimit}</div>
        </div>

        <div className="card-actions mt-4">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onBuy(pkg)}
            disabled={disabled}
          >
            Buy / Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
export default PackageCard;