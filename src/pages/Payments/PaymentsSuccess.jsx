import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../../services/api"; 

export default function PaymentsSuccess() {
  
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const verifyPayment = async () => {
      try {
        const res = await api.get(`/payments/verify?session_id=${sessionId}`);
        setPayment(res.data);
      } catch (err) {
        console.error("Payment verification error:", err);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  return (
    <div className="py-12 text-center">
      <h2 className="text-4xl font-bold text-green-600">Payment Successful 🎉</h2>

      <p className="mt-4 text-gray-700 text-lg">
        Thank you for your payment.
      </p>

      {/* Show session ID */}
      <div className="mt-4">
        <p className="text-gray-600">Stripe Session ID:</p>
        <code className="bg-gray-100 px-3 py-1 rounded text-sm">
          {sessionId}
        </code>
      </div>

      {/* Show verification result */}
      <div className="mt-8 max-w-md mx-auto bg-white shadow p-6 rounded-lg">
        {loading ? (
          <p>Verifying payment…</p>
        ) : payment ? (
          <>
            <p className="text-lg">
              <strong>Package:</strong> {payment.package}
            </p>
            <p className="text-lg">
              <strong>Amount:</strong> ${payment.amount}
            </p>
            <p className="text-lg">
              <strong>Status:</strong> {payment.status}
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Your subscription will update automatically.
            </p>
          </>
        ) : (
          <p className="text-gray-600">
            Payment confirmed. Waiting for webhook to update your account.
          </p>
        )}
      </div>

      <a
        href="dashboard/hr/payments"
        className="inline-block mt-6 bg-primary text-white px-6 py-3 rounded-lg shadow hover:opacity-80 transition"
      >
        Payment History
      </a>
    </div>
  );
}
