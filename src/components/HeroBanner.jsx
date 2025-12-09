import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaArrowRight, FaShieldAlt, FaChartLine, FaSyncAlt } from "react-icons/fa";

export default function HeroBanner() {
  return (
    <section >
      <div className="max-w-11/12 mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Text Content - Mobile: Center, Desktop: Left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6"
            >
              <FaShieldAlt className="text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by 500+ Companies</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="block">Streamline Your</span>
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Asset Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-base-content/70 text-lg lg:text-xl mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              AssetVerse provides a complete solution for tracking, managing, and optimizing 
              company assets with real-time visibility, security, and efficiency.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Link 
                to="/register-employee" 
                className="btn btn-primary btn-lg group px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <span className="flex items-center justify-center gap-2">
                  Join as Employee
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link 
                to="/register-hr" 
                className="btn btn-outline btn-primary btn-lg px-8 rounded-xl hover:bg-primary hover:text-primary-content hover:shadow-lg transition-all duration-300"
              >
                Join as HR Manager
              </Link>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="flex items-center justify-center lg:justify-start gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <FaSyncAlt className="text-primary" size={18} />
                </div>
                <span className="text-sm font-medium">Real-time Tracking</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <FaShieldAlt className="text-secondary" size={18} />
                </div>
                <span className="text-sm font-medium">Secure & Reliable</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-3 p-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FaChartLine className="text-accent" size={18} />
                </div>
                <span className="text-sm font-medium">Smart Analytics</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Illustration / Image - Mobile: Below, Desktop: Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            className="w-full lg:w-1/2 mt-12 lg:mt-0 order-first lg:order-last"
          >
            <div className="relative max-w-[650px] mx-auto">
              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <motion.img
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                  alt="Modern Asset Management Dashboard"
                  className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Floating Elements */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute -bottom-4 -left-4 bg-base-100 p-4 rounded-xl shadow-lg border max-w-xs hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FaChartLine className="text-primary" size={20} />
                  </div>
                  <div>
                    <div className="font-bold">98%</div>
                    <div className="text-sm text-base-content/70">Asset Accuracy</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="absolute -top-4 -right-4 bg-base-100 p-4 rounded-xl shadow-lg border max-w-xs hidden sm:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <FaShieldAlt className="text-secondary" size={20} />
                  </div>
                  <div>
                    <div className="font-bold">99.9%</div>
                    <div className="text-sm text-base-content/70">System Uptime</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}