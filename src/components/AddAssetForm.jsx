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
  const [imageInfo, setImageInfo] = useState(null);
  const fileRef = useRef(null);

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [saving, setSaving] = useState(false);

  const IMGBB_KEY = imgbbKey || import.meta.env.VITE_IMGBB_KEY || "";
  const MAX_IMAGE_MB = 5;
  const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

  const handleFile = (f) => {
    if (!f) { setImageFile(null); setPreviewUrl(""); setImageInfo(null); return; }
    if (!f.type.startsWith("image/")) { toast.error("Only image files allowed"); return; }
    if (f.size > MAX_IMAGE_BYTES) { toast.error(`Image too large. Max ${MAX_IMAGE_MB} MB`); return; }
    setImageFile(f); setImageInfo({ name: f.name, sizeKB: Math.round(f.size/1024), type: f.type }); setPreviewUrl(URL.createObjectURL(f));
  };

  const handleFileChange = (e) => { const f = e.target.files?.[0] || null; handleFile(f); };
  const onDrop = (e) => { e.preventDefault(); e.stopPropagation(); const f = e.dataTransfer.files?.[0]; handleFile(f); };
  const onDragOver = (e) => { e.preventDefault(); e.stopPropagation(); };

  function uploadToImgBBWithProgress(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      if (!IMGBB_KEY) return reject(new Error("No ImgBB API key configured."));
      setUploading(true);
      setUploadProgress(0);
      const xhr = new XMLHttpRequest();
      const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;
      xhr.open("POST", url);
      xhr.upload.onprogress = (event) => { if (event.lengthComputable) setUploadProgress(Math.round((event.loaded / event.total) * 100)); };
      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(100);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const resp = JSON.parse(xhr.responseText);
            const hosted = resp?.data?.url || resp?.data?.display_url || null;
            if (!hosted) return reject(new Error("ImgBB returned no URL"));
            resolve(hosted);
          } catch (err) { reject(new Error("Invalid ImgBB response")); }
        } else { reject(new Error(`ImgBB upload failed: ${xhr.status}`)); }
      };
      xhr.onerror = () => { setUploading(false); reject(new Error("Network error during ImgBB upload")); };
      const fd = new FormData(); fd.append("image", file); xhr.send(fd);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName.trim()) { toast.error("Product name required"); return; }
    if (+productQuantity < 0) { toast.error("Quantity must be >=0"); return; }
    setSaving(true);
    try {
      let imageUrl = "";
      if (imageFile) {
        toast.info("Uploading image...");
        imageUrl = await uploadToImgBBWithProgress(imageFile);
      }
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
      setProductName(""); setProductType("Returnable"); setProductQuantity(1);
      setImageFile(null); setPreviewUrl(""); setImageInfo(null); setUploadProgress(0);
      if (fileRef.current) fileRef.current.value = "";
      onClose && onClose();
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Save failed");
    } finally {
      setSaving(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <h3 className="text-lg font-semibold">Add New Asset</h3>

        <div>
          <label className="block text-sm font-medium">Product Name *</label>
          <input className="w-full px-3 py-2 border rounded" value={productName} onChange={(e)=>setProductName(e.target.value)} required disabled={saving || uploading} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Product Type</label>
            <select className="w-full px-3 py-2 border rounded" value={productType} onChange={(e)=>setProductType(e.target.value)} disabled={saving || uploading}>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Quantity</label>
            <input type="number" min="0" className="w-full px-3 py-2 border rounded" value={productQuantity} onChange={(e)=>setProductQuantity(e.target.value)} disabled={saving || uploading} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Product Image (optional)</label>
          <div onDrop={onDrop} onDragOver={onDragOver} className="p-4 border-dashed border rounded text-center">
            {previewUrl ? <img src={previewUrl} alt="preview" className="mx-auto h-24 object-contain" /> : <div>Drag & drop or <button type="button" onClick={()=>fileRef.current?.click()} className="text-blue-600 underline">browse</button></div>}
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          {uploading && <div className="mt-2 text-sm">Uploading image… {uploadProgress}%</div>}
          {imageInfo && <div className="text-xs text-gray-600 mt-2">{imageInfo.name} • {imageInfo.sizeKB} KB</div>}
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-ghost" onClick={() => onClose && onClose()} disabled={saving || uploading}>Cancel</button>
          <button type="submit" className={`btn btn-primary ${saving || uploading ? "loading" : ""}`} disabled={saving || uploading}>{saving || uploading ? "Saving..." : "Create Asset"}</button>
        </div>
      </form>
    </div>
  );
}
