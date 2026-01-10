import React, { useEffect, useState } from "react";
import { 
  Target, 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Sparkles,
  Globe,
  Heart,
  Award,
  Clock,
  TrendingUp,
  Cpu,
  Lock,
  Smartphone,
  Code,
  ChevronRight,
  CheckCircle,
  Play,
  Mail
} from "lucide-react";
import Loader from "../components/Loader";

const About = () => {
    const [loading, setLoading] = useState(true);
      

      useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 1200); 
    
        return () => clearTimeout(timer);
      }, []);

    
  useEffect(() => {
    document.title = "About Us | AssetVerse";
  }, []);

  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Sub-second response times with optimized performance",
      color: "from-yellow-500 to-orange-500"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Bank-Level Security",
      description: "256-bit encryption, 2FA, and SOC2 compliant",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Smart Analytics",
      description: "Real-time insights and predictive analytics",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: "AI-Powered",
      description: "Intelligent asset recommendations and automation",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const timeline = [
    {
      year: "2023",
      title: "Founded",
      description: "AssetVerse was born to solve enterprise asset management"
    },
    {
      year: "2024",
      title: "First 100 Clients",
      description: "Reached milestone with SMB and enterprise clients"
    },
    {
      year: "2025",
      title: "AI Features Launched",
      description: "Introduced predictive analytics and automation"
    },
    {
      year: "2026",
      title: "Global Expansion",
      description: "Serving clients across 50+ countries"
    }
  ];

        if (loading) {
        return <Loader />;
      }
  return (
    <div className="min-h-screen bg-linear-to-br from-base-100 via-base-100 to-primary/5">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl"></div>
      </div>

      <div>
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 mb-6 px-6 py-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-primary font-semibold">Revolutionizing Asset Management</span>
          </div>
             <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
             We are{" "}
            <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              AssetVerse
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-base-content/80 max-w-3xl mx-auto leading-relaxed mb-10">
            We're on a mission to transform how organizations worldwide manage their 
            assets through intelligent automation and cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn btn-primary btn-lg group">
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="btn btn-outline btn-lg group">
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">
          <div className="relative">
            <div className=" border border-base-300 rounded-3xl p-8 shadow-2xl hover:shadow-primary/10 transition-shadow duration-300">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center">
                <Target className="w-10 h-10 text-white" />
              </div>
              <div className="pt-12">
                <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
                <p className="text-lg text-base-content/80 leading-relaxed mb-6">
                  To eliminate inefficiencies in asset management through 
                  intelligent automation, creating a seamless bridge between 
                  employees and management.
                </p>
                <ul className="space-y-3">
                  {["Reduce asset loss by 90%", "Cut approval times by 75%", "Increase transparency 100%"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-success" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="card bg-base-100/80 backdrop-blur-sm border border-base-300 rounded-3xl p-8 shadow-2xl hover:shadow-secondary/10 transition-shadow duration-300">
              <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-secondary to-accent rounded-2xl flex items-center justify-center">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <div className="pt-12">
                <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
                <p className="text-lg text-base-content/80 leading-relaxed mb-6">
                  To become the global standard for enterprise asset management, 
                  empowering organizations to maximize productivity through 
                  intelligent resource optimization.
                </p>
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <TrendingUp className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">50+ Countries</div>
                    <div className="text-sm text-base-content/60">Global presence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Features */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why AssetVerse Stands Out</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Experience the future of asset management with our cutting-edge platform
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Feature Selector */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full p-6 rounded-2xl text-left transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-gradient-to-r from-primary/10 to-secondary/10 border-2 border-primary/30' 
                      : 'bg-base-100 border border-base-300 hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color}`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{feature.title}</h3>
                      <p className="text-base-content/70">{feature.description}</p>
                    </div>
                    {activeFeature === index && (
                      <ChevronRight className="w-5 h-5 ml-auto text-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Display */}
            <div className="relative">
              <div className="card bg-gradient-to-br from-base-100 to-base-200 border border-base-300 rounded-3xl p-8 h-full">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${features[activeFeature].color}`}>
                    {features[activeFeature].icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>
                    <p className="text-base-content/70">Advanced feature details</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-base-200/50 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Performance</span>
                      <span className="text-success">99.9%</span>
                    </div>
                    <div className="h-2 bg-base-300 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                        style={{ width: '99.9%' }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-base-content/80 leading-relaxed">
                    {features[activeFeature].title} ensures enterprise-grade reliability 
                    with real-time updates and predictive maintenance alerts. 
                    Our platform continuously learns from your usage patterns to 
                    optimize performance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              From startup to industry leader in asset management
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-secondary hidden md:block"></div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {timeline.map((item, index) => (
                <div 
                  key={index} 
                  className={`relative ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12 md:mt-24'}`}
                >
                  <div className="card bg-base-100 border border-base-300 rounded-2xl p-6 hover:shadow-xl transition-shadow">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      <Clock className="w-4 h-4" />
                      {item.year}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base-content/70">{item.description}</p>
                  </div>
                  <div className="hidden md:block absolute top-6 w-4 h-4 rounded-full bg-gradient-to-r from-primary to-secondary border-4 border-base-100"
                    style={{ [index % 2 === 0 ? 'right' : 'left']: '-26px' }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {[
            { value: "10K+", label: "Assets Managed", icon: "🏢", color: "bg-primary/10" },
            { value: "500+", label: "Happy Clients", icon: "😊", color: "bg-secondary/10" },
            { value: "50+", label: "Countries", icon: "🌎", color: "bg-accent/10" },
            { value: "24/7", label: "Support", icon: "🛡️", color: "bg-success/10" }
          ].map((stat, index) => (
            <div key={index} className="card bg-base-100 border border-base-300 rounded-2xl p-6 text-center hover:scale-[1.02] transition-transform">
              <div className={`${stat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-base-content/70 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-secondary p-1">
          <div className="relative bg-base-100 rounded-3xl p-8 md:p-12 text-center">
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-secondary/10 rounded-full blur-3xl"></div>
            
            <div className="relative">
              <Award className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Asset Management?
              </h2>
              <p className="text-base-content/70 max-w-2xl mx-auto mb-8">
                Join thousands of organizations that trust AssetVerse for their 
                asset management needs. Start your free trial today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <button className="btn btn-primary btn-lg group">
                  Start Free Trial
                  <Sparkles className="w-5 h-5 ml-2 group-hover:rotate-12 transition-transform" />
                </button>
                <button className="btn btn-outline btn-lg group">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Sales
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-6 text-sm text-base-content/60">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};

export default About;