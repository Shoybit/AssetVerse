import React from "react";
import { motion } from "framer-motion";
import { 
  FaBox, 
  FaUsers, 
  FaCheckCircle, 
  FaChartLine, 
  FaPalette, 
  FaHeadset,
  FaShieldAlt,
  FaSyncAlt,
} from "react-icons/fa";

const features = [
  {
    title: "Asset Tracking",
    desc: "Track all company assets in one centralized system with real-time updates and location monitoring.",
    icon: <FaBox className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Employee Management",
    desc: "Assign assets to employees and manage accountability with comprehensive team management tools.",
    icon: <FaUsers className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Request & Approval",
    desc: "Employees request assets, HR approves with automated workflows and instant notifications.",
    icon: <FaCheckCircle className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500"
  },
  {
    title: "Advanced Analytics",
    desc: "Visual reports help HR monitor usage, cost, and asset performance with actionable insights.",
    icon: <FaChartLine className="w-8 h-8" />,
    color: "from-orange-500 to-yellow-500"
  },
  {
    title: "Custom Branding",
    desc: "Personalize the system with your organization's logo, colors, and corporate identity.",
    icon: <FaPalette className="w-8 h-8" />,
    color: "from-pink-500 to-rose-500"
  },
  {
    title: "24/7 Support",
    desc: "Premium plans include round-the-clock technical support and dedicated account management.",
    icon: <FaHeadset className="w-8 h-8" />,
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Security & Compliance",
    desc: "Enterprise-grade security with role-based access, audit logs, and GDPR compliance.",
    icon: <FaShieldAlt className="w-8 h-8" />,
    color: "from-red-500 to-orange-500"
  },
  {
    title: "Real-time Sync",
    desc: "Automatic synchronization across all devices with offline capability and instant updates.",
    icon: <FaSyncAlt className="w-8 h-8" />,
    color: "from-teal-500 to-green-500"
  },

];

export default function FeaturesShowcase() {
  return (
<>
</>
  );
}