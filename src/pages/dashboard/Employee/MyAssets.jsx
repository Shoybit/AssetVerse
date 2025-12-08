import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import AssignedCard from "../../../components/AssignedCard";

const MyAssets = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

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
    // loadAssigned(page);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl font-semibold">My Assigned Assets</h2>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : items.length === 0 ? (
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
}

export default MyAssets;