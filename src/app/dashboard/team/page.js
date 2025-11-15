"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatStaffLimit } from "@/lib/plans";

/**
 * Team Management Page
 * Add, view, and remove team members with plan limit enforcement
 */
export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [organization, setOrganization] = useState(null);
  const [planData, setPlanData] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [formError, setFormError] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    fetchTeamData();
    fetchPlanData();
  }, []);

  const fetchTeamData = async () => {
    try {
      const response = await fetch("/api/team");
      const data = await response.json();

      if (response.ok) {
        setMembers(data.members || []);
        setOrganization(data.organization);
      }
    } catch (error) {
      console.error("Error fetching team:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPlanData = async () => {
    try {
      const response = await fetch("/api/organization/plan");
      const data = await response.json();

      if (response.ok) {
        setPlanData(data);
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      const response = await fetch("/api/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMembers([data.member, ...members]);
        setFormData({ name: "", email: "" });
        setShowAddForm(false);
        // Refresh plan data to update usage
        fetchPlanData();
      } else {
        setFormError(data.message || data.error);
      }
    } catch (error) {
      setFormError("Failed to add team member. Please try again.");
      console.error("Error adding member:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteMember = async (memberId, memberName) => {
    if (
      !confirm(
        `Are you sure you want to remove ${memberName}? This will also delete all their course assignments.`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/team/${memberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMembers(members.filter((m) => m.id !== memberId));
        // Refresh plan data to update usage
        fetchPlanData();
      } else {
        const data = await response.json();
        alert(`Failed to delete member: ${data.error}`);
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading team...</p>
        </div>
      </div>
    );
  }

  const canAddMore = planData
    ? planData.usage.teamMembers < planData.plan.staffLimit
    : false;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your staff members and their training
          </p>
        </div>
        {canAddMore && !showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            + Add Member
          </button>
        )}
      </div>

      {/* Plan Limit Info */}
      {planData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">
                Team Member Usage
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {planData.usage.teamMembers} /{" "}
                {formatStaffLimit(planData.plan.id)} used
              </p>
            </div>
            {!canAddMore && planData.plan.id !== "business" && (
              <Link
                href="/dashboard/upgrade"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Upgrade Plan
              </Link>
            )}
          </div>
        </div>
      )}

      {/* Limit Reached Warning */}
      {!canAddMore && planData?.plan.id !== "business" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Team member limit reached.</strong> You've reached the
            maximum number of team members for your{" "}
            {planData?.plan.name || "current"} plan.{" "}
            <Link
              href="/dashboard/upgrade"
              className="underline font-medium hover:text-yellow-900"
            >
              Upgrade your plan
            </Link>{" "}
            to add more staff.
          </p>
        </div>
      )}

      {/* Add Member Form */}
      {showAddForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Add Team Member
          </h2>
          <form onSubmit={handleAddMember} className="space-y-4">
            {formError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                {formError}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="e.g. John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="e.g. john.smith@company.com"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={formLoading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium disabled:opacity-50"
              >
                {formLoading ? "Adding..." : "Add Member"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setFormError("");
                  setFormData({ name: "", email: "" });
                }}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Team Members List */}
      {members.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">👥</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No team members yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add your first team member to get started with training management
          </p>
          {canAddMore && !showAddForm && (
            <button
              onClick={() => setShowAddForm(true)}
              className="px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
            >
              Add Your First Member
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Courses
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {members.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">
                        {member.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                          member.status === "active"
                            ? "bg-green-100 text-green-800"
                            : member.status === "invited"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {member.course_assignments?.length || 0} assigned
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}


