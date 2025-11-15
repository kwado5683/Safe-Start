/**
 * Course Data
 * Shared course definitions used across the application
 */

export const COURSES = [
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
 * Get course by ID
 */
export function getCourseById(courseId) {
  return COURSES.find((c) => c.id === courseId);
}

/**
 * Get multiple courses by IDs
 */
export function getCoursesByIds(courseIds) {
  return COURSES.filter((c) => courseIds.includes(c.id));
}

/**
 * Get all course IDs
 */
export function getAllCourseIds() {
  return COURSES.map((c) => c.id);
}


