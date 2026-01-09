/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../../services/api";
import AffiliationRow from "../../../components/AffiliationRow";

function PageLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

const EmployeeList = () => {
  const [items, setItems] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

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
    load(1);
  };

  if (loading) {
    return <PageLoader text="Loading affiliated employees..." />;
  }

  return (
    <div className="w-full">
      {/* ===== Header + Search ===== */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
          Affiliated{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Employees
          </span>
        </h2>

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email"
            className="input input-bordered w-full sm:w-64"
          />
          <button className="btn btn-primary" onClick={() => load(1, q)}>
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

      {/* ===== Empty State ===== */}
      {items.length === 0 ? (
        <div className="text-center py-12 text-neutral">
          No affiliated employees found.
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto -mx-4 sm:mx-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <table className="table table-zebra w-full text-sm md:text-base">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Email</th>
                <th>Company</th>
                <th>Affiliated On</th>
                <th>Status</th>
                <th>Assets Count</th>
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
        </motion.div>
      )}

      {/* ===== Pagination ===== */}
      {total > limit && (
        <div className="flex flex-wrap items-center justify-center gap-3 mt-6 text-sm">
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
};

export default EmployeeList;
