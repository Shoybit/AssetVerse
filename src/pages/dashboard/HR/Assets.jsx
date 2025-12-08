import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import AssetCard from "../../../components/AssetCard";
import AddEditAssetModal from "../../../components/AddEditAssetModal";
import AuthContext from "../../../context/AuthContext";

const Assets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  const fetchAssets = async (p = page) => {
    setLoading(true);
    try {
      const res = await api.get(
        `/assets?page=${p}&limit=${limit}&company=${encodeURIComponent(
          user?.companyName || ""
        )}`
      );
      setAssets(res.data.items || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || p);
    } catch (err) {
      console.error("Load assets failed", err);
      alert(err.response?.data?.message || "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAddClick = () => {
    setEditingAsset(null);
    setShowModal(true);
  };

  const onEdit = (asset) => {
    setEditingAsset(asset);
    setShowModal(true);
  };

  const onDelete = async (assetId) => {
    if (!confirm("Delete this asset? This action cannot be undone.")) return;
    try {
      await api.delete(`/assets/${assetId}`);
      setAssets((prev) => prev.filter((a) => a._id !== assetId));
      alert("Asset deleted");
    } catch (err) {
      console.error("Delete failed", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };


  const onModalSaved = (savedAsset, mode) => {
    setShowModal(false);
    setEditingAsset(null);

    if (!savedAsset || !savedAsset._id) {
      fetchAssets(1);
      return;
    }

    if (mode === "add") {
      setAssets((prev) => [savedAsset, ...prev]);
    } else {
      setAssets((prev) =>
        prev.map((a) => (a._id === savedAsset._id ? savedAsset : a))
      );
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Assets</h2>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary" onClick={onAddClick}>
            Add Asset
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : assets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-neutral mb-4">No assets yet.</p>
          <button className="btn btn-outline" onClick={onAddClick}>
            Create your first asset
          </button>
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((a) => (
            <AssetCard
              key={a._id}
              asset={a}
              onEdit={() => onEdit(a)}
              onDelete={() => onDelete(a._id)}
            />
          ))}
        </div>
      )}

      {/* Pagination simple */}
      {total > limit && (
        <div className="flex items-center justify-center mt-6 gap-2">
          <button
            className="btn btn-sm"
            onClick={() => fetchAssets(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => fetchAssets(page + 1)}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </button>
        </div>
      )}

      {showModal && (
        <AddEditAssetModal
          initialData={editingAsset}
          onClose={() => {
            setShowModal(false);
            setEditingAsset(null);
          }}
          onSaved={onModalSaved}
        />
      )}
    </div>
  );
};

export default Assets;
