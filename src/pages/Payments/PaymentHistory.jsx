import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import AuthContext from "../../context/AuthContext";

/* -------- Loader -------- */
function PageLoader({ text = "Loading payment history..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function PaymentHistory() {
      useEffect(() => {
    document.title = "PaymentHistory | AssetVerse";
  }, []);
  const { user } = useContext(AuthContext);

  const [history, setHistory] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user?._id) {
      setPageLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get("/payments/history");
        setHistory(res.data?.items || []);
      } catch (err) {
        console.error("History load error:", err);
      } finally {
        setLoading(false);
        setPageLoading(false);
      }
    };

    load();
  }, [user]);

  /* -------- Loaders -------- */
  if (pageLoading || loading) {
    return <PageLoader text="Loading payment history..." />;
  }

  if (!user) {
    return <div>Please login to view payment history.</div>;
  }

  /* -------- UI -------- */
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Payment{" "}
        <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          History
        </span>
      </h2>

      {history.length === 0 ? (
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
                  <td>
                    {p.paymentDate
                      ? new Date(p.paymentDate).toLocaleString()
                      : "—"}
                  </td>
                  <td className="text-blue-500">
                    {p.transactionId
                      ? `${p.transactionId.slice(0, 10)}…`
                      : "—"}
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
