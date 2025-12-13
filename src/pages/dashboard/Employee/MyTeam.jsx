import React, { useEffect, useState } from "react";
import api from "../../../services/api";
import Skeleton from "../../../components/Skeleton";

export default function MyTeam() {
  const [affiliations, setAffiliations] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [company, setCompany] = useState("all");
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/affiliations/my");
      const items = res.data.items || res.data || [];
      setAffiliations(items);
      setFiltered(items);
    } catch (err) {
      console.error("Failed to load team", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  // unique companies
  const companies = Array.from(
    new Set(affiliations.map((a) => a.companyName).filter(Boolean))
  );

  // filter by company
  useEffect(() => {
    if (company === "all") setFiltered(affiliations);
    else setFiltered(affiliations.filter(a => a.companyName === company));
  }, [company, affiliations]);

  // birthdays (current month)
  const currentMonth = new Date().getMonth();
  const birthdays = affiliations.filter(a => {
    if (!a.dateOfBirth) return false;
    return new Date(a.dateOfBirth).getMonth() === currentMonth;
  });

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Team</h2>

      {/* Company selector */}
      <div className="mb-6">
        <label className="text-sm font-medium">Select Company</label>
        <select
          className="select select-bordered w-full max-w-xs mt-1"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        >
          <option value="all">All Companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Team members */}
        <div className="card bg-base-100 p-4">
          <h3 className="font-medium mb-3">
            Team Members ({filtered.length})
          </h3>

          {loading ? (
            <Skeleton count={5} />
          ) : filtered.length === 0 ? (
            <p className="text-sm text-neutral">No members found.</p>
          ) : (
            <ul className="space-y-3">
              {filtered.map((item) => (
                <li
                  key={item._id}
                  className="flex items-center gap-3 border-b pb-3 last:border-b-0"
                >
                  <img
                    src={item.photo || "/avatar.png"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <div>
                    <div className="font-medium">{item.employeeName}</div>
                    <div className="text-xs text-neutral">
                      {item.position || "Employee"}
                    </div>
                    <div className="text-xs text-neutral">
                      {item.employeeEmail}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Birthdays */}
        <div className="card bg-base-100 p-4">
          <h3 className="font-medium mb-3">
            Upcoming Birthdays (This Month)
          </h3>

          {loading ? (
            <Skeleton count={3} />
          ) : birthdays.length === 0 ? (
            <p className="text-sm text-neutral">
              No birthdays this month.
            </p>
          ) : (
            <ul className="space-y-2">
              {birthdays.map((b) => (
                <li
                  key={b._id}
                  className="flex justify-between text-sm border-b pb-2 last:border-b-0"
                >
                  <span>{b.employeeName}</span>
                  <span className="text-neutral">
                    {new Date(b.dateOfBirth).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Info */}
        <div className="card bg-base-100 p-4">
          <h3 className="font-medium mb-3">Access</h3>
          <p className="text-sm text-neutral">
            This page is read-only.  
            You can view your colleagues and upcoming birthdays, but cannot
            edit or manage team members.
          </p>
        </div>
      </div>
    </div>
  );
}
