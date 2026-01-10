import React, { useEffect, useState } from "react";
import { 
  Mail, 
  Phone, 
  Clock, 
  MapPin, 
  Send, 
  Zap, 
  HelpCircle,
  User,
  MessageSquare,
  Shield,
  Headphones,
  FileText,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
import Loader from "../../components/Loader";

const Support = () => {

    const [loading, setLoading] = useState(true);
  
  useEffect(() => {
  document.title = "Support | AssetVerse ";
}, []);


  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    priority: "normal"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log("Support request:", form);

    setIsSubmitting(false);
    setShowSuccess(true);
    setForm({ name: "", email: "", message: "", priority: "normal" });

    setTimeout(() => setShowSuccess(false), 5000);
  };

  const faqs = [
    {
      question: "How do I request an asset?",
      answer: "Navigate to Dashboard → Request Asset, select the desired asset from the catalog, fill in the required details, and submit your request for HR approval.",
      icon: <FileText className="w-5 h-5" />
    },
    {
      question: "How long does approval take?",
      answer: "Asset requests are typically processed within 1–2 business days. Urgent requests can be expedited by contacting support directly.",
      icon: <Clock className="w-5 h-5" />
    },
    {
      question: "Who can I contact for urgent issues?",
      answer: "For urgent matters, email support@assetverse.com with 'URGENT' in the subject line or call our priority support hotline during business hours.",
      icon: <Shield className="w-5 h-5" />
    },
    {
      question: "What are returnable vs non-returnable assets?",
      answer: "Returnable assets (like laptops) must be returned when no longer needed. Non-returnable assets (like stationery) are consumables that don't require return.",
      icon: <HelpCircle className="w-5 h-5" />
    },
    {
      question: "How do I report a damaged asset?",
      answer: "Go to My Assets → Select the asset → Click Report Issue → Describe the damage. Our support team will arrange repair or replacement.",
      icon: <AlertTriangle className="w-5 h-5" />
    },
    {
      question: "Is my data secure with AssetVerse?",
      answer: "Yes, we use enterprise-grade encryption and comply with global data protection standards. Your information is always secure.",
      icon: <Shield className="w-5 h-5" />
    }
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6 text-primary" />,
      title: "Email",
      value: "shoyaib105@gmail.com",
      desc: "General inquiries"
    },
    {
      icon: <Phone className="w-6 h-6 text-secondary" />,
      title: "Phone",
      value: "+8801743870639",
      desc: "Mon-Fri, 9AM-6PM"
    },
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Response Time",
      value: "Within 24 hours",
      desc: "Average response"
    },
    {
      icon: <MapPin className="w-6 h-6 text-success" />,
      title: "Location",
      value: "Dhaka, Bangladesh",
      desc: "Headquarters"
    }
  ];

  const priorities = [
    { value: "low", label: "Low", color: "badge-info" },
    { value: "normal", label: "Normal", color: "badge-success" },
    { value: "high", label: "High", color: "badge-warning" },
    { value: "urgent", label: "Urgent", color: "badge-error" }
  ];

    if (loading) {
    return <Loader/>;
  }

  return (
    <div className="min-h-screen ">
      <div className="">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Headphones className="w-5 h-5" />
            <span className="text-sm font-medium">24/7 Support</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Support &{" "}
            <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Help Center
            </span>
          </h1>
          
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Get instant help from our expert support team. We're here to resolve 
            your queries and ensure smooth asset management.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="max-w-3xl mx-auto mb-8 animate-fade-in">
            <div className="alert alert-success shadow-lg">
              <CheckCircle className="w-6 h-6" />
              <div>
                <h3 className="font-bold">Message Sent Successfully!</h3>
                <div className="text-sm">Our support team will contact you within 24 hours.</div>
              </div>
            </div>
          </div>
        )}

        {/* Main Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Card */}
          <div className="lg:col-span-1">
            <div className="bg-base-100 rounded-2xl border border-base-300 p-8 shadow-lg sticky top-8">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-primary/10">
                  <Headphones className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Contact Information</h2>
                  <p className="text-base-content/60 text-sm">Multiple ways to reach us</p>
                </div>
              </div>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 hover:bg-base-200 rounded-lg transition-colors">
                    <div className="p-2 rounded-lg bg-base-200">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-base-content/80">{item.value}</p>
                      <p className="text-sm text-base-content/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-linear-to-r from-primary/5 to-secondary/5 rounded-xl">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-primary" />
                  <span className="font-semibold">Quick Response Guarantee</span>
                </div>
                <p className="text-sm text-base-content/70 mt-2">
                  We respond to all queries within <strong>24 hours</strong>. Urgent issues are prioritized.
                </p>
              </div>
            </div>
          </div>

          {/* Support Form */}
          <div className="lg:col-span-2">
            <div className="bg-base-100 rounded-2xl border border-base-300 p-8 shadow-lg">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <MessageSquare className="w-8 h-8 text-secondary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Send us a message</h2>
                  <p className="text-base-content/60 text-sm">Fill out the form below and we'll get back to you</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Your Name
                      </span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="label">
                      <span className="label-text font-medium flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Email Address
                      </span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full focus:ring-2 focus:ring-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label">
                    <span className="label-text font-medium">Priority Level</span>
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {priorities.map((priority) => (
                      <label
                        key={priority.value}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="priority"
                          value={priority.value}
                          checked={form.priority === priority.value}
                          onChange={handleChange}
                          className="radio radio-sm"
                        />
                        <span className={`badge badge-sm ${priority.color}`}>
                          {priority.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="label">
                    <span className="label-text font-medium flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message
                    </span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="textarea textarea-bordered w-full focus:ring-2 focus:ring-primary"
                    placeholder="Please describe your issue in detail..."
                  />
                  <div className="text-xs text-base-content/50 flex justify-between">
                    <span>Include asset IDs if applicable</span>
                    <span>{form.message.length}/1000 characters</span>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary btn-block group"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-base-content/70 max-w-2xl mx-auto">
              Find quick answers to common questions about AssetVerse
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="collapse collapse-plus bg-base-100 border border-base-300 rounded-xl hover:border-primary/30 transition-colors"
              >
                <input type="checkbox" />
                <div className="collapse-title text-xl font-semibold flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {faq.icon}
                  </div>
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-base-content/70 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Support;