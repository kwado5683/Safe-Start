/**
 * Plan Configuration and Utility Functions
 * Defines plan tiers and provides functions for limit checking
 */

// Plan tier definitions
export const PLANS = {
  free: {
    id: 'free',
    name: 'Free',
    price: '£0',
    priceAmount: 0,
    staffLimit: 2,
    courseIds: [1, 2], // Only first 2 courses available
    features: [
      'Up to 2 staff members',
      '2 courses included',
      'Basic progress tracking',
      'Certificate management'
    ]
  },
  starter: {
    id: 'starter',
    name: 'Starter',
    price: '£39',
    priceAmount: 39,
    staffLimit: 10,
    courseIds: 'all', // All courses
    features: [
      'Up to 10 staff members',
      'All courses included',
      'Progress tracking',
      'Certificate management',
      'Admin dashboard'
    ]
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    price: '£99',
    priceAmount: 99,
    staffLimit: 50,
    courseIds: 'all',
    features: [
      'Up to 50 staff members',
      'All courses included',
      'Advanced progress tracking',
      'Certificate management',
      'Admin dashboard',
      'Priority support'
    ]
  },
  business: {
    id: 'business',
    name: 'Business',
    price: '£199',
    priceAmount: 199,
    staffLimit: Infinity,
    courseIds: 'all',
    features: [
      'Unlimited staff members',
      'All courses included',
      'Advanced progress tracking',
      'Certificate management',
      'Admin dashboard',
      'Priority support',
      'Dedicated account manager'
    ]
  }
};

/**
 * Get plan details by plan ID
 */
export function getPlanDetails(planId) {
  return PLANS[planId] || PLANS.free;
}

/**
 * Check if an organization can add more team members
 */
export function canAddTeamMember(currentCount, planType) {
  const plan = getPlanDetails(planType);
  return currentCount < plan.staffLimit;
}

/**
 * Get the staff limit for a plan
 */
export function getStaffLimit(planType) {
  const plan = getPlanDetails(planType);
  return plan.staffLimit;
}

/**
 * Get available course IDs for a plan
 */
export function getAvailableCourses(planType) {
  const plan = getPlanDetails(planType);
  return plan.courseIds;
}

/**
 * Check if a course is available for a plan
 */
export function isCourseAvailable(courseId, planType) {
  const availableCourses = getAvailableCourses(planType);
  if (availableCourses === 'all') return true;
  return availableCourses.includes(courseId);
}

/**
 * Get remaining team member slots
 */
export function getRemainingSlots(currentCount, planType) {
  const plan = getPlanDetails(planType);
  if (plan.staffLimit === Infinity) return Infinity;
  return Math.max(0, plan.staffLimit - currentCount);
}

/**
 * Check if a plan is a paid plan
 */
export function isPaidPlan(planType) {
  return planType !== 'free';
}

/**
 * Get all plan IDs as an array
 */
export function getAllPlanIds() {
  return Object.keys(PLANS);
}

/**
 * Get upgrade suggestions based on current usage
 */
export function getUpgradeSuggestion(currentPlan, teamMemberCount) {
  const currentPlanDetails = getPlanDetails(currentPlan);
  
  // If at or near limit, suggest upgrade
  if (teamMemberCount >= currentPlanDetails.staffLimit * 0.8) {
    const planOrder = ['free', 'starter', 'pro', 'business'];
    const currentIndex = planOrder.indexOf(currentPlan);
    if (currentIndex < planOrder.length - 1) {
      return planOrder[currentIndex + 1];
    }
  }
  
  return null;
}

/**
 * Format staff limit for display
 */
export function formatStaffLimit(planType) {
  const limit = getStaffLimit(planType);
  return limit === Infinity ? 'Unlimited' : `Up to ${limit}`;
}


