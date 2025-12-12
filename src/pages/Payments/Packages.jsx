import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import PackageCard from "../../components/PackageCard";
import AuthContext from "../../context/AuthContext";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/packages");
      setPackages(res.data.packages || []);
    } catch (err) {
      console.error("Load packages", err);
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (pkg) => {
    if (!user || user.role !== "hr") {
      return alert("Only HR users can buy packages. Log in as HR.");
    }

    setBuying(true);
    try {
      const res = await api.post("/payments/checkout", {
        packageId: pkg._id,
      });

      const url = res.data?.url || res.data?.checkoutUrl;

      if (!url) {
        alert("Checkout URL missing from backend.");
        setBuying(false);
        return;
      }

      window.open(url, "_blank");

      alert(
        "Checkout opened in new tab. Complete payment there — your subscription updates automatically after Stripe webhook confirms payment."
      );

    } catch (err) {
      console.error("Checkout error", err);
      alert(err.response?.data?.message || "Failed to create checkout session");
    } finally {
      setBuying(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Packages{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            & Billing
          </span>
        </h2>

        <div className="text-sm text-neutral">
          Your role: {user?.role || "guest"}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading packages…</div>
      ) : error ? (
        <div className="alert alert-error">{error}</div>
      ) : (
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg._id}
              pkg={pkg}
              onBuy={handleBuy}
              disabled={buying}
            />
          ))}
        </div>
      )}
    </div>
  );
}
