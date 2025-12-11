import React, { useEffect, useState, useCallback, useContext } from "react";
import api from "../../../services/api";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import { Link } from "react-router";
import AssetModal from "../../../components/AssetModal";

function normalizeToArray(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (Array.isArray(data.items)) return data.items;
  if (Array.isArray(data.assets)) return data.assets;
  if (data.data && Array.isArray(data.data.items)) return data.data.items;
  if (data.data && Array.isArray(data.data.assets)) return data.data.assets;
  if (typeof data === "object" && (data._id || data.id || data.productName)) return [data];
  return [];
}

/* Simple Confirm Modal component */
function ConfirmModal({ open, title, children, onCancel, onConfirm, confirming }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="bg-base-100 rounded-lg w-full max-w-md shadow-lg p-6 z-10">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <div className="text-sm text-neutral mb-4">{children}</div>
        <div className="flex justify-end gap-3">
          <button type="button" className="btn btn-ghost" onClick={onCancel} disabled={confirming}>Cancel</button>
          <button type="button" className={`btn btn-error ${confirming ? "loading" : ""}`} onClick={onConfirm} disabled={confirming}>
            {confirming ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* Undo banner shown after optimistic delete */
function UndoBanner({ visible, name, onUndo }) {
  if (!visible) return null;
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
      <div className="bg-white border shadow-md rounded-full px-4 py-2 flex items-center gap-4">
        <div className="text-sm">Deleted <strong>{name}</strong></div>
        <button className="btn btn-sm btn-ghost" onClick={onUndo}>Undo</button>
      </div>
    </div>
  );
}

export default function AssetList() {
  const { user } = useContext(AuthContext);
  const canDelete = user?.role === "hr" || user?.isAdmin;

  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [, setRawResponse] = useState(null);

  // modal edit/create
  const [editing, setEditing] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [confirming, setConfirming] = useState(false);

  // optimistic delete pending map: id -> { asset, timeoutId }
  const [pendingDeletes, setPendingDeletes] = useState({}); // { [id]: { asset, timeout } }

  const loadAssets = useCallback(async () => {
    setLoading(true);
    setRawResponse(null);
    try {
      const res = await api.get("/assets");
      setRawResponse(res.data);
      setAssets(normalizeToArray(res.data));
    } catch (err) {
      console.error("Load assets failed:", err);
      try {
        const res2 = await api.get("/hr/assets");
        setRawResponse(res2.data);
        setAssets(normalizeToArray(res2.data));
      } catch (err2) {
        console.error("Fallback load failed:", err2);
        toast.error("Failed to load assets");
        setAssets([]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAssets();
  }, [loadAssets]);

  const filtered = assets.filter((a) => {
    const name = (a?.productName || a?.name || "").toString().toLowerCase();
    const type = (a?.productType || a?.type || "").toString().toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || type.includes(q);
  });

  // open edit/create modal
  const openEditModal = (asset) => {
    setEditing(asset || null);
    setModalOpen(true);
  };

  // (A) Optimistic delete: schedule actual DELETE after delay
  const scheduleDelete = (asset) => {
    const id = asset._id || asset.id;
    setAssets((prev) => prev.filter((p) => (p._id || p.id) !== id));
    const timeout = setTimeout(async () => {
      try {
        await api.delete(`/assets/${id}`);
        setPendingDeletes((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
        toast.success("Asset deleted");
      } catch (err) {
        toast.error(err?.response?.data?.message || "Delete failed");
        setAssets((prev) => [asset, ...prev]);
        setPendingDeletes((prev) => {
          const copy = { ...prev };
          delete copy[id];
          return copy;
        });
      }
    }, 3000); 

    setPendingDeletes((prev) => ({ ...prev, [id]: { asset, timeout } }));
  };

  // user clicked Delete (from row) -> open confirm modal
  const onRequestDelete = (asset) => {
    if (!canDelete) {
      toast.error("You are not authorized to delete assets.");
      return;
    }
    setDeleteTarget(asset);
    setConfirmOpen(true);
  };

  // user confirms in modal
  const onConfirmDelete = async () => {
    if (!deleteTarget) return;
    setConfirming(true);
    try {
      scheduleDelete(deleteTarget);
      setConfirmOpen(false);
      setDeleteTarget(null);
    } finally {
      setConfirming(false);
    }
  };

  // undo a pending delete
  const undoDelete = (id) => {
    const entry = pendingDeletes[id];
    if (!entry) return;
    clearTimeout(entry.timeout);
    setPendingDeletes((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setAssets((prev) => [entry.asset, ...prev]);
    toast.info("Delete undone");
  };

const handleSaved = (saved) => {
  const assetObj = saved?.asset || saved;
  if (!assetObj) {
    loadAssets();
    return;
  }

  let id = assetObj._id || assetObj.id;
  if (!id && editing) {
    id = editing._id || editing.id;
    if (id) {
      assetObj._id = id; 
    }
  }

  if (!assetObj.createdAt) assetObj.createdAt = new Date().toISOString();

  setAssets((prev) => {
    if (!id) {
      return [assetObj, ...prev];
    }
    const exists = prev.find((p) => (p._id || p.id) === id);
    if (exists) {
      return prev.map((p) => ((p._id || p.id) === id ? { ...p, ...assetObj } : p));
    } else {
      return [assetObj, ...prev];
    }
  });

  setModalOpen(false);
  setEditing(null);
  toast.success("Saved");
};


  return (
    <div className="min-h-screen ">
      <div className="max-w-11/12 mx-auto">
        {/* header + actions */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Asset <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Inventory</span></h1>
              <p className="text-gray-600">Manage and organize your company assets efficiently</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search assets by name or type..."
                  className="pl-10 pr-4 py-2.5 w-full sm:w-72 bg-white border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              <button onClick={loadAssets} disabled={loading} className="px-6 py-2.5 bg-linear-to-r from-blue-500 to-blue-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition">
                {loading ? "Loading..." : "Refresh"}
              </button>


            </div>
          </div>
        </div>

        {/* table (same layout as you provided) */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 bg-linear-to-r from-gray-50 to-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">Asset Details</h2>
              <span className="text-sm text-gray-600">Showing {filtered.length} of {assets.length} assets</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 backdrop-blur-sm">
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Asset</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Name</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Type</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Quantity</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Date Added</th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b border-gray-200">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="6" className="py-16 text-center">Loading assets...</td></tr>
                ) : filtered.length === 0 ? (
                  <tr><td colSpan="6" className="py-16 text-center">No assets found.</td></tr>
                ) : (
                  filtered.map((asset) => {
                    const id = asset._id || asset.id;
                    const quantity = asset.productQuantity ?? asset.quantity ?? 0;
                    return (
                      <tr key={id || JSON.stringify(asset)} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <div className="w-14 h-14 rounded-xl overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 border border-gray-200 shadow-sm">
                              <img src={asset.productImage || asset.image || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop"} alt={asset.productName || asset.name || "asset"} className="w-full h-full object-cover" onError={(e)=>{ e.target.onerror=null; e.target.src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop"; }} />
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <div>
                            <div className="font-semibold text-gray-900">{asset.productName || asset.name || "Unnamed Asset"}</div>
                            {asset.description && <div className="text-sm text-gray-600 mt-1 line-clamp-1">{asset.description}</div>}
                          </div>
                        </td>

                        <td className="py-4 px-6">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">{asset.productType || asset.type || "Unknown"}</span>
                        </td>

                        <td className="py-4 px-6"><div className="text-lg font-bold">{quantity}</div></td>

                        <td className="py-4 px-6">{asset.createdAt ? new Date(asset.createdAt).toLocaleDateString() : asset.dateAdded ? new Date(asset.dateAdded).toLocaleDateString() : "N/A"}</td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEditModal(asset)} className="inline-flex items-center px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 font-medium text-sm">
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                              Edit
                            </button>

                            <button onClick={() => onRequestDelete(asset)} className="inline-flex items-center px-3 py-1.5 bg-red-50 text-red-700 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium text-sm" disabled={!canDelete} title={!canDelete ? "Only HR/Admin can delete" : "Delete"}>
                              <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* footer */}
          {filtered.length > 0 && (
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50/50">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div>Page 1 of 1 • {filtered.length} items</div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">◀</button>
                  <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">▶</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Undo banner: show top-most pending delete */}
      {Object.keys(pendingDeletes).length > 0 && (
        <UndoBanner
          visible={true}
          name={Object.values(pendingDeletes)[0].asset.productName || Object.values(pendingDeletes)[0].asset.name}
          onUndo={() => undoDelete(Object.keys(pendingDeletes)[0])}
        />
      )}

      {/* confirm modal */}
      <ConfirmModal
        open={confirmOpen}
        title="Delete asset"
        onCancel={() => { setConfirmOpen(false); setDeleteTarget(null); }}
        onConfirm={onConfirmDelete}
        confirming={confirming}
      >
        Are you sure you want to delete <strong>{deleteTarget?.productName || deleteTarget?.name}</strong>? You can undo for 8 seconds.
      </ConfirmModal>

      {/* edit/create modal */}
        {modalOpen && (
          <AssetModal
            asset={editing}
            onClose={() => { setModalOpen(false); setEditing(null); }}
            onSaved={(res) => handleSaved(res)}
          />
        )}

    </div>
  );
}
