"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COURSES, getCourseById } from "@/lib/courses";
import { getAvailableCourses } from "@/lib/plans";

/**
 * Course Assignment Page
 * Assign courses to team members with plan-based filtering
 */
export default function CoursesPage() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState([]);
  const [planData, setPlanData] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [teamResponse, planResponse] = await Promise.all([
        fetch("/api/team"),
        fetch("/api/organization/plan"),
      ]);

      const teamData = await teamResponse.json();
      const planDataResult = await planResponse.json();

      if (teamResponse.ok) {
        setMembers(teamData.members || []);
      }

      if (planResponse.ok) {
        setPlanData(planDataResult);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const getAvailableCoursesForPlan = () => {
    if (!planData) return [];
    
    const availableCourseIds = getAvailableCourses(planData.plan.id);
    
    if (availableCourseIds === 'all') {
      return COURSES;
    }
    
    return COURSES.filter(course => availableCourseIds.includes(course.id));
  };

  const handleAssignCourse = async (courseId) => {
    if (!selectedMember) return;

    setAssignLoading(true);
    setError("");

    try {
      const response = await fetch("/api/courses/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          memberId: selectedMember.id,
          courseId: courseId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update local state
        setMembers(
          members.map((m) =>
            m.id === selectedMember.id
              ? {
                  ...m,
                  course_assignments: [
                    ...(m.course_assignments || []),
                    data.assignment,
                  ],
                }
              : m
          )
        );
        setShowAssignModal(false);
        setSelectedMember(null);
      } else {
        setError(data.message || data.error);
      }
    } catch (error) {
      console.error("Error assigning course:", error);
      setError("Failed to assign course. Please try again.");
    } finally {
      setAssignLoading(false);
    }
  };

  const handleUnassignCourse = async (memberId, assignmentId, courseName) => {
    if (
      !confirm(
        `Are you sure you want to unassign "${courseName}" from this team member?`
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/courses/assign/${assignmentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Update local state
        setMembers(
          members.map((m) =>
            m.id === memberId
              ? {
                  ...m,
                  course_assignments: m.course_assignments.filter(
                    (a) => a.id !== assignmentId
                  ),
                }
              : m
          )
        );
      } else {
        const data = await response.json();
        alert(`Failed to unassign course: ${data.error}`);
      }
    } catch (error) {
      console.error("Error unassigning course:", error);
      alert("Failed to unassign course. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading courses...</p>
        </div>
      </div>
    );
  }

  const availableCourses = getAvailableCoursesForPlan();

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Course Assignment</h1>
        <p className="text-gray-600 mt-1">
          Assign training courses to your team members
        </p>
      </div>

      {/* Plan Info */}
      {planData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-900">
                Available Courses
              </p>
              <p className="text-xs text-blue-700 mt-1">
                {availableCourses.length} of {COURSES.length} courses available
                on your {planData.plan.name} plan
              </p>
            </div>
            {planData.plan.id === "free" && (
              <Link
                href="/dashboard/upgrade"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Unlock All Courses
              </Link>
            )}
          </div>
        </div>
      )}

      {/* No Members State */}
      {members.length === 0 ? (
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">📚</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            No team members yet
          </h3>
          <p className="text-gray-600 mb-6">
            Add team members first before assigning courses
          </p>
          <Link
            href="/dashboard/team"
            className="inline-block px-6 py-3 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors font-medium"
          >
            Add Team Members
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {members.map((member) => {
            const assignedCourseIds =
              member.course_assignments?.map((a) => a.course_id) || [];
            const unassignedCourses = availableCourses.filter(
              (c) => !assignedCourseIds.includes(c.id)
            );

            return (
              <div
                key={member.id}
                className="bg-white border border-gray-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {member.name}
                    </h3>
                    <p className="text-sm text-gray-600">{member.email}</p>
                  </div>
                  {unassignedCourses.length > 0 && (
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setShowAssignModal(true);
                        setError("");
                      }}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium"
                    >
                      + Assign Course
                    </button>
                  )}
                </div>

                {/* Assigned Courses */}
                {member.course_assignments &&
                member.course_assignments.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Assigned Courses ({member.course_assignments.length})
                    </p>
                    {member.course_assignments.map((assignment) => {
                      const course = getCourseById(assignment.course_id);
                      return (
                        <div
                          key={assignment.id}
                          className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
                        >
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                              {course?.title || `Course ${assignment.course_id}`}
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-gray-600">
                                Progress: {assignment.progress}%
                              </span>
                              {assignment.completed_at && (
                                <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                                  Completed
                                </span>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() =>
                              handleUnassignCourse(
                                member.id,
                                assignment.id,
                                course?.title || "this course"
                              )
                            }
                            className="text-red-600 hover:text-red-900 text-sm font-medium ml-4"
                          >
                            Remove
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic">
                    No courses assigned yet
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Assign Course Modal */}
      {showAssignModal && selectedMember && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Assign Course to {selectedMember.name}
                </h2>
                <button
                  onClick={() => {
                    setShowAssignModal(false);
                    setSelectedMember(null);
                    setError("");
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {error && (
              <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
                {error}
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-3">
                {availableCourses
                  .filter(
                    (course) =>
                      !selectedMember.course_assignments?.some(
                        (a) => a.course_id === course.id
                      )
                  )
                  .map((course) => (
                    <div
                      key={course.id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-emerald-500 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {course.description}
                          </p>
                        </div>
                        <button
                          onClick={() => handleAssignCourse(course.id)}
                          disabled={assignLoading}
                          className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors text-sm font-medium disabled:opacity-50 whitespace-nowrap"
                        >
                          {assignLoading ? "Assigning..." : "Assign"}
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


