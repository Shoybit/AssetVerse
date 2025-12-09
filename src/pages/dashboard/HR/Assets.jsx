// src/pages/dashboard/HR/AssetsFancy.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import Skeleton from "../../../components/Skeleton";
import AddEditAssetModal from "../../../components/AddEditAssetModal";
import AssetCard from "../../../components/AssetCard";
import AuthContext from "../../../context/AuthContext";
import { toast } from "react-toastify";

export default function AssetsFancy() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(null); // asset object to edit
  const [modalOpen, setModalOpen] = useState(false);

  const load = async (p = 1, query = q, type = typeFilter) => {
    setLoading(true);
    try {
      const params = `?page=${p}&limit=${limit}${
        query ? `&q=${encodeURIComponent(query)}` : ""
      }${type && type !== "all" ? `&type=${encodeURIComponent(type)}` : ""}`;
      const res = await api.get(`/assets${params}`);
      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || p);
    } catch (err) {
      console.error("Load assets error", err);
      toast.error(err?.response?.data?.message || "Failed to load assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []); // eslint-disable-line

  const handleDelete = async (assetId) => {
    if (!confirm("Delete this asset? This is permanent.")) return;
    try {
      await api.delete(`/assets/${assetId}`);
      toast.success("Asset deleted");
      load(1);
    } catch (err) {
      console.error("Delete error", err);
      toast.error(err?.response?.data?.message || "Failed to delete asset");
    }
  };

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (asset) => {
    setEditing(asset);
    setModalOpen(true);
  };

  const onSaved = () => {
    setModalOpen(false);
    load(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Assets</h2>
          <p className="text-sm text-neutral">
            Manage inventory for {user?.companyName || "your company"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name or company"
              className="input input-bordered"
            />
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="select select-bordered"
            >
              <option value="all">All types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
            <button className="btn" onClick={() => load(1)}>
              Search
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => {
                setQ("");
                setTypeFilter("all");
                load(1);
              }}
            >
              Reset
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              className="btn btn-outline hidden md:inline"
              onClick={() => window.print()}
            >
              Print
            </button>
            <button className="btn btn-primary" onClick={openCreate}>
              + New Asset
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton count={6} height="h-40" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-neutral">No assets found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((a) => (
            <AssetCard
              key={a._id}
              asset={a}
              onEdit={() => openEdit(a)}
              onDelete={() => handleDelete(a._id)}
            />
          ))}
        </div>
      )}

      {total > limit && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="btn btn-sm"
            onClick={() => load(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => load(page + 1)}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </button>
        </div>
      )}

      {modalOpen && (
        <AddEditAssetModal
          asset={editing}
          onClose={() => setModalOpen(false)}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
