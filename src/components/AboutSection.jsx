import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { 
  FaSearch, 
  FaChartLine, 
  FaCheckCircle, 
  FaShieldAlt,
  FaBuilding,
  FaUsers,
  FaBriefcase,
  FaIndustry
} from "react-icons/fa";

const features = [
  {
    id: "tracking",
    title: "Centralized Asset Tracking",
    desc: "Keep a single source of truth for all company hardware and software. Assign, audit and locate assets in seconds.",
    icon: <FaSearch className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "visibility",
    title: "Real-time Visibility & Reporting",
    desc: "Live dashboards and exportable reports give HR and leadership the insights to optimize utilization and spending.",
    icon: <FaChartLine className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "workflow",
    title: "Streamlined Request & Approval",
    desc: "Employees request assets via an intuitive flow — HR approves with one click. Notifications keep everyone in sync.",
    icon: <FaCheckCircle className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "security",
    title: "Enterprise-grade Security",
    desc: "Role-based access, audit logs, and secure storage ensure only the right people can see and change asset data.",
    icon: <FaShieldAlt className="w-8 h-8" />,
    color: "from-orange-500 to-red-500"
  },
];

const industries = [
  { icon: <FaBuilding />, label: "Corporate" },
  { icon: <FaUsers />, label: "Startups" },
  { icon: <FaBriefcase />, label: "SMBs" },
  { icon: <FaIndustry />, label: "Enterprise" },
];

export default function AboutSection() {
  return (
    <section className="py-16 bg-linear-to-b from-base-100 to-base-50">
      <div className="max-w-12/12 mx-auto ">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <FaChartLine className="text-primary" />
            <span className="text-sm font-medium text-primary">Why Choose AssetVerse</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your Asset
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Management Experience
            </span>
          </h2>
          
          <p className="text-lg text-base-content/70 mb-8 leading-relaxed">
            Built for modern HR teams and employees — AssetVerse centralizes asset management, 
            simplifies workflows, and delivers actionable insights to reduce costs and improve compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register-hr" 
              className="btn btn-primary btn-lg px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Get Started as HR
            </Link>
            <Link 
              to="/register-employee" 
              className="btn btn-outline btn-primary btn-lg px-8 rounded-xl hover:bg-primary hover:text-primary-content hover:shadow-lg transition-all duration-300"
            >
              Join as Employee
            </Link>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-base-content/70 mb-4">
                  {feature.desc}
                </p>
                
                <div className="pt-4 border-t border-base-200">

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-base-content/70">Companies Trust Us</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-base-content/70">Asset Accuracy</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">70%</div>
              <div className="text-sm text-base-content/70">Faster Approvals</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-base-content/70">Support Available</div>
            </div>
          </div>
        </motion.div>

        {/* Trust Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border-t border-base-300 pt-12"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">Trusted Across Industries</h3>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              From startups to enterprises, AssetVerse adapts to your business needs
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {industries.map((industry, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 bg-base-100 rounded-xl border border-base-300 hover:border-primary transition-colors duration-300"
              >
                <div className="text-primary mb-2 text-xl">
                  {industry.icon}
                </div>
                <span className="font-medium">{industry.label}</span>
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            <div className="text-sm font-medium bg-base-200 px-4 py-2 rounded-full">
              Tech Companies
            </div>
            <div className="text-sm font-medium bg-base-200 px-4 py-2 rounded-full">
              Finance & Banking
            </div>
            <div className="text-sm font-medium bg-base-200 px-4 py-2 rounded-full">
              Healthcare
            </div>
            <div className="text-sm font-medium bg-base-200 px-4 py-2 rounded-full">
              Education
            </div>
            <div className="text-sm font-medium bg-base-200 px-4 py-2 rounded-full">
              Manufacturing
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}