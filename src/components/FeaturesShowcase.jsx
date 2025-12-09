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
    <section className="py-20 bg-linear-to-b from-base-50 to-base-100">
      <div className="max-w-11/12 mx-auto ">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <FaChartLine className="text-primary" />
            <span className="text-sm font-medium text-primary">Comprehensive Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Everything You Need for
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Modern Asset Management
            </span>
          </h2>
          
          <p className="text-lg text-base-content/70 leading-relaxed">
            A complete suite of tools designed to streamline asset tracking, improve efficiency, 
            and provide actionable insights for your organization.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-base-content/70 mb-4 text-sm leading-relaxed">
                  {feature.desc}
                </p>
                
                <div className="pt-4 border-t border-base-200">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more
                    <span className="text-xs">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl p-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">12+</div>
              <div className="text-sm text-base-content/70">Core Features</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
              <div className="text-sm text-base-content/70">Uptime Guarantee</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-base-content/70">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-base-content/70">Support Available</div>
            </div>
          </div>
        </motion.div>


      </div>
    </section>
  );
}