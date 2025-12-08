import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import AffiliationRow from "../../../components/AffiliationRow";

const EmployeeList= () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = async (p = 1, search = q) => {
    setLoading(true);
    try {
      const params = `?page=${p}&limit=${limit}${
        search ? `&q=${encodeURIComponent(search)}` : ""
      }`;
      const res = await api.get(`/affiliations/company${params}`);
      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setPage(res.data.page || p);
    } catch (err) {
      console.error("Failed to load affiliations", err);
      alert(err.response?.data?.message || "Failed to load affiliations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemoved = () => {
    // refresh first page after removal
    load(1);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Affiliated Employees</h2>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email"
            className="input input-bordered"
          />
          <button className="btn" onClick={() => load(1, q)}>
            Search
          </button>
          <button
            className="btn btn-ghost"
            onClick={() => {
              setQ("");
              load(1, "");
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-10 text-neutral">
          No affiliated employees found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Company</th>
                <th>Affiliated On</th>
                <th>Status</th>
                <th>Assigned</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <AffiliationRow
                  key={it._id}
                  affiliation={it}
                  onRemoved={handleRemoved}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {total > limit && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="btn btn-sm"
            onClick={() => load(Math.max(1, page - 1), q)}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => load(page + 1, q)}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
export default EmployeeList;