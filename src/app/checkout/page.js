"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

/**
 * Checkout Page Content Component
 * Handles the checkout process for upgrading to paid plans
 */
function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const planId = searchParams.get("plan");

  const [loading, setLoading] = useState(true);
  const [currentPlan, setCurrentPlan] = useState(null);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchCurrentPlan();
  }, []);

  const fetchCurrentPlan = async () => {
    try {
      const response = await fetch("/api/organization/plan");
      const data = await response.json();

      if (response.ok) {
        setCurrentPlan(data.plan);
      }
    } catch (error) {
      console.error("Error fetching current plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    setProcessing(true);
    
    // Simulated checkout process
    // In production, integrate with Stripe or other payment provider
    alert(
      `Payment integration pending.\n\nThis would redirect to payment gateway for ${selectedPlan.name} plan (${selectedPlan.price}/month).\n\nFor demo purposes, this is a placeholder.`
    );
    
    setProcessing(false);
  };

  if (!planId || !PLANS[planId]) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Invalid Plan
          </h1>
          <p className="text-gray-600 mb-6">
            The selected plan is not valid. Please choose a valid plan.
          </p>
          <Link
            href="/dashboard/upgrade"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            View Plans
          </Link>
        </div>
      </div>
    );
  }

  const selectedPlan = PLANS[planId];

  if (planId === "free") {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white border border-gray-200 rounded-xl p-8 text-center max-w-md">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            You're Already on the Free Plan!
          </h1>
          <p className="text-gray-600 mb-6">
            No payment needed. Start using your dashboard now.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-gray-900">
            Safe Start
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-6">
            Complete Your Upgrade
          </h1>
          <p className="text-gray-600 mt-2">
            Upgrade to {selectedPlan.name} and unlock more features
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-4">
              <div className="flex items-start justify-between pb-4 border-b">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {selectedPlan.name} Plan
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Monthly subscription
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">{selectedPlan.price}</p>
                  <p className="text-sm text-gray-600">/month</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 text-sm">
                  What's included:
                </h4>
                <ul className="space-y-2">
                  {selectedPlan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <span className="text-emerald-600 mt-0.5">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900">
                    Total due today
                  </span>
                  <span className="text-2xl font-bold text-emerald-600">
                    {selectedPlan.price}
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Billed monthly. Cancel anytime.
                </p>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Payment Details
            </h2>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900">
                <strong>Demo Mode:</strong> Payment integration is not yet
                active. This is a placeholder for Stripe or other payment
                gateway.
              </p>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVC
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    disabled
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Smith"
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                />
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={processing}
                className="w-full px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50 mt-6"
              >
                {processing ? "Processing..." : `Pay ${selectedPlan.price}/month`}
              </button>

              <div className="text-center">
                <Link
                  href="/dashboard/upgrade"
                  className="text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Back to plans
                </Link>
              </div>
            </form>

            <div className="mt-6 pt-6 border-t">
              <p className="text-xs text-gray-600 text-center">
                Secured by industry-standard encryption. Your payment
                information is safe and secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Checkout Page
 * Wrapper component with Suspense boundary
 */
export default function CheckoutPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading checkout...</p>
        </div>
      </div>
    }>
      <CheckoutContent />
    </Suspense>
  );
}


