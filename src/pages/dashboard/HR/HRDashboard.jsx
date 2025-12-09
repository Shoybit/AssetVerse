/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
// src/pages/dashboard/HR/HRDashboard.jsx
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import ReturnablePie from "../../../components/ReturnablePie";
import TopRequestsBar from "../../../components/TopRequestsBar";
import AuthContext from "../../../context/AuthContext";

export default function HRDashboard() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [returnableData, setReturnableData] = useState(null);
  const [topRequestsData, setTopRequestsData] = useState(null);
  const [error, setError] = useState(null);

  // Helper: try server analytics endpoints, else fallback to fetch & compute
  async function loadAnalytics() {
    setLoading(true);
    setError(null);

    try {
      // 1) Try server-provided endpoints (if you later add them)
      try {
        const [r1, r2] = await Promise.all([
          api.get("/analytics/returnable-summary"), // expected: { returnable: X, nonReturnable: Y } or [{name, value}]
          api.get("/analytics/top-requests"), // expected: [{ assetName, count }]
        ]);
        // Normalize
        const rData = (() => {
          if (r1.data?.returnable !== undefined) {
            return [
              { name: "Returnable", value: Number(r1.data.returnable) || 0 },
              {
                name: "Non-returnable",
                value: Number(r1.data.nonReturnable) || 0,
              },
            ];
          }
          if (Array.isArray(r1.data)) return r1.data;
          if (r1.data?.data) return r1.data.data;
          return null;
        })();

        const tData = r2.data?.items || r2.data || null;

        if (rData && tData) {
          setReturnableData(rData);
          setTopRequestsData(tData);
          setLoading(false);
          return;
        }
      } catch (e) {
        // ignore — fallback to client-side aggregation below
        console.info(
          "Analytics endpoints not available or failed; falling back to client-side aggregation"
        );
      }

      // 2) Fallback: fetch assets and requests and compute client-side
      // fetch all assets and requests for this HR/company
      // We keep limits reasonable (50-200) — adjust if you have large data sets.
      const [assetsRes, requestsRes] = await Promise.all([
        api.get("/assets?page=1&limit=200"), // tries to fetch many assets
        api.get("/requests?page=1&limit=500"), // pending + approved + all — we can compute top requests
      ]);

      const assets = assetsRes.data.items || [];
      const requests = requestsRes.data.items || [];

      // compute returnable vs non-returnable (by count of assets)
      const returnableCount = assets.reduce(
        (acc, a) => acc + (a.productType === "Returnable" ? 1 : 0),
        0
      );
      const nonReturnableCount = assets.length - returnableCount;
      const pieData = [
        { name: "Returnable", value: returnableCount },
        { name: "Non-returnable", value: nonReturnableCount },
      ];

      // top requested assets: aggregate requests by assetName
      const freq = {};
      for (const r of requests) {
        const name = r.assetName || "Unknown";
        freq[name] = (freq[name] || 0) + 1;
      }
      // transform to sorted array top 10
      const topArr = Object.entries(freq)
        .map(([assetName, count]) => ({ assetName, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      setReturnableData(pieData);
      setTopRequestsData(topArr);
      setLoading(false);
    } catch (err) {
      console.error("Failed to load analytics", err);
      setError(
        err.response?.data?.message || err.message || "Failed to load analytics"
      );
      setLoading(false);
    }
  }

  useEffect(() => {
    if (!user || user.role !== "hr") return;
    loadAnalytics();
  }, [user]);

  if (!user || user.role !== "hr") {
    return (
      <div className="text-center py-10">
        HR dashboard is only available to HR users.
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">HR Dashboard</h2>
        <div>
          <button
            className="btn btn-sm btn-ghost"
            onClick={loadAnalytics}
            disabled={loading}
          >
            Refresh
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading analytics…</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4">
            <h3 className="font-medium mb-3">Returnable vs Non-returnable</h3>
            <ReturnablePie data={returnableData} />
          </div>

          <div className="card p-4">
            <h3 className="font-medium mb-3">Top Requested Assets</h3>
            <TopRequestsBar data={topRequestsData} />
          </div>
        </div>
      )}
    </div>
  );
}
