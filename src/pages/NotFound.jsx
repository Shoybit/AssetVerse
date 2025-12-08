import React from 'react';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div className="py-24 text-center">
      <h2 className="text-4xl font-bold">404</h2>
      <p className="mt-4 text-lg">Page not found.</p>
      <Link to="/" className="btn btn-link mt-6">Back to home</Link>
    </div>
  );
}
