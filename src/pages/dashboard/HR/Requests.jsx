import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../../services/api";
import RequestRow from "../../../components/RequestRow";

export default function Requests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadRequests = async () => {
    setLoading(true);
    try {
      const res = await api.get("/requests?status=pending&page=1&limit=50");
      setRequests(res.data.items || []);
    } catch (err) {
      console.error("Failed to load requests", err);
      alert(err.response?.data?.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        Incoming{" "}
        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Requests
        </span>
      </h2>

      {loading ? (
        <div className="text-center py-10">Loading...</div>
      ) : requests.length === 0 ? (
        <div className="text-center py-10 text-neutral">
          No pending requests
        </div>
      ) : (
        <motion.div
          className="overflow-x-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Asset</th>
                <th>Date</th>
                <th>Note</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <RequestRow
                  key={req._id}
                  req={req}
                  onActionDone={loadRequests}
                />
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}
