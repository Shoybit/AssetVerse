/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import api from "../../../services/api";
import AuthContext from "../../../context/AuthContext";
import Skeleton from "../../../components/Skeleton";
import { useNavigate } from "react-router";

export default function MyTeam() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [affiliations, setAffiliations] = useState([]); // full list
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const load = async (p = 1) => {
    setLoading(true);
    try {
      // fetch affiliations for this employee (backend should support /affiliations?employeeEmail=... or /affiliations/my)
      const res = await api.get(`/affiliations/my?page=${p}&limit=${limit}`);
      const items = res.data.items || res.data || [];
      setAffiliations(items);
      setFiltered(items);
      setTotal(res.data.total || items.length);
      setPage(res.data.page || p);
    } catch (err) {
      console.error("Failed to load affiliations", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!q) setFiltered(affiliations);
    else {
      const qq = q.toLowerCase();
      setFiltered(
        affiliations.filter(
          (a) =>
            (a.employeeName || "").toLowerCase().includes(qq) ||
            (a.employeeEmail || "").toLowerCase().includes(qq)
        )
      );
    }
  }, [q, affiliations]);

  // helpers: get companies user is affiliated with
  const companies = Array.from(
    new Set(affiliations.map((a) => a.companyName).filter(Boolean))
  );

  // birthdays in current month
  const now = new Date();
  const currentMonth = now.getMonth();
  const birthdays = affiliations.filter((a) => {
    if (!a.dateOfBirth) return false;
    const dob = new Date(a.dateOfBirth);
    return dob.getMonth() === currentMonth;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">My Team</h2>
        <div className="flex items-center gap-2">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or email"
            className="input input-bordered"
          />
          <button
            className="btn btn-ghost"
            onClick={() => {
              setQ("");
              setFiltered(affiliations);
            }}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium mb-2">Companies</h3>
        <div className="flex gap-2">
          {companies.length === 0 ? (
            <div className="text-sm text-neutral">
              No company affiliations yet.
            </div>
          ) : (
            companies.map((c) => (
              <button
                key={c}
                className="btn btn-outline btn-sm"
                onClick={() => {
                  setFiltered(affiliations.filter((a) => a.companyName === c));
                }}
              >
                {c}
              </button>
            ))
          )}
          {companies.length > 0 && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setFiltered(affiliations)}
            >
              All
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card p-4">
          <h4 className="font-medium">Team members ({filtered.length})</h4>
          {loading ? (
            <Skeleton count={5} />
          ) : (
            <ul>
              {filtered.slice(0, 10).map((item) => (
                <li key={item._id} className="py-2 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{item.employeeName}</div>
                      <div className="text-xs text-neutral">
                        {item.employeeEmail}
                      </div>
                      <div className="text-xs text-neutral">
                        {item.companyName}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-xs btn-ghost"
                        onClick={() =>
                          nav(
                            `/profile?email=${encodeURIComponent(
                              item.employeeEmail
                            )}`
                          )
                        }
                      >
                        Profile
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-4">
          <h4 className="font-medium">Birthdays this month</h4>
          {loading ? (
            <Skeleton count={3} />
          ) : birthdays.length === 0 ? (
            <div className="text-sm text-neutral">No birthdays this month.</div>
          ) : (
            <ul>
              {birthdays.map((b) => (
                <li key={b._id} className="py-2 border-b last:border-b-0">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{b.employeeName}</div>
                      <div className="text-xs text-neutral">
                        {new Date(b.dateOfBirth).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <button
                        className="btn btn-xs btn-primary"
                        onClick={() =>
                          nav(
                            `/profile?email=${encodeURIComponent(
                              b.employeeEmail
                            )}`
                          )
                        }
                      >
                        Send wishes
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card p-4">
          <h4 className="font-medium">Quick actions</h4>
          <div className="mt-3 space-y-2">
            <button
              className="btn btn-block"
              onClick={() => nav("/request-asset")}
            >
              Request an asset
            </button>
            <button
              className="btn btn-outline btn-block"
              onClick={() => nav("/my-assets")}
            >
              My assets
            </button>
          </div>
        </div>
      </div>

      {/* Pagination controls */}
      {total > limit && (
        <div className="flex items-center justify-center gap-3 mt-6">
          <button
            className="btn btn-sm"
            onClick={() => load(Math.max(1, page - 1))}
            disabled={page <= 1}
          >
            Prev
          </button>
          <span>
            Page {page} / {Math.ceil(total / limit)}
          </span>
          <button
            className="btn btn-sm"
            onClick={() => load(page + 1)}
            disabled={page >= Math.ceil(total / limit)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
