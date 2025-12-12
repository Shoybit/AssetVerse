import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar, FaBuilding, FaUsers, FaBox, FaChartLine } from "react-icons/fa";

const stats = [
  { 
    value: "500+", 
    label: "Companies Trust Us", 
    icon: <FaBuilding className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500"
  },
  { 
    value: "50k+", 
    label: "Assets Tracked", 
    icon: <FaBox className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500"
  },
  { 
    value: "100k+", 
    label: "Requests Processed", 
    icon: <FaUsers className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500"
  },
  { 
    value: "99.9%", 
    label: "System Uptime", 
    icon: <FaChartLine className="w-6 h-6" />,
    color: "from-orange-500 to-yellow-500"
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "HR Director, TechNova Solutions",
    company: "TechNova",
    feedback: "AssetVerse completely transformed how we track and assign company assets. Our workflow is 70% faster and completely transparent. The analytics dashboard alone.",
    rating: 5,
    avatarColor: "bg-blue-500",
  },
  {
    name: "Michael Lee",
    role: "Operations Lead, DevCore Technologies",
    company: "DevCore",
    feedback: "The request & approval system has revolutionized our operations. What used to take days now happens in hours. The mobile app keeps our field teams connected and productive.",
    rating: 5,
    avatarColor: "bg-purple-500",
  },
  {
    name: "Aisha Rahman",
    role: "People Operations, Cloudify Inc",
    company: "Cloudify",
    feedback: "From onboarding to daily operations, AssetVerse keeps everything organized and secure. The customer support team is phenomenal - always responsive and helpful.",
    rating: 5,
    avatarColor: "bg-green-500",
  },
  {
    name: "David Chen",
    role: "IT Manager, FinSecure Bank",
    company: "FinSecure",
    feedback: "The security features and compliance tools gave us the confidence to manage sensitive assets. Integration with our existing systems was seamless. Highly recommend!",
    rating: 5,
    avatarColor: "bg-orange-500",
  },
];

export default function TestimonialsStats() {
  return (
    <section className="py-20 from-base-100 to-base-200">
      <div className="max-w-12/12 mx-auto ">
        
        {/* STATS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
              <FaChartLine className="text-primary" />
              <span className="text-sm font-medium text-primary">Trusted by Industry Leaders</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Proven Results That
              <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Speak for Themselves
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className={`inline-flex p-3 rounded-xl bg-linear-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {stat.icon}
                  </div>
                  
                  <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                  <div className="text-base-content/70 text-sm">{stat.label}</div>
                  
                  <div className="mt-4 pt-4 border-t border-base-200">
                    <div className="h-1 w-full bg-base-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        viewport={{ once: true }}
                        className={`h-full bg-linear-to-r ${stat.color}`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* TESTIMONIALS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Loved by
              <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                Teams Worldwide
              </span>
            </h2>
            
            <p className="text-lg text-base-content/70 leading-relaxed">
              Join thousands of satisfied customers who have transformed their asset management with AssetVerse.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="h-full bg-base-100 rounded-2xl p-6 border border-base-300 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                  <div className="mb-4">
                    <FaQuoteLeft className="w-6 h-6 text-primary/50 group-hover:text-primary transition-colors" />
                  </div>
                  
                  <p className="text-base-content/80 mb-6 italic leading-relaxed">
                    "{testimonial.feedback}"
                  </p>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  
                  {/* Profile */}
                  <div className="flex items-center gap-3 mt-auto pt-4 border-t border-base-200">
                    <div className={`w-12 h-12 rounded-full ${testimonial.avatarColor} text-white flex items-center justify-center font-bold text-lg`}>
                      {testimonial.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <div className="font-bold text-sm">{testimonial.name}</div>
                      <div className="text-xs text-base-content/70">{testimonial.role}</div>
                      <div className="text-xs text-primary font-medium mt-1">{testimonial.company}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}