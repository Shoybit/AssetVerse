import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router";
import HeroBanner from "../components/HeroBanner";
import AboutSection from "../components/AboutSection";

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await api.get("/packages");
        if (mounted) setPackages(res.data.packages || []);
      } catch (err) {
        console.error("Load packages failed", err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (

    <>
    <HeroBanner></HeroBanner>
    <AboutSection></AboutSection>
   
    <div className="py-12">
      <div className="max-w-5xl mx-auto text-center px-4">
        <h1 className="text-5xl font-extrabold mb-4">AssetVerse</h1>
        <p className="text-lg text-neutral mb-6">
          Simple, reliable asset management for HR teams and employees.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link to={"/register-hr"} className="btn btn-primary">
            Get started as HR
          </Link>
          <Link to={"/register-employee"} className="btn btn-ghost">
            Join as Employee
          </Link>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Available Packages</h2>

          {loading ? (
            <div className="text-center">Loading packages...</div>
          ) : packages.length === 0 ? (
            <div className="text-center text-neutral">No packages found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {packages.map((p) => (
                <div
                  key={p._id}
                  className="card p-4 shadow hover:shadow-lg transition"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{p.name}</h3>
                      <p className="text-sm text-neutral">
                        {p.features?.slice(0, 3).join(" • ")}
                      </p>
                    </div>
                    <div className="text-2xl font-bold">${p.price}</div>
                  </div>
                  <div className="mt-3 text-sm">
                    Employee limit: <strong>{p.employeeLimit}</strong>
                  </div>
                  <div className="card-actions mt-4">
                    <a href="/hr/packages" className="btn btn-sm btn-primary">
                      View & Buy
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card p-6 shadow">
            <h4 className="font-semibold mb-2">Track assets</h4>
            <p className="text-sm text-neutral">
              Manage inventory, assign assets, and reduce loss.
            </p>
          </div>
          <div className="card p-6 shadow">
            <h4 className="font-semibold mb-2">Request & Approve</h4>
            <p className="text-sm text-neutral">
              Employees request assets and HR approves them.
            </p>
          </div>
          <div className="card p-6 shadow">
            <h4 className="font-semibold mb-2">Billing & Packages</h4>
            <p className="text-sm text-neutral">
              Upgrade packages easily with Stripe checkout.
            </p>
          </div>
        </section>
      </div>
    </div>
     </>
  );
}
