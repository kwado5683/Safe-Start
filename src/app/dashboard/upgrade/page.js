"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

/**
 * Upgrade Plan Page
 * Shows available plans and allows upgrading from current plan
 */
export default function UpgradePage() {
  const [loading, setLoading] = useState(true);
  const [planData, setPlanData] = useState(null);

  useEffect(() => {
    fetchPlanData();
  }, []);

  const fetchPlanData = async () => {
    try {
      const response = await fetch("/api/organization/plan");
      const data = await response.json();

      if (response.ok) {
        setPlanData(data);
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    );
  }

  const currentPlanId = planData?.plan?.id || "free";
  const plansArray = [
    { ...PLANS.free, id: "free", desc: "2 staff • 2 courses" },
    { ...PLANS.starter, id: "starter", desc: "Up to 10 staff" },
    { ...PLANS.pro, id: "pro", desc: "Up to 50 staff" },
    { ...PLANS.business, id: "business", desc: "Unlimited staff" },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Upgrade Your Plan</h1>
        <p className="text-gray-600 mt-1">
          Choose a plan that fits your organization's needs
        </p>
      </div>

      {/* Current Plan Info */}
      {planData && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
          <p className="text-sm font-medium text-emerald-900">
            Current Plan: <span className="font-bold">{planData.plan.name}</span>
          </p>
          <p className="text-xs text-emerald-700 mt-1">
            {planData.usage.teamMembers} of{" "}
            {planData.plan.staffLimit === Infinity
              ? "unlimited"
              : planData.plan.staffLimit}{" "}
            team members used
          </p>
        </div>
      )}

      {/* Comparison Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Feature
                </th>
                {plansArray.map((plan) => (
                  <th
                    key={plan.id}
                    className={`px-6 py-4 text-center text-sm font-semibold ${
                      plan.id === currentPlanId
                        ? "bg-emerald-100 text-emerald-900"
                        : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                    {plan.id === currentPlanId && (
                      <span className="block text-xs font-normal mt-1">
                        Current Plan
                      </span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  Price
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    <div className="text-lg font-bold text-emerald-600">
                      {plan.price}
                    </div>
                    {plan.priceAmount > 0 && (
                      <div className="text-xs text-gray-600">/month</div>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Team Members
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center text-sm ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    {plan.staffLimit === Infinity
                      ? "Unlimited"
                      : `Up to ${plan.staffLimit}`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">Courses</td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center text-sm ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    {plan.courseIds === "all"
                      ? "All courses"
                      : `${plan.courseIds.length} courses`}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Progress Tracking
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    <span className="text-emerald-600">✓</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Certificate Management
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    <span className="text-emerald-600">✓</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Admin Dashboard
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    <span className="text-emerald-600">✓</span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Priority Support
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    {plan.id === "free" || plan.id === "starter" ? (
                      <span className="text-gray-400">-</span>
                    ) : (
                      <span className="text-emerald-600">✓</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Dedicated Account Manager
                </td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    {plan.id === "business" ? (
                      <span className="text-emerald-600">✓</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-6 py-4"></td>
                {plansArray.map((plan) => (
                  <td
                    key={plan.id}
                    className={`px-6 py-4 text-center ${
                      plan.id === currentPlanId ? "bg-emerald-50" : ""
                    }`}
                  >
                    {plan.id === currentPlanId ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded-md font-medium cursor-not-allowed"
                      >
                        Current Plan
                      </button>
                    ) : plan.id === "free" ? (
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-200 text-gray-500 rounded-md font-medium cursor-not-allowed text-sm"
                      >
                        Not Available
                      </button>
                    ) : (
                      <Link
                        href={`/checkout?plan=${plan.id}`}
                        className="block w-full px-4 py-2 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 transition-colors"
                      >
                        Upgrade
                      </Link>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Can I change my plan later?
            </h3>
            <p className="text-sm text-gray-600">
              Yes, you can upgrade your plan at any time. Downgrades will take
              effect at the end of your current billing period.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              What happens if I exceed my team member limit?
            </h3>
            <p className="text-sm text-gray-600">
              You'll be prompted to upgrade your plan before you can add more
              team members. Existing members will continue to have access.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-1">
              Are there any setup fees?
            </h3>
            <p className="text-sm text-gray-600">
              No, there are no setup fees. You only pay the monthly
              subscription price for your chosen plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


