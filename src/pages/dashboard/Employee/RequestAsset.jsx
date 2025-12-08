import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import RequestCard from "../../../components/RequestCard";

const RequestAsset = () => {
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assets?page=1&limit=50");
      setAssets(res.data.items || []);
    } catch (err) {
      console.error("Failed to load assets", err);
      alert(err.response?.data?.message || "Failed to fetch assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Request an Asset</h2>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <div key={asset._id} className="card shadow">
              <figure className="h-36 bg-base-200 flex items-center justify-center">
                {asset.productImage ? (
                  <img
                    src={asset.productImage}
                    alt={asset.productName}
                    className="h-full object-contain"
                  />
                ) : (
                  <span className="text-sm text-neutral">No image</span>
                )}
              </figure>
              <div className="card-body">
                <h3 className="font-medium">{asset.productName}</h3>
                <p className="text-sm">{asset.productType}</p>
                <p className="text-sm mb-2">
                  Available:{" "}
                  <strong className="text-primary">
                    {asset.availableQuantity}
                  </strong>
                </p>

                <button
                  className="btn btn-primary btn-sm"
                  disabled={asset.availableQuantity <= 0}
                  onClick={() => setSelectedAsset(asset)}
                >
                  Request
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Request modal */}
      {selectedAsset && (
        <RequestCard
          asset={selectedAsset}
          onClose={() => setSelectedAsset(null)}
          onRequested={() => {
            setSelectedAsset(null);
            loadAssets();
          }}
        />
      )}
    </div>
  );
}
export default RequestAsset;