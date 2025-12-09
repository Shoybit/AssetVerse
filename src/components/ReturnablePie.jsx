import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const COLORS = ["#4f46e5", "#ef4444"]; // Indigo, Red

export default function ReturnablePie({ data = [] }) {
  if (!data || !Array.isArray(data) || data.length === 0) {
    return <div className="text-sm text-neutral">No asset data available.</div>;
  }

  // Accept either [{name, value}] or {returnable, nonReturnable}
  const normalized = Array.isArray(data)
    ? data
    : [
        { name: "Returnable", value: data.returnable || 0 },
        { name: "Non-returnable", value: data.nonReturnable || 0 },
      ];

  const total = normalized.reduce((s, d) => s + (d.value || 0), 0);

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={normalized}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            innerRadius={40}
            paddingAngle={4}
          >
            {normalized.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(v) => `${v}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <div className="mt-4 text-center">
        <div className="text-sm text-neutral">
          Total asset types: <strong>{total}</strong>
        </div>
      </div>
    </div>
  );
}
