import React, { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router";
import { 
  FaCheckCircle, 
  FaCrown, 
  FaRocket, 
  FaChartLine,
  FaStar,
  FaArrowRight
} from "react-icons/fa";
import { motion } from "framer-motion";

const allowedPlans = ["Basic", "Standard", "Premium"];

const planIcons = {
  "Basic": <FaRocket className="w-6 h-6" />,
  "Standard": <FaCrown className="w-6 h-6" />,
  "Premium": <FaStar className="w-6 h-6" />
};

const planColors = {
  "Basic": "from-blue-500 to-cyan-500",
  "Standard": "from-purple-500 to-pink-500",
  "Premium": "from-orange-500 to-yellow-500"
};

const commonFeatures = {
  "Basic": ["Basic asset tracking", "Up to 50 assets", "Email support"],
  "Standard": ["Advanced analytics", "Up to 200 assets", "Priority support", "Custom reports"],
  "Premium": ["Unlimited assets", "24/7 phone support", "API access", "Custom workflows", "Dedicated account manager"]
};

export default function PackagesSection() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("Standard");

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const res = await api.get('/api/packages');
        if (mounted) {
          const filtered = res.data.packages.filter((p) =>
            allowedPlans.includes(p.name)
          );
          setPackages(filtered.sort((a, b) => {
            const order = { "Basic": 1, "Standard": 2, "Premium": 3 };
            return order[a.name] - order[b.name];
          }));
        }
      } catch (err) {
        console.error("Load packages failed", err);
        setPackages([
          {
            _id: "1",
            name: "Basic",
            price: 29,
            employeeLimit: 10,
            features: commonFeatures["Basic"]
          },
          {
            _id: "2",
            name: "Standard",
            price: 79,
            employeeLimit: 50,
            features: commonFeatures["Standard"]
          },
          {
            _id: "3",
            name: "Premium",
            price: 199,
            employeeLimit: 200,
            features: commonFeatures["Premium"]
          }
        ]);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-linear-to-b from-base-100 to-base-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 ">
      <div className="max-w-12/12 mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <FaChartLine className="text-primary" />
            <span className="text-sm font-medium text-primary">Simple & Transparent</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pricing That
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Scales With You
            </span>
          </h2>
          
          <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
            Choose the perfect plan for your team. All plans include core features with 
            flexible scaling options for growing organizations.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-base-200 rounded-xl p-1 mb-8">
            <button className="px-6 py-2 rounded-lg font-medium bg-base-100 shadow">Monthly</button>
            <button className="px-6 py-2 rounded-lg font-medium text-base-content/70 hover:text-base-content">
              Yearly <span className="text-xs bg-primary text-primary-content px-2 py-0.5 rounded-full ml-1">Save 20%</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {packages.map((p, index) => {
            const isPopular = p.name === "Standard";
            const isSelected = p.name === selectedPlan;

            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${isPopular ? 'md:-mt-4 md:-mb-4' : ''}`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-linear-to-r from-primary to-secondary text-primary-content px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                {/* Card Container */}
                <div
                  className={`h-full rounded-2xl border-2 transition-all duration-300 hover:shadow-2xl ${
                    isPopular 
                      ? 'bg-base-100 border-primary shadow-xl' 
                      : 'bg-base-100 border-base-300 hover:border-primary/50'
                  } ${isSelected ? 'ring-2 ring-primary/20' : ''}`}
                  onClick={() => setSelectedPlan(p.name)}
                >
                  <div className="p-8">
                    {/* Plan Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${planColors[p.name]} text-white mb-2`}>
                          {planIcons[p.name]}
                        </div>
                        <h3 className="text-2xl font-bold">{p.name}</h3>
                      </div>
                      {isPopular && (
                        <div className="text-primary">
                          <FaCrown className="w-6 h-6" />
                        </div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-5xl font-bold">${p.price}</span>
                        <span className="text-base-content/70 ml-2">/month</span>
                      </div>
                      <p className="text-sm text-base-content/70 mt-1">
                        For up to {p.employeeLimit} employees
                      </p>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-3 mb-8">
                      {p.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <FaCheckCircle className="text-primary mt-1 shrink-0" />
                          <span className="text-base-content/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-8 p-4 bg-base-200/50 rounded-xl">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{p.name === "Premium" ? "Unlimited" : p.employeeLimit}</div>
                        <div className="text-xs text-base-content/70">Employees</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {p.name === "Basic" ? "50" : p.name === "Standard" ? "200" : "Unlimited"}
                        </div>
                        <div className="text-xs text-base-content/70">Assets</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                      to="/hr/packages"
                      className={`btn btn-lg w-full rounded-xl group ${
                        isPopular 
                          ? 'btn-primary shadow-lg hover:shadow-xl' 
                          : 'btn-outline btn-primary'
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        Get Started
                        <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>

                    {/* Trial Info */}
                    <p className="text-center text-sm text-base-content/60 mt-4">
                      {p.name === "Premium" ? "30-day free trial" : "14-day free trial"}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}