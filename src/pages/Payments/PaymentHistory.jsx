import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?._id) return;

    const load = async () => {
      try {
        const res = await api.get("/payments/history");
        setHistory(res.data.items || []);
      } catch (err) {
        console.error("History load error:", err);
      } finally {
        setLoading(false); 
      }
    };

    load();
  }, [user]);

  if (!user) return <div>Please login to view payment history.</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Payment{" "}
        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          History
        </span>
      </h2>

      {loading ? (
        <div className="py-6 text-center">Loading…</div>
      ) : history.length === 0 ? (
        <div className="py-6 text-gray-500">No payments found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th>Package</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Stripe Session</th>
              </tr>
            </thead>
            <tbody>
              {history.map((p) => (
                <tr key={p._id}>
                  <td>{p.packageName}</td>
                  <td>${p.amount}</td>
                  <td>{p.status}</td>
                  <td>{new Date(p.paymentDate).toLocaleString()}</td>
                  <td className="text-blue-500">
                    {p.transactionId?.slice(0, 10)}…
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
