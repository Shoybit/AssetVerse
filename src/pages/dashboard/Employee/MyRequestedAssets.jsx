import { useEffect, useState } from "react";
import api from "../../../services/api";
import {
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineCube,
  HiOutlineTag,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineFilter,
  HiOutlineDocumentText,
  HiOutlineExclamationCircle,
  HiOutlinePhotograph
} from "react-icons/hi";

const statusColor = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
  cancelled: "badge-neutral",
  processing: "badge-info",
};

const statusIcons = {
  pending: <HiOutlineClock className="w-4 h-4" />,
  approved: <HiOutlineCheckCircle className="w-4 h-4" />,
  rejected: <HiOutlineXCircle className="w-4 h-4" />,
};

const assetTypeIcons = {
  laptop: "💻",
  mobile: "📱",
  monitor: "🖥️",
  keyboard: "⌨️",
  mouse: "🖱️",
  chair: "🪑",
  desk: "🪚",
  headphone: "🎧",
  tablet: "📟",
  server: "🖥️",
  printer: "🖨️",
  default: <HiOutlineCube className="w-4 h-4" />
};

const MyRequestedAssets = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const loadMyRequests = async () => {
    try {
      const res = await api.get("/requests/my");
      setRequests(res.data.items || []);
    } catch (err) {
      console.error("Failed to load requests", err);
      setRequests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMyRequests();
  }, []);

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.requestStatus === filter;
  });

  const getAssetTypeIcon = (assetType) => {
    if (!assetType) return assetTypeIcons.default;
    const type = assetType.toLowerCase();
    return assetTypeIcons[type] || assetTypeIcons.default;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="relative">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <HiOutlineDocumentText className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
        </div>
        <p className="mt-4 text-base-content/60">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-linear-to-br from-primary to-secondary rounded-xl">
            <HiOutlineDocumentText className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold">
              My{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Asset Requests
              </span>
            </h2>
            <p className="text-base-content/70 mt-1">
              Track your requested assets and approval status
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <HiOutlineFilter className="w-5 h-5 text-base-content/60" />
          <select
            className="select select-bordered select-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="card bg-base-100 border border-base-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <HiOutlineDocumentText className="w-4 h-4 text-primary" />
            </div>
            <div className="text-sm font-medium">Total</div>
          </div>
          <div className="text-2xl font-bold text-primary">{requests.length}</div>
        </div>
        
        <div className="card bg-base-100 border border-base-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-warning/20 rounded-lg">
              <HiOutlineClock className="w-4 h-4 text-warning" />
            </div>
            <div className="text-sm font-medium">Pending</div>
          </div>
          <div className="text-2xl font-bold text-warning">
            {requests.filter(r => r.requestStatus === "pending").length}
          </div>
        </div>
        
        <div className="card bg-base-100 border border-base-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-success/20 rounded-lg">
              <HiOutlineCheckCircle className="w-4 h-4 text-success" />
            </div>
            <div className="text-sm font-medium">Approved</div>
          </div>
          <div className="text-2xl font-bold text-success">
            {requests.filter(r => r.requestStatus === "approved").length}
          </div>
        </div>
        
        <div className="card bg-base-100 border border-base-300 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-error/20 rounded-lg">
              <HiOutlineXCircle className="w-4 h-4 text-error" />
            </div>
            <div className="text-sm font-medium">Rejected</div>
          </div>
          <div className="text-2xl font-bold text-error">
            {requests.filter(r => r.requestStatus === "rejected").length}
          </div>
        </div>
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-xl">
          <div className="inline-flex p-6 bg-base-300 rounded-full mb-4">
            <HiOutlineDocumentText className="w-12 h-12 text-base-content/40" />
          </div>
          <h3 className="text-xl font-semibold">No requests found</h3>
          <p className="text-base-content/60 mt-2">
            {filter === "all"
              ? "You haven't requested any assets yet"
              : `No ${filter} requests found`
            }
          </p>
          {filter !== "all" && (
            <button
              className="btn btn-primary btn-sm mt-4 gap-2"
              onClick={() => setFilter("all")}
            >
              <HiOutlineFilter className="w-4 h-4" />
              Show All
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="card bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Section */}
                {req.assetImage ? (
                  <figure className="h-48 bg-base-200 overflow-hidden relative">
                    <img
                      src={req.assetImage}
                      alt={req.assetName}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                        e.currentTarget.parentElement.innerHTML = `
                          <div class="h-48 bg-base-200 flex flex-col items-center justify-center text-4xl text-base-content/40">
                            ${getAssetTypeIcon(req.assetType)}
                            <span class="text-sm mt-2">No Image</span>
                          </div>
                        `;
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="text-2xl">
                        {getAssetTypeIcon(req.assetType)}
                      </span>
                    </div>
                  </figure>
                ) : (
                  <div className="h-48 bg-base-200 flex flex-col items-center justify-center text-4xl text-base-content/40 relative">
                    {getAssetTypeIcon(req.assetType)}
                    <span className="text-sm mt-2">No Image</span>
                    <div className="absolute top-3 right-3">
                      <HiOutlinePhotograph className="w-6 h-6 text-base-content/20" />
                    </div>
                  </div>
                )}

                <div className="card-body">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="card-title text-lg truncate flex items-center gap-2">
                        {req.assetName}
                        {req.priority === "high" && (
                          <HiOutlineExclamationCircle className="w-4 h-4 text-error" />
                        )}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <HiOutlineTag className="w-4 h-4 text-base-content/40" />
                        <span className="text-sm text-base-content/60">
                          {req.assetType || "N/A"}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end">
                      <div className={`badge ${statusColor[req.requestStatus]} gap-1 capitalize`}>
                        {statusIcons[req.requestStatus]}
                        {req.requestStatus}
                      </div>
                    </div>
                  </div>

                  {/* Asset Details */}
                  <div className="space-y-3">
                    {req.assetId && (
                      <div className="flex items-center gap-2 text-sm">
                        <HiOutlineTag className="w-4 h-4 text-base-content/40" />
                        <span className="font-medium">Asset ID:</span>
                        <span className="text-base-content/60 font-mono">
                          {req.assetId}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-base-200">
                      <div className="flex items-center gap-2">
                        <HiOutlineCalendar className="w-4 h-4 text-base-content/40" />
                        <span className="text-sm text-base-content/60">
                          {new Date(req.requestDate).toLocaleDateString()}
                        </span>
                      </div>
                      
                      {req.requestedBy && (
                        <div className="flex items-center gap-2">
                          <HiOutlineUser className="w-4 h-4 text-base-content/40" />
                          <span className="text-sm text-base-content/60">
                            {req.requestedBy}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Message */}
                  <div className="mt-4 pt-4 border-t border-base-200">
                    {req.requestStatus === "approved" && (
                      <div className="flex items-center gap-2 text-sm text-success">
                        <HiOutlineCheckCircle className="w-4 h-4" />
                        <span>Approved by HR</span>
                      </div>
                    )}

                    {req.requestStatus === "rejected" && (
                      <div className="flex items-center gap-2 text-sm text-error">
                        <HiOutlineXCircle className="w-4 h-4" />
                        <span>Request rejected</span>
                      </div>
                    )}

                    {req.requestStatus === "pending" && (
                      <div className="flex items-center gap-2 text-sm text-warning">
                        <HiOutlineClock className="w-4 h-4" />
                        <span>Waiting for approval</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Summary */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-base-content/60">
            <HiOutlineDocumentText className="w-4 h-4" />
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestedAssets;