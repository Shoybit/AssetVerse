import React, { useEffect } from "react";
import { Link } from "react-router";

const blogs = [
  {
    id: 1,
    title: "How Asset Management Improves Productivity",
    excerpt:
      "Learn how a smart asset management system reduces downtime, saves cost, and boosts team productivity.",
    image:
      "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    author: "AssetVerse Team",
    date: "Jan 10, 2026",
    category: "Asset Management",
  },
  {
    id: 2,
    title: "Returnable vs Non-Returnable Assets Explained",
    excerpt:
      "Understand the key differences between returnable and non-returnable assets with real examples.",
    image:
      "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc",
    author: "HR Desk",
    date: "Jan 8, 2026",
    category: "HR Guide",
  },
  {
    id: 3,
    title: "Best Practices for Employee Asset Requests",
    excerpt:
      "Avoid common mistakes when requesting assets and ensure faster HR approval.",
    image:
      "https://images.unsplash.com/photo-1556761175-4b46a572b786",
    author: "Operations Team",
    date: "Jan 5, 2026",
    category: "Workflow",
  },
];

const Blog = () => {
  useEffect(() => {
    document.title = "Blog | AssetVerse";
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold">
          AssetVerse{" "}
          <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
            Blog
          </span>
        </h1>
        <p className="text-base-content/70 mt-3 max-w-2xl mx-auto">
          Insights, guides, and best practices on asset management, HR workflows,
          and productivity.
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="card bg-base-100 border border-base-300 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Image */}
            <figure className="h-48 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </figure>

            {/* Content */}
            <div className="card-body">
              <span className="badge badge-outline badge-primary w-fit">
                {blog.category}
              </span>

              <h2 className="card-title text-lg mt-2 line-clamp-2">
                {blog.title}
              </h2>

              <p className="text-sm text-base-content/70 line-clamp-3">
                {blog.excerpt}
              </p>

              {/* Meta */}
              <div className="flex items-center justify-between text-xs text-base-content/60 mt-4">
                <span>✍️ {blog.author}</span>
                <span>📅 {blog.date}</span>
              </div>

              {/* Action */}
              <div className="card-actions mt-4">
                <Link
                  to="#"
                  className="btn btn-sm btn-primary btn-outline"
                >
                  Read More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
