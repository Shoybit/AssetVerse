import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import RequestCard from "../../../components/RequestCard";
import { FiPackage, FiGrid, FiSearch, FiClock, FiCheckCircle, FiFilter } from "react-icons/fi";

const RequestAsset = () => {
      useEffect(() => {
    document.title = "RequestAsset | AssetVerse";
  }, []);
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all"); 

  const loadAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/assets?page=1&limit=50");
      setAssets(res.data.items || []);
    } catch (err) {
      console.error("Failed to load assets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssets();
  }, []);

  // Filter and search assets
  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.productName.toLowerCase().includes(search.toLowerCase()) ||
                         asset.productType?.toLowerCase().includes(search.toLowerCase());
    
    if (filter === "available") return matchesSearch && asset.availableQuantity > 0;
    if (filter === "low") return matchesSearch && asset.availableQuantity > 0 && asset.availableQuantity < 5;
    return matchesSearch;
  });

  const availableCount = assets.filter(a => a.availableQuantity > 0).length;
  const lowStockCount = assets.filter(a => a.availableQuantity > 0 && a.availableQuantity < 5).length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Request <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Assets</span></h1>
        <p className="text-gray-600">Browse and request available assets from inventory</p>
      </div>

      {/* Stats & Filters */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Assets</p>
                <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FiPackage className="text-blue-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Available</p>
                <p className="text-2xl font-bold text-green-600">{availableCount}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <FiCheckCircle className="text-green-600 text-xl" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock</p>
                <p className="text-2xl font-bold text-amber-600">{lowStockCount}</p>
              </div>
              <div className="p-3 bg-amber-100 rounded-lg">
                <FiClock className="text-amber-600 text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search assets by name or type..."
              className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-3 rounded-lg border font-medium transition-colors ${
                filter === "all" 
                  ? "bg-blue-600 text-white border-blue-600" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("available")}
              className={`px-4 py-3 rounded-lg border font-medium transition-colors ${
                filter === "available" 
                  ? "bg-green-600 text-white border-green-600" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Available
            </button>
            <button
              onClick={() => setFilter("low")}
              className={`px-4 py-3 rounded-lg border font-medium transition-colors ${
                filter === "low" 
                  ? "bg-amber-600 text-white border-amber-600" 
                  : "border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Low Stock
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading assets...</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-700">
              Showing <span className="font-semibold">{filteredAssets.length}</span> assets
            </p>
          </div>

          {/* Assets Grid */}
          {filteredAssets.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <FiSearch className="text-gray-400 text-2xl" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
              <p className="text-gray-600">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredAssets.map((asset) => (
                <div key={asset._id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                  {/* Image */}
                  <div className="h-48 bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
                    {asset.productImage ? (
                      <img
                        src={asset.productImage}
                        alt={asset.productName}
                        className="h-full w-full object-contain"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/api/placeholder/400/300";
                        }}
                      />
                    ) : (
                      <div className="text-center">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full mb-3">
                          <FiPackage className="text-gray-400 text-xl" />
                        </div>
                        <p className="text-sm text-gray-500">No image available</p>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{asset.productName}</h3>
                    {asset.productType && (
                      <p className="text-sm text-gray-600 mb-3">{asset.productType}</p>
                    )}
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Available Quantity</p>
                        <p className={`text-lg font-bold ${
                          asset.availableQuantity > 10 
                            ? "text-green-600" 
                            : asset.availableQuantity > 0 
                            ? "text-amber-600" 
                            : "text-red-600"
                        }`}>
                          {asset.availableQuantity}
                        </p>
                      </div>
                      
                      {asset.availableQuantity < 5 && asset.availableQuantity > 0 && (
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                          Low Stock
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedAsset(asset)}
                      disabled={asset.availableQuantity <= 0}
                      className={`w-full py-2.5 rounded-lg font-medium transition-all ${
                        asset.availableQuantity <= 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow"
                      }`}
                    >
                      {asset.availableQuantity <= 0 ? "Out of Stock" : "Request Asset"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Request Modal */}
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
};

export default RequestAsset;