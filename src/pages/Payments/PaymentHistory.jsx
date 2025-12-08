import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";

export default function PaymentHistory() {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/payments/history");
      setItems(res.data.items || []);
    } catch (err) {
      console.error("Load payments", err);
      alert(err.response?.data?.message || "Failed to load payment history");
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "hr") {
    return (
      <div className="text-center py-10">
        Only HR users can view payment history.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Payment history</h2>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading…</div>
      ) : items.length === 0 ? (
        <div className="text-center py-8 text-neutral">
          No payment records found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Package</th>
                <th>Amount</th>
                <th>Limit</th>
                <th>Date</th>
                <th>Txn</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p._id}>
                  <td>{p.packageName || "-"}</td>
                  <td>
                    {p.amount
                      ? (p.amount / 100).toFixed(2) + " " + (p.currency || "")
                      : "-"}
                  </td>
                  <td>{p.employeeLimit ?? "-"}</td>
                  <td>{new Date(p.paymentDate).toLocaleString()}</td>
                  <td className="text-xs">{p.transactionId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
