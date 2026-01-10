import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { 
  CalendarDays, 
  User, 
  ArrowRight, 
  BookOpen,
  TrendingUp,
  FileText,
  Settings,
  Sparkles
} from "lucide-react";
import Loader from "../components/Loader";

const blogs = [
  {
    id: 1,
    title: "How Asset Management Improves Productivity",
    excerpt: "Learn how a smart asset management system reduces downtime, saves cost, and boosts team productivity.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "AssetVerse Team",
    date: "Jan 10, 2026",
    category: "Asset Management",
    icon: <TrendingUp className="w-4 h-4" />,
    readTime: "5 min read",
    tags: ["Productivity", "Efficiency", "ROI"]
  },
  {
    id: 2,
    title: "Returnable vs Non-Returnable Assets Explained",
    excerpt: "Understand the key differences between returnable and non-returnable assets with real examples.",
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "HR Desk",
    date: "Jan 8, 2026",
    category: "HR Guide",
    icon: <FileText className="w-4 h-4" />,
    readTime: "4 min read",
    tags: ["HR", "Compliance", "Assets"]
  },
  {
    id: 3,
    title: "Best Practices for Employee Asset Requests",
    excerpt: "Avoid common mistakes when requesting assets and ensure faster HR approval.",
    image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Operations Team",
    date: "Jan 5, 2026",
    category: "Workflow",
    icon: <Settings className="w-4 h-4" />,
    readTime: "6 min read",
    tags: ["Workflow", "Best Practices", "Approval"]
  },
  {
    id: 4,
    title: "Digital Transformation in Asset Tracking",
    excerpt: "Discover how digital solutions are revolutionizing traditional asset tracking methods.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Tech Team",
    date: "Jan 3, 2026",
    category: "Technology",
    icon: <Sparkles className="w-4 h-4" />,
    readTime: "7 min read",
    tags: ["Digital", "Innovation", "Tracking"]
  },
  {
    id: 5,
    title: "Cost-Benefit Analysis of Asset Management Software",
    excerpt: "A comprehensive guide to evaluating the ROI of asset management solutions.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Finance Team",
    date: "Dec 28, 2025",
    category: "Finance",
    icon: <TrendingUp className="w-4 h-4" />,
    readTime: "8 min read",
    tags: ["Finance", "ROI", "Analysis"]
  },
  {
    id: 6,
    title: "Employee Onboarding & Asset Allocation Guide",
    excerpt: "Streamline your onboarding process with efficient asset allocation strategies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "HR Desk",
    date: "Dec 22, 2025",
    category: "Onboarding",
    icon: <BookOpen className="w-4 h-4" />,
    readTime: "5 min read",
    tags: ["Onboarding", "HR", "Allocation"]
  },
];

const Blog = () => {
    const [loading, setLoading] = useState(true);
  useEffect(() => {
    document.title = "Blog | AssetVerse";
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader/>;
  }


  return (
    <div className="min-h-screen bg-linear-to-b from-base-100 to-base-200">
      <div className="">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium">Insights & Guides</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            AssetVerse{" "}
            <span className="bg-linear-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          
          <p className="text-lg text-base-content/70 max-w-3xl mx-auto leading-relaxed">
            Expert insights, actionable guides, and industry best practices on asset management, 
            HR workflows, and organizational productivity.
          </p>
          
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div className="bg-linear-to-r from-primary/5 to-secondary/5 rounded-2xl p-1">
            <div className="bg-base-100 rounded-2xl overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="badge badge-primary badge-lg">
                      Featured
                    </span>
                    <span className="text-sm text-base-content/60">Most Read</span>
                  </div>
                  <h2 className="text-3xl font-bold mb-4">
                    The Future of Asset Management: AI & Automation
                  </h2>
                  <p className="text-base-content/70 mb-6 leading-relaxed">
                    Explore how artificial intelligence and automation are transforming asset 
                    management processes, reducing human error, and increasing operational efficiency.
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-base-content/60" />
                      <span className="text-sm">Alex Morgan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-4 h-4 text-base-content/60" />
                      <span className="text-sm">Jan 15, 2026</span>
                    </div>
                    <span className="text-sm text-primary">12 min read</span>
                  </div>
                  <Link 
                    to="#" 
                    className="btn btn-primary group"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className="h-full min-h-100">
                  <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="AI in Asset Management"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Grid */}
        <div>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold">Latest Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="group bg-base-100 rounded-2xl border border-base-300 overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image Container */}
                <div className="relative overflow-hidden h-56">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-base-100/90 backdrop-blur-sm text-sm font-medium">
                      {blog.icon}
                      {blog.category}
                    </span>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-content text-sm">
                      {blog.readTime}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {blog.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 rounded-full bg-base-200 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-base-content/70 mb-6 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between pt-4 border-t border-base-300">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-base-content/60" />
                        <span className="text-sm">{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-base-content/60" />
                        <span className="text-sm">{blog.date}</span>
                      </div>
                    </div>
                    <Link
                      to={`#`}
                      className="btn btn-circle btn-sm btn-ghost group/read"
                    >
                      <ArrowRight className="w-5 h-5 group-hover/read:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center">
          <div className="bg-linear-to-r from-primary/10 to-secondary/10 rounded-2xl p-8 md:p-12">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-3xl font-bold mb-4">
                Never Miss an Update
              </h3>
              <p className="text-base-content/70 mb-8">
                Subscribe to our newsletter and get the latest insights on asset management 
                delivered directly to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 input input-bordered"
                />
                <button className="btn btn-primary">
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
              <p className="text-sm text-base-content/50 mt-4">
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;