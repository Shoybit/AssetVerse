import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import AssignedCard from "../../../components/AssignedCard";

function PageLoader({ text = "Loading your assets..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

const MyAssets = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadAssigned = async (p = 1) => {
    setLoading(true);
    try {
      const res = await api.get(`/assigned-assets/my?page=${p}&limit=${limit}`);
      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || p);
    } catch (err) {
      console.error("Failed to load assigned assets", err);
      alert(err.response?.data?.message || "Failed to load your assets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAssigned(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleReturned = (assignedId) => {
    setItems((prev) =>
      prev.map((it) =>
        it._id === assignedId
          ? { ...it, status: "returned", returnDate: new Date().toISOString() }
          : it
      )
    );
  };

  if (loading) {
    return <PageLoader text="Fetching your assigned assets..." />;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          My{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Assets
          </span>
        </h2>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12 text-neutral">
          You have no assigned assets.
        </div>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {items.map((a) => (
            <AssignedCard
              key={a._id}
              assigned={a}
              onReturned={() => handleReturned(a._id)}
            />
          ))}
        </div>
      )}

      {total > limit && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="btn btn-sm"
            onClick={() => loadAssigned(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => loadAssigned(page + 1)}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAssets;
