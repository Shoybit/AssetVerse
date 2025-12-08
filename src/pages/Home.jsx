import React from 'react';

const Home = () => {
  return (
    <div className="py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold mb-4">AssetVerse</h1>
        <p className="text-lg text-neutral mb-6">A simple, reliable corporate asset management platform for HR teams and employees.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Track assets</h3>
            <p className="text-sm text-neutral">Manage inventory, track assignments, and reduce loss.</p>
          </div>
          <div className="card p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Request & Approve</h3>
            <p className="text-sm text-neutral">Employees request assets, HR approves with a single click.</p>
          </div>
          <div className="card p-6 shadow hover:shadow-lg transition">
            <h3 className="font-semibold mb-2">Scalable packages</h3>
            <p className="text-sm text-neutral">Upgrade packages as your team grows — Stripe ready.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home
