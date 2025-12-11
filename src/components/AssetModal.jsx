import React, { useEffect, useState, useContext } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

/**
 * AssetModal
 * - onSaved(savedAsset) will be called with the saved asset object (returned by backend)
 */
export default function AssetModal({ asset = null, onClose = () => {}, onSaved = () => {} }) {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    productName: "",
    productType: "Returnable",
    productQuantity: 1,
    availableQuantity: 1,
    productImage: "",
    companyName: "",
    description: "",
  });
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  useEffect(() => {
    if (asset) {
      setForm({
        productName: asset.productName || asset.name || "",
        productType: asset.productType || asset.type || "Returnable",
        productQuantity: asset.productQuantity ?? asset.quantity ?? 1,
        availableQuantity:
          asset.availableQuantity ?? asset.productQuantity ?? asset.quantity ?? 1,
        productImage: asset.productImage || asset.image || "",
        companyName: asset.companyName || "",
        description: asset.description || "",
      });
      setServerError("");
    } else {
      // reset for create
      setForm({
        productName: "",
        productType: "Returnable",
        productQuantity: 1,
        availableQuantity: 1,
        productImage: "",
        companyName: "",
        description: "",
      });
      setServerError("");
    }
  }, [asset]);

  const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // Try to extract an asset object from various response shapes
  function extractAssetFromResponse(resData) {
    if (!resData) return null;
    if (typeof resData !== "object") return null;

    // Common shapes:
    // - res.data is asset (handled by caller passing res.data)
    // - { asset: {...} }
    // - { data: {...} } or { data: { asset: {...} } }
    // - { success: true, asset: {...} }
    if (resData.asset && typeof resData.asset === "object") return resData.asset;
    if (resData.data && typeof resData.data === "object") {
      if (resData.data.asset) return resData.data.asset;
      return resData.data;
    }

    // If object has asset-like keys, assume it is the asset
    const keys = Object.keys(resData);
    const likelyAssetKeys = ["_id", "id", "productName", "name", "productType", "quantity", "productQuantity"];
    if (keys.some((k) => likelyAssetKeys.includes(k))) return resData;

    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setServerError("");

    try {
      const payload = {
        productName: String(form.productName).trim(),
        productType: String(form.productType).trim(),
        productQuantity: Number(form.productQuantity) || 0,
        availableQuantity: Number(form.availableQuantity) || 0,
        productImage: String(form.productImage).trim(),
        companyName: String(form.companyName).trim(),
        description: String(form.description).trim(),
      };

      // Client-side hint: addedBy so HR users see their created asset immediately (server should set this ideally)
      if (!asset && user && (user._id || user.id)) {
        payload.addedBy = user._id || user.id;
      }

      let res;
      if (asset && (asset._id || asset.id)) {
        // update
        res = await api.put(`/assets/${asset._id || asset.id}`, payload);
        toast.success("Asset updated");
      } else {
        // create
        res = await api.post("/assets", payload);
        toast.success("Asset created");
      }

      // Prefer actual asset object from response
      const returned = extractAssetFromResponse(res?.data);

      if (returned) {
        // ensure addedBy exists (help ownership filtering)
        if (!returned.addedBy && user && (user._id || user.id)) {
          returned.addedBy = returned.addedBy || (user._id || user.id);
        }
        onSaved(returned);
      } else {
        // fallback: build a sensible asset object from payload + any id returned
        const maybeId = res?.data?.id || res?.data?._id || res?.data?.insertedId;
const fallback = {
  ...payload,
  // If server returned an id → use it
  // Else if editing → use original id
  // Else → create a temp id (Math.random)
  _id: maybeId || (asset ? (asset._id || asset.id) : `temp-${Math.random().toString(36).slice(2, 9)}`),
  createdAt: asset?.createdAt || new Date().toISOString(),
};

        if (!fallback.addedBy && user && (user._id || user.id)) {
          fallback.addedBy = user._id || user.id;
        }
        onSaved(fallback);
      }

      onClose && onClose();
    } catch (err) {
      console.error("Save asset error", err);
      const serverMsg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Save failed";
      setServerError(typeof serverMsg === "string" ? serverMsg : JSON.stringify(serverMsg));
      toast.error(typeof serverMsg === "string" ? serverMsg : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-base-100 rounded-lg w-full max-w-xl shadow-lg overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {asset ? "Edit asset" : "Create asset"}
              </h3>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={onClose}
                disabled={saving}
              >
                Close
              </button>
            </div>
          </div>

          <div className="p-4">
            {serverError && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded">
                {serverError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  value={form.productName}
                  onChange={(e) => handleChange("productName", e.target.value)}
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  value={form.productType}
                  onChange={(e) => handleChange("productType", e.target.value)}
                  className="select select-bordered w-full"
                >
                  <option value="Returnable">Returnable</option>
                  <option value="Non-returnable">Non-returnable</option>
                </select>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input
                  type="number"
                  min={0}
                  value={form.productQuantity}
                  onChange={(e) => {
                    const val = Number(e.target.value || 0);
                    handleChange("productQuantity", val);
                    // keep availableQuantity at most productQuantity
                    handleChange(
                      "availableQuantity",
                      Math.min(val, Number(form.availableQuantity) || 0)
                    );
                  }}
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Company</span>
                </label>
                <input
                  value={form.companyName}
                  onChange={(e) => handleChange("companyName", e.target.value)}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text">
                    Image URL (or upload later)
                  </span>
                </label>
                <input
                  value={form.productImage}
                  onChange={(e) => handleChange("productImage", e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="https://..."
                />
                {form.productImage && (
                  <img
                    src={form.productImage}
                    alt="preview"
                    className="mt-3 h-32 object-contain"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "";
                    }}
                  />
                )}
              </div>

              <div className="md:col-span-2">
                <label className="label">
                  <span className="label-text">Description (optional)</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  className="textarea textarea-bordered w-full"
                  rows={3}
                />
              </div>
            </div>
          </div>

          <div className="p-4 border-t flex justify-end gap-2">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={onClose}
              disabled={saving}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${saving ? "loading" : ""}`}
              disabled={saving}
            >
              {saving ? "Saving..." : asset ? "Save changes" : "Create asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
