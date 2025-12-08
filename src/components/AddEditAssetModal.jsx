import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../services/api";

/**
 * initialData: asset object when editing, null when adding
 * onSaved(savedAsset, mode) -> mode: 'add'|'edit'
 */
const AddEditAssetModal = ({ initialData = null, onClose, onSaved }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    if (initialData) {
      setValue("productName", initialData.productName);
      setValue("productImage", initialData.productImage || "");
      setValue("productType", initialData.productType);
      setValue("productQuantity", initialData.productQuantity);
      setValue("companyName", initialData.companyName || "");
    } else {
      // default
      setValue("productType", "Returnable");
      setValue("productQuantity", 1);
    }
  }, [initialData, setValue]);

  // inside AddEditAssetModal.jsx — replace the onSubmit function with this

  const onSubmit = async (data) => {
    setServerError(null);
    try {
      if (initialData) {
        // edit
        const res = await api.put(`/assets/${initialData._id}`, {
          productName: data.productName,
          productImage: data.productImage || null,
          productType: data.productType,
          productQuantity: Number(data.productQuantity),
          companyName: data.companyName || null,
        });

        // Normalize various possible response shapes
        const savedAsset =
          (res && res.data && res.data.asset) ||
          (res && res.data && res.data.value) || // some servers return { value: ... }
          (res && res.data) || // fallback to whole body
          null;

        if (!savedAsset) {
          // If nothing useful returned, call onSaved with null (caller should refetch)
          onSaved(null, "edit");
        } else {
          onSaved(savedAsset, "edit");
        }
      } else {
        // create
        const res = await api.post("/assets", {
          productName: data.productName,
          productImage: data.productImage || null,
          productType: data.productType,
          productQuantity: Number(data.productQuantity),
          companyName: data.companyName || null,
        });

        const savedAsset =
          (res && res.data && res.data.asset) || (res && res.data) || null;

        if (!savedAsset) {
          onSaved(null, "add");
        } else {
          onSaved(savedAsset, "add");
        }
      }
    } catch (err) {
      console.error("Save asset error", err);
      setServerError(err.response?.data?.message || "Failed to save asset");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-lg">
        <div className="card">
          <div className="card-body">
            <h3 className="text-xl font-semibold mb-2">
              {initialData ? "Edit Asset" : "Add Asset"}
            </h3>

            {serverError && (
              <div className="alert alert-error mb-3">{serverError}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <div>
                <label className="label">
                  <span className="label-text">Product name</span>
                </label>
                <input
                  {...register("productName", { required: "Required" })}
                  className={`input input-bordered w-full ${
                    errors.productName ? "input-error" : ""
                  }`}
                />
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Image URL (optional)</span>
                </label>
                <input
                  {...register("productImage")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="label">
                    <span className="label-text">Type</span>
                  </label>
                  <select
                    {...register("productType")}
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
                    {...register("productQuantity", { required: true, min: 0 })}
                    type="number"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>

              <div>
                <label className="label">
                  <span className="label-text">Company name (optional)</span>
                </label>
                <input
                  {...register("companyName")}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex items-center justify-end gap-2 mt-2">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={onClose}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`btn btn-primary ${isSubmitting ? "loading" : ""}`}
                  disabled={isSubmitting}
                >
                  {initialData ? "Save changes" : "Add asset"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddEditAssetModal;
