import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import PackageCard from "../../components/PackageCard";
import AuthContext from "../../context/AuthContext";

/* -------- Loader -------- */
function PageLoader({ text = "Loading packages..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-sm text-gray-600">{text}</p>
    </div>
  );
}

export default function Packages() {
      useEffect(() => {
    document.title = "Packages | AssetVerse";
  }, []);
  const { user } = useContext(AuthContext);

  const [packages, setPackages] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [buying, setBuying] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPackages();
  }, []);

  const loadPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/packages");
      setPackages(res.data?.packages || []);
    } catch (err) {
      console.error("Load packages", err);
      setError(err.response?.data?.message || "Failed to load packages");
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  };

  const handleBuy = async (pkg) => {
    if (!user || user.role !== "hr") {
      return alert("Only HR users can buy packages.");
    }

    setBuying(true);
    try {
      const res = await api.post("/payments/checkout", {
        packageId: pkg._id,
      });

      const url = res.data?.url || res.data?.checkoutUrl;
      if (!url) throw new Error("Checkout URL missing");

      window.open(url, "_blank");
      alert(
        "Checkout opened in new tab. Complete payment there — your subscription will update automatically."
      );
    } catch (err) {
      console.error("Checkout error", err);
      alert(err.response?.data?.message || "Failed to start checkout");
    } finally {
      setBuying(false);
    }
  };

  /* -------- Loaders -------- */
  if (pageLoading || loading) {
    return <PageLoader text="Loading packages..." />;
  }

  /* -------- UI -------- */
  return (
    <div className="relative">
      {/* Buying overlay */}
      {buying && (
        <div className="absolute inset-0 z-10 bg-white/70 flex items-center justify-center">
          <PageLoader text="Redirecting to checkout..." />
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-900">
          Packages{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            & Billing
          </span>
        </h2>

        <div className="text-sm text-neutral">
          Your role: <strong>{user?.role || "guest"}</strong>
        </div>
      </div>

      {error ? (
        <div className="alert alert-error">{error}</div>
      ) : packages.length === 0 ? (
        <div className="text-center py-12 text-neutral">
          No packages available right now.
        </div>
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
