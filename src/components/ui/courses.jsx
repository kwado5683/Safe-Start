"use client";

import { useState } from "react";

// Array of course data with id, title, and description for each course
const coursesData = [
  {
    id: 1,
    title: "General Health & Safety Awareness",
    description:
      "Covers basic UK workplace safety principles, employee/employer responsibilities, risk, and reporting.",
  },
  {
    id: 2,
    title: "Manual Handling",
    description:
      "Teaches safe lifting, carrying, and moving techniques to reduce back injuries in any work environment.",
  },
  {
    id: 3,
    title: "Fire Safety & Extinguisher Awareness",
    description:
      "Explains fire hazards, alarm procedures, evacuation routes, and the main fire extinguisher types.",
  },
  {
    id: 4,
    title: "Slips, Trips & Falls Prevention",
    description:
      "Focuses on common workplace causes of slips and trips and how to control them in offices, care, and warehouses.",
  },
  {
    id: 5,
    title: "COSHH (Hazardous Substances)",
    description:
      "Introduces working safely with chemicals, cleaning products, and other hazardous materials under UK COSHH rules.",
  },
  {
    id: 6,
    title: "Display Screen Equipment (DSE)",
    description:
      "For office and hybrid workers — safe desk setup, posture, and breaks to prevent strain.",
  },
  {
    id: 7,
    title: "First Aid Awareness",
    description:
      "Basic response to incidents, when to call for help, and understanding workplace first aid roles.",
  },
  {
    id: 8,
    title: "Food Hygiene & Safety (Awareness)",
    description:
      "Suitable for hospitality, care, and catering — covers contamination, hand washing, and safe storage.",
  },
  {
    id: 9,
    title: "Safeguarding Awareness",
    description:
      "For care, education, and health settings — spotting and reporting concerns about vulnerable people.",
  },
  {
    id: 10,
    title: "Working at Height Awareness",
    description:
      "Safe use of ladders and access equipment, fall prevention, and planning work at height.",
  },
  {
    id: 11,
    title: "PPE Selection & Use",
    description:
      "How to choose, wear, and maintain personal protective equipment for different roles and industries.",
  },
  {
    id: 12,
    title: "Incident & Near Miss Reporting",
    description:
      "Why reporting matters, what to record, and how it supports continuous safety improvement.",
  },
];

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

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors">
              Enroll Now
            </button>
            <button className="flex-1 px-5 py-2.5 bg-white text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:border-gray-300 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
