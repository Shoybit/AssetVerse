import React, { useState, useContext, useRef } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";

export default function AddAssetForm({ onSaved = () => {}, onClose = () => {}, imgbbKey }) {
  const { user } = useContext(AuthContext);

  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("Returnable");
  const [productQuantity, setProductQuantity] = useState(1);

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const fileRef = useRef(null);

  const [saving, setSaving] = useState(false);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    setImageFile(f);
    if (f) setPreviewUrl(URL.createObjectURL(f));
    else setPreviewUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName.trim()) { toast.error("Product name required"); return; }
    if (+productQuantity < 0) { toast.error("Quantity must be >=0"); return; }
    setSaving(true);
    try {
      // NOTE: imageFile present but not uploaded yet; server will expect productImage if available.
      let imageUrl = "";
      // we keep imageFile local for now; later commits will upload to ImgBB

      const payload = {
        productName: productName.trim(),
        productType,
        productQuantity: Number(productQuantity) || 0,
        productImage: imageUrl || undefined,
      };
      if (user && (user._id || user.id)) payload.addedBy = user._id || user.id;
      const res = await api.post("/assets", payload);
      const returned = res?.data?.asset || res?.data || (res && res.data);
      const saved = returned && (returned._id || returned.id) ? returned : { ...payload, _id: res?.data?._id || res?.data?.id || `temp-${Math.random().toString(36).slice(2,9)}`, createdAt: new Date().toISOString() };
      toast.success("Asset created");
      onSaved(saved);
      // reset
      setProductName("");
      setProductType("Returnable");
      setProductQuantity(1);
      setImageFile(null);
      setPreviewUrl("");
      if (fileRef.current) fileRef.current.value = "";
      onClose && onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <div>
        <label className="label"><span className="label-text">Product Name *</span></label>
        <input className="input input-bordered w-full" value={productName} onChange={(e)=>setProductName(e.target.value)} required />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label"><span className="label-text">Product Type</span></label>
          <select className="select select-bordered w-full" value={productType} onChange={(e)=>setProductType(e.target.value)}>
            <option value="Returnable">Returnable</option>
            <option value="Non-returnable">Non-returnable</option>
          </select>
        </div>

        <div>
          <label className="label"><span className="label-text">Quantity</span></label>
          <input type="number" min="0" className="input input-bordered w-full" value={productQuantity} onChange={(e)=>setProductQuantity(Number(e.target.value))} />
        </div>
      </div>

      <div>
        <label className="label"><span className="label-text">Product Image (optional)</span></label>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} />
        {previewUrl && <img src={previewUrl} alt="preview" className="mt-2 h-24 object-contain" />}
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => onClose && onClose()} disabled={saving}>Cancel</button>
        <button type="submit" className={`btn btn-primary ${saving ? "loading" : ""}`} disabled={saving}>{saving ? "Saving..." : "Create Asset"}</button>
      </div>
    </form>
  );
}
