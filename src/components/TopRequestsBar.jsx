import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function TopRequestsBar({ data = [] }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-sm text-neutral">No request data available.</div>
    );
  }

  // Accept either [{ assetName, count }] or [{ name, value }]
  const normalized = data.map((d) => ({
    name: d.assetName || d.name || "Unknown",
    value: d.count ?? d.value ?? 0,
  }));

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <BarChart
          data={normalized}
          margin={{ top: 10, right: 20, left: 0, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            angle={-45}
            textAnchor="end"
            interval={0}
            height={60}
          />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#2563eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
