import React from "react";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router"; 

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 border-t border-base-300">
      <div className="max-w-10/12 mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Company Info */}
          <div className="space-y-4">
            
          <Link to="/" className="text-2xl font-bold tracking-wide">
            Asset<span className="text-primary">Verse</span>
          </Link>
        

            <p className="text-sm text-base-content/70">
              Streamlining asset management for modern workplaces.
            </p>

            <div className="flex gap-3">
              <a
                href="#"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Follow us on Facebook"
                title="Facebook"
                rel="noopener noreferrer"
              >
                <FaFacebook />

              </a>

              <a
                href="#"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Follow us on Twitter"
                title="Twitter"
                rel="noopener noreferrer"
              >
               <BsTwitterX/>

              </a>

              <a
                href="#"
                className="btn btn-circle btn-ghost btn-sm"
                aria-label="Follow us on LinkedIn"
                title="LinkedIn"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="link link-hover">Home</Link></li>
              <li><Link to="/register-employee" className="link link-hover">Join as Employee</Link></li>
              <li><Link to="/register-hr" className="link link-hover">Join as HR Manager</Link></li>
              <li><Link to="/pricing" className="link link-hover">Pricing</Link></li>
              <li><Link to="/contact" className="link link-hover">Contact</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/help" className="link link-hover">Help Center</Link></li>
              <li><Link to="/docs" className="link link-hover">Documentation</Link></li>
              <li><Link to="/blog" className="link link-hover">Blog</Link></li>
              <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
              <li><Link to="/terms" className="link link-hover">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-sm text-base-content/70">Email</p>
                <a href="mailto:support@assetverse.com" className="link link-hover">shoyaib105@gmail.com</a>
              </div>

              <div>
                <p className="text-sm text-base-content/70">Phone</p>
                <a href="tel:+18005551234" className="link link-hover">+8801743870639</a>
              </div>

              <div>
                <p className="text-sm text-base-content/70">Address</p>
                <address className="not-italic text-base-content/70 text-sm">
                  123 Tech Street<br />
                  San Francisco, CA 94107
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-base-300 mt-8  text-center">
          <p className="text-base-content/70">© {currentYear} AssetVerse. All rights reserved.</p>

        </div>
      </div>
    </footer>
  );
}
