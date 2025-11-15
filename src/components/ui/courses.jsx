"use client";

import { useState } from "react";
import { COURSES } from "@/lib/courses";

// Use shared course data for consistency
const coursesData = COURSES;

/**
 * CoursesPanel component - Displays available courses in a mobile-first layout
 * Shows a list of courses and a detail panel for the selected course
 * Uses React state to track which course is currently selected
 */
export default function CoursesPanel() {
  // State to track which course is currently selected (defaults to first course)
  const [selectedCourse, setSelectedCourse] = useState(coursesData[0]);

  return (
    <div className="w-full">
      {/* Courses grid - displays all courses on mobile, split view on desktop */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Left side - Courses list */}
        <div className="lg:col-span-1 border rounded-lg bg-white shadow-sm overflow-hidden">
          <h3 className="p-4 font-semibold border-b bg-gray-50 text-gray-900">
            Course List
          </h3>
          <ul className="divide-y max-h-[500px] overflow-y-auto">
            {/* Map through each course and create a clickable list item */}
            {coursesData.map((course) => (
              <li
                key={course.id}
                onClick={() => setSelectedCourse(course)}
                className={`p-4 cursor-pointer hover:bg-emerald-50 transition-colors text-sm ${
                  selectedCourse?.id === course.id
                    ? "bg-emerald-50 border-l-4 border-emerald-600 font-medium"
                    : ""
                }`}
              >
                {course.title}
              </li>
            ))}
          </ul>
        </div>

        {/* Right side - Description panel for selected course */}
        <div className="lg:col-span-2 border rounded-lg bg-white shadow-sm p-6">
          <div className="flex items-start gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center font-bold flex-shrink-0">
              {selectedCourse?.id}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {selectedCourse?.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {selectedCourse?.description}
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">Suitable for:</span>{" "}
              construction, healthcare, logistics, hospitality, offices and
              general UK workplaces.
            </p>
          </div>

          <div className="text-center">
            {/* <button className="flex-1 px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors">
              Enroll Now
            </button> */}
            {/* <button className="flex-1 px-5 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:border-gray-300 transition-colors">
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}
