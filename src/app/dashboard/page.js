"use client";

import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { formatStaffLimit } from "@/lib/plans";

/**
 * Dashboard Overview Page
 * Displays organization stats, plan info, and quick actions
 */
export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const [loading, setLoading] = useState(true);
  const [orgData, setOrgData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isLoaded && user) {
      initializeOrganization();
    }
  }, [isLoaded, user]);

  const initializeOrganization = async () => {
    try {
      // Try to get existing organization
      const getResponse = await fetch("/api/organization/init");
      const getData = await getResponse.json();

      if (!getData.organization) {
        // Create new organization if it doesn't exist
        const createResponse = await fetch("/api/organization/init", {
          method: "POST",
        });
        const createData = await createResponse.json();
        
        if (!createResponse.ok) {
          throw new Error(createData.error || "Failed to initialize organization");
        }
      }

      // Fetch full plan data
      const planResponse = await fetch("/api/organization/plan");
      const planData = await planResponse.json();

      if (!planResponse.ok) {
        throw new Error(planData.error || "Failed to fetch plan data");
      }

      setOrgData(planData);
    } catch (err) {
      console.error("Error initializing organization:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-800 font-medium">Error loading dashboard</p>
          <p className="text-red-600 text-sm mt-2">{error}</p>
          <button
            onClick={initializeOrganization}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!orgData) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
          <p className="text-yellow-800">No organization data found</p>
        </div>
      </div>
    );
  }

  const { organization, plan, usage } = orgData;
  const usagePercentage = plan.staffLimit === Infinity 
    ? 0 
    : (usage.teamMembers / plan.staffLimit) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.firstName || "there"}!
        </h1>
        <p className="text-gray-600 mt-1">
          Manage your team's health & safety training
        </p>
      </div>

      {/* Current Plan Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-xl font-semibold text-gray-900">
                {plan.name} Plan
              </h2>
              <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium">
                Current Plan
              </span>
            </div>
            <p className="text-3xl font-bold text-emerald-600 mt-2">
              {plan.price}
              {plan.priceAmount > 0 && (
                <span className="text-lg text-gray-600">/month</span>
              )}
            </p>
          </div>
          {plan.id !== "business" && (
            <Link
              href="/dashboard/upgrade"
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-black transition-colors text-sm font-medium"
            >
              Upgrade Plan
            </Link>
          )}
        </div>

        {/* Usage Stats */}
        <div className="mt-6 space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Team Members
              </span>
              <span className="text-sm text-gray-600">
                {usage.teamMembers} / {formatStaffLimit(plan.id)}
              </span>
            </div>
            {plan.staffLimit !== Infinity && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    usagePercentage >= 90
                      ? "bg-red-600"
                      : usagePercentage >= 70
                      ? "bg-yellow-600"
                      : "bg-emerald-600"
                  }`}
                  style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                />
              </div>
            )}
          </div>

          {usagePercentage >= 80 && plan.id !== "business" && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Tip:</strong> You're nearing your team member limit.
                Consider{" "}
                <Link
                  href="/dashboard/upgrade"
                  className="underline font-medium"
                >
                  upgrading your plan
                </Link>{" "}
                to add more staff.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Link
          href="/dashboard/team"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl mb-4">
            👥
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Manage Team
          </h3>
          <p className="text-sm text-gray-600">
            Add team members and manage your staff
          </p>
          <div className="mt-4 text-emerald-600 font-medium text-sm">
            {usage.teamMembers} member{usage.teamMembers !== 1 ? "s" : ""} →
          </div>
        </Link>

        <Link
          href="/dashboard/courses"
          className="bg-white border border-gray-200 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center text-2xl mb-4">
            📚
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Assign Courses
          </h3>
          <p className="text-sm text-gray-600">
            Assign training courses to your team
          </p>
          <div className="mt-4 text-emerald-600 font-medium text-sm">
            View courses →
          </div>
        </Link>

        <Link
          href="/dashboard/upgrade"
          className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-2 border-emerald-300 rounded-xl p-6 hover:border-emerald-500 hover:shadow-lg transition-all"
        >
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl mb-4">
            ⭐
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upgrade Plan
          </h3>
          <p className="text-sm text-gray-600">
            Unlock more features and team members
          </p>
          <div className="mt-4 text-emerald-700 font-medium text-sm">
            See plans →
          </div>
        </Link>
      </div>

      {/* Getting Started Guide (for new users) */}
      {usage.teamMembers === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            🚀 Getting Started
          </h3>
          <ol className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="font-bold">1.</span>
              <span>
                <Link href="/dashboard/team" className="underline font-medium">
                  Add your team members
                </Link>{" "}
                - Start with up to 2 staff on the free plan
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">2.</span>
              <span>
                <Link
                  href="/dashboard/courses"
                  className="underline font-medium"
                >
                  Assign courses
                </Link>{" "}
                - Choose from 2 available courses on the free plan
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold">3.</span>
              <span>Track progress and manage certificates</span>
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}

