// src/components/AssetModal.jsx
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function AssetModal({ asset = null, onClose, onSaved }) {
  const [form, setForm] = useState({
    productName: '',
    productType: 'Returnable',
    productQuantity: 1,
    availableQuantity: 1,
    productImage: '',
    companyName: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (asset) {
      setForm({
        productName: asset.productName || '',
        productType: asset.productType || 'Returnable',
        productQuantity: asset.productQuantity || 1,
        availableQuantity: asset.availableQuantity ?? asset.productQuantity ?? 1,
        productImage: asset.productImage || '',
        companyName: asset.companyName || '',
      });
    }
  }, [asset]);

  const handleChange = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (asset && asset._id) {
        await api.put(`/assets/${asset._id}`, { ...form });
        toast.success('Asset updated');
      } else {
        await api.post('/assets', { ...form });
        toast.success('Asset created');
      }
      onSaved && onSaved();
    } catch (err) {
      console.error('Save asset error', err);
      toast.error(err?.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  // basic image preview uploader helper (uses direct URL input for now)
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-base-100 rounded-lg w-full max-w-xl shadow-lg overflow-auto">
        <form onSubmit={handleSubmit}>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">{asset ? 'Edit asset' : 'Create asset'}</h3>
              <button type="button" className="btn btn-ghost" onClick={onClose}>Close</button>
            </div>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label"><span className="label-text">Name</span></label>
              <input value={form.productName} onChange={(e)=>handleChange('productName', e.target.value)} className="input input-bordered w-full" required />
            </div>

            <div>
              <label className="label"><span className="label-text">Type</span></label>
              <select value={form.productType} onChange={(e)=>handleChange('productType', e.target.value)} className="select select-bordered w-full">
                <option value="Returnable">Returnable</option>
                <option value="Non-returnable">Non-returnable</option>
              </select>
            </div>

            <div>
              <label className="label"><span className="label-text">Quantity</span></label>
              <input type="number" min={0} value={form.productQuantity} onChange={(e)=>{ handleChange('productQuantity', Number(e.target.value)); handleChange('availableQuantity', Number(e.target.value)); }} className="input input-bordered w-full" />
            </div>

            <div>
              <label className="label"><span className="label-text">Company</span></label>
              <input value={form.companyName} onChange={(e)=>handleChange('companyName', e.target.value)} className="input input-bordered w-full" />
            </div>

            <div className="md:col-span-2">
              <label className="label"><span className="label-text">Image URL (or upload later)</span></label>
              <input value={form.productImage} onChange={(e)=>handleChange('productImage', e.target.value)} className="input input-bordered w-full" placeholder="https://..." />
              {form.productImage && <img src={form.productImage} alt="preview" className="mt-3 h-32 object-contain" />}
            </div>
          </div>

          <div className="p-4 border-t flex justify-end gap-2">
            <button type="button" className="btn btn-ghost" onClick={onClose} disabled={saving}>Cancel</button>
            <button type="submit" className={`btn btn-primary ${saving ? 'loading' : ''}`} disabled={saving}>{saving ? 'Saving...' : (asset ? 'Save changes' : 'Create asset')}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
