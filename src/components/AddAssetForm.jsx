import React, { useState, useContext, useRef, useEffect } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import AuthContext from "../context/AuthContext";


function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function AddAssetForm({ onSaved = () => {}, onClose = () => {}, imgbbKey }) {
  const { user } = useContext(AuthContext);

  /* ===== loader state ===== */
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);
  // form state
  const [productName, setProductName] = useState("");
  const [productType, setProductType] = useState("Returnable");
  const [productQuantity, setProductQuantity] = useState(1);

  // image state
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [imageInfo, setImageInfo] = useState(null); 

  // upload & saving
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); 
  const [saving, setSaving] = useState(false);
  const [justSaved, setJustSaved] = useState(false);

  const fileInputRef = useRef(null);

  const IMGBB_KEY = imgbbKey || import.meta.env.VITE_IMGBB_KEY || "";

  const MAX_IMAGE_MB = 5;
  const MAX_IMAGE_BYTES = MAX_IMAGE_MB * 1024 * 1024;

  const formatBytes = (bytes) => {
    if (!bytes) return "0 B";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(0)} KB`;
    return `${(kb / 1024).toFixed(2)} MB`;
  };

  // drag/drop
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const f = e.dataTransfer.files?.[0];
    handleFile(f);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleFile = (f) => {
    if (!f) {
      setImageFile(null);
      setPreviewUrl("");
      setImageInfo(null);
      return;
    }
    if (!f.type.startsWith("image/")) {
      toast.error("Only image files are allowed.");
      return;
    }
    if (f.size > MAX_IMAGE_BYTES) {
      toast.error(`Image too large. Max ${MAX_IMAGE_MB} MB.`);
      return;
    }
    setImageFile(f);
    setImageInfo({ name: f.name, sizeKB: Math.round(f.size / 1024), type: f.type });
    setPreviewUrl(URL.createObjectURL(f));
  };

  const handleFileChange = (e) => {
    const f = e.target.files?.[0] || null;
    handleFile(f);
  };

  const resetForm = () => {
    setProductName("");
    setProductType("Returnable");
    setProductQuantity(1);
    setImageFile(null);
    setPreviewUrl("");
    setImageInfo(null);
    setUploadProgress(0);
  };

  // Upload to ImgBB with progress using XHR
  function uploadToImgBBWithProgress(file) {
    return new Promise((resolve, reject) => {
      if (!file) return resolve(null);
      if (!IMGBB_KEY) return reject(new Error("No ImgBB API key configured."));

      setUploading(true);
      setUploadProgress(0);

      const xhr = new XMLHttpRequest();
      const url = `https://api.imgbb.com/1/upload?key=${IMGBB_KEY}`;

      xhr.open("POST", url);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const pct = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(pct);
        }
      };

      xhr.onload = () => {
        setUploading(false);
        setUploadProgress(100);
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const resp = JSON.parse(xhr.responseText);
            const hosted = resp?.data?.url || resp?.data?.display_url || null;
            if (!hosted) return reject(new Error("ImgBB returned no hosted URL"));
            resolve(hosted);
          } catch (err) {
            reject(new Error("Invalid ImgBB response"));
          }
        } else {
          reject(new Error(`ImgBB upload failed: ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        setUploading(false);
        reject(new Error("Network error during ImgBB upload"));
      };

      const fd = new FormData();
      fd.append("image", file);

      xhr.send(fd);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName.trim()) {
      toast.error("Product name is required.");
      return;
    }
    if (+productQuantity < 0) {
      toast.error("Quantity must be 0 or more.");
      return;
    }

    setSaving(true);
    setJustSaved(false);
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
      const savedAsset =
        returned && (returned._id || returned.id || returned.productName)
          ? returned
          : {
              ...payload,
              _id: res?.data?._id || res?.data?.id || `temp-${Math.random().toString(36).slice(2, 9)}`,
              createdAt: new Date().toISOString(),
            };

      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 1200);

      toast.success("Asset created");
      onSaved(savedAsset);
      resetForm();
      onClose && onClose();
    } catch (err) {
      console.error("Save asset failed", err);
      const msg = err?.response?.data?.message || err?.message || "Save failed";
      toast.error(msg);
    } finally {
      setSaving(false);
      setUploading(false);
      setUploadProgress(0);
    }
  };
  if (initialLoading) {
    return <PageLoader text="Preparing asset form..." />;
  }
  return (
    <div className="max-w-12/12 mx-auto">
      <div className="bg-white shadow-xl rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-3xl font-bold text-gray-900 mb-2">
            Add <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">New Asset</span>
          </h3>

          <div className="flex items-center gap-3">
            {justSaved ? (
              <div className="flex items-center gap-2 text-green-600">
                <svg className="w-6 h-6 animate-bounce" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm">Saved</span>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose && onClose();
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border hover:bg-gray-50 transition"
              aria-label="Cancel"
              disabled={saving || uploading}
            >
              Cancel
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" aria-live="polite">
          {/* name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 transition"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. MacBook Pro 16"
              required
              disabled={saving || uploading}
              aria-label="Product name"
            />
          </div>

          {/* type + qty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Type</label>
              <select
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={productType}
                onChange={(e) => setProductType(e.target.value)}
                disabled={saving || uploading}
                aria-label="Product type"
              >
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                min="0"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                value={productQuantity}
                onChange={(e) => setProductQuantity(e.target.value)}
                disabled={saving || uploading}
                aria-label="Quantity"
              />
            </div>
          </div>

          {/* image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Image (optional)</label>

            <div
              onDrop={onDrop}
              onDragOver={onDragOver}
              className={`relative flex items-center gap-4 p-4 border-2 rounded-lg transition-all ${
                previewUrl ? "border-green-300 bg-green-50/20" : "border-dashed border-gray-200 bg-gray-50/50"
              }`}
              style={{ minHeight: 120 }}
            >
              <div className="flex-1 text-center">
                {previewUrl ? (
                  <img src={previewUrl} alt="preview" className="mx-auto h-28 object-contain rounded-lg shadow-sm" />
                ) : (
                  <div className="text-sm text-gray-500">
                    Drag & drop an image here or{" "}
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-blue-600 underline"
                      disabled={saving || uploading}
                    >
                      browse
                    </button>
                  </div>
                )}
              </div>

              <div className="w-40 text-xs text-right">
                <div className="mb-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1 rounded-md border hover:bg-gray-100 transition"
                    disabled={saving || uploading}
                    aria-label="Choose file"
                  >
                    Choose
                  </button>
                </div>

                {imageInfo ? (
                  <div className="text-xs">
                    <div className="font-medium truncate">{imageInfo.name}</div>
                    <div className="text-gray-500">{formatBytes(imageInfo.sizeKB * 1024)}</div>
                    <div className="mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setImageFile(null);
                          setPreviewUrl("");
                          setImageInfo(null);
                          if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                        className="text-red-600 underline text-xs"
                        disabled={saving || uploading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : null}

                {!IMGBB_KEY && (
                  <div className="mt-3 text-xs text-yellow-800">No ImgBB key (VITE_IMGBB_KEY)</div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={saving || uploading}
                aria-hidden
              />
            </div>

            {/* progress bar */}
            {uploading && (
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-2 bg-blue-600 transition-all"
                    style={{ width: `${Math.max(2, uploadProgress)}%` }}
                    aria-valuenow={uploadProgress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  />
                </div>
                <div className="text-xs text-gray-600 mt-1">Uploading image… {uploadProgress}%</div>
              </div>
            )}

            <div className="text-xs text-gray-500 mt-2">Max file size {MAX_IMAGE_MB} MB. Recommended 4:3 aspect ratio.</div>
          </div>

          {/* actions */}
          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => {
                resetForm();
                onClose && onClose();
              }}
              className="px-4 py-2 rounded-md border hover:bg-gray-50 transition"
              disabled={saving || uploading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={`px-4 py-2 rounded-md text-white flex items-center gap-2 ${
                saving || uploading ? "bg-gray-400" : "bg-linear-to-r from-blue-600 to-blue-500 hover:scale-[1.02]"
              } transition transform`}
              disabled={saving || uploading}
              aria-pressed={saving || uploading}
            >
              {saving || uploading ? (
                <>
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="3" stroke="currentColor" strokeOpacity="0.25" />
                    <path d="M4 12a8 8 0 018-8" strokeWidth="3" stroke="currentColor" strokeLinecap="round" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14M5 12h14" />
                  </svg>
                  Create Asset
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
