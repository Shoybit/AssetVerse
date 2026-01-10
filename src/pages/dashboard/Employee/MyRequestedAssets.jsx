import { useEffect, useState } from "react";
import api from "../../../services/api";

const statusColor = {
  pending: "badge-warning",
  approved: "badge-success",
  rejected: "badge-error",
  cancelled: "badge-neutral",
  processing: "badge-info",
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return "✅";
      case "rejected":
        return "❌";
      case "pending":
        return "⏳";
      default:
        return "📦";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="mt-4 text-base-content/60">Loading your requests...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
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

      {/* Empty State */}
      {filteredRequests.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-xl">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold">No requests found</h3>
          <p className="text-base-content/60 mt-2">
            You haven’t requested any assets yet
          </p>
        </div>
      ) : (
        <>
          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredRequests.map((req) => (
              <div
                key={req._id}
                className="card bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-md transition"
              >
{req.assetImage ? (
  <figure className="h-40 bg-base-200 overflow-hidden">
    <img
      src={req.assetImage}
      alt={req.assetName}
      className="w-full h-full object-cover"
      onError={(e) => {
        e.currentTarget.src =
          "https://via.placeholder.com/400x250?text=No+Image";
      }}
    />
  </figure>
) : (
  <div className="h-40 flex flex-col items-center justify-center bg-base-200 text-4xl text-base-content/40">
    📦
    <span className="text-sm mt-2">No Image</span>
  </div>
)}



                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <h3 className="card-title text-lg truncate">
                      {req.assetName}
                    </h3>
                    <span className="text-2xl">
                      {getStatusIcon(req.requestStatus)}
                    </span>
                  </div>

                  <p className="text-sm text-base-content/60">
                    Type: {req.assetType || "N/A"}
                  </p>

                  <div className="flex justify-between items-center mt-4">
                    <span
                      className={`badge ${
                        statusColor[req.requestStatus]
                      } capitalize`}
                    >
                      {req.requestStatus}
                    </span>

                    <span className="text-xs text-base-content/60">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Status Message */}
                  {req.requestStatus === "approved" && (
                    <p className="mt-3 text-sm text-success font-medium">
                      ✅ Approved by HR
                    </p>
                  )}

                  {req.requestStatus === "rejected" && (
                    <p className="mt-3 text-sm text-error font-medium">
                      ❌ Request rejected
                    </p>
                  )}

                  {req.requestStatus === "pending" && (
                    <p className="mt-3 text-sm text-warning font-medium">
                      ⏳ Waiting for approval
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-base-content/60">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </>
      )}
    </div>
  );
};

export default MyRequestedAssets;
