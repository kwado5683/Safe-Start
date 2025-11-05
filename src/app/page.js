import Link from "next/link";
import CoursesPanel from "@/components/ui/courses";

/**
 * Home Page Component
 * Mobile-first landing page with well-organized sections:
 * - Hero section with call-to-action
 * - About section with platform details
 * - Training options for organizations and individuals
 * - How it works section
 * - Courses panel
 */
export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-emerald-100 to-gray-100 py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium mb-4">
            Safe Start • Health & Safety Training
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Health & Safety Training
            <br />
            Made Simple
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Online courses for individuals and organisations. Learn at your own pace, pass the quiz, and get certified.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link
              href="/get-started"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Get Started
            </Link>
            <Link
              href="#courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:border-gray-300 transition-colors"
            >
              View Courses
            </Link>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            For individuals and organisations · UK safety-focused courses
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8 border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            About Safe Start
          </h2>
          
          <div className="space-y-4 text-gray-600">
            <p>
              Safe Start is an online training platform built to help individuals and organisations meet mandatory health and safety requirements.
            </p>
            
            <p>
              Our courses cover the most common workplace risks faced in construction, healthcare, logistics, manufacturing, hospitality, retail, and office environments. Ensuring that every worker, manager, or contractor is equipped with the knowledge to work safely and confidently.
            </p>
            
            <p>
              For organisations, Safe Start provides an all-in-one solution to assign courses, track staff progress, issue certificates, and manage refresher training. For individuals, it&apos;s a fast, flexible way to learn at your own pace, pass short quizzes, and download certificates recognised across industries.
            </p>
            
            <p className="font-medium text-emerald-700">
              With Safe Start, compliance becomes effortless, empowering workplaces to stay safe and confident.
            </p>
          </div>
        </div>
      </section>

      {/* Training Options Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Choose your training path
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/* Organisation Option */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Organisations
              </h3>
              <p className="text-sm text-gray-600">
                Add staff, assign courses, view reports, and manage compliance all in one place.
              </p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Bulk course assignments</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Progress tracking & reporting</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Certificate management</span>
              </li>
            </ul>
            
            <Link
              href="/pricing?type=org"
              className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-black transition-colors"
            >
              Get Started for Organisations
            </Link>
          </div>

          {/* Individual Option */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                For Individuals
              </h3>
              <p className="text-sm text-gray-600">
                Take a course at your own pace and download your certificate instantly.
              </p>
            </div>
            
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Learn at your own pace</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Instant certificate downloads</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-600 mt-0.5">✓</span>
                <span>Wide Industry Recognition</span>
              </li>
            </ul>
            
            <Link
              href="/pricing?type=individual"
              className="inline-flex items-center justify-center w-full px-5 py-2.5 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors"
            >
              Get Started as Individual
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-500 text-center mt-6">
          Already invited by your employer? Just sign in and complete your course.
        </p>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            How Safe Start Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Path</h3>
              <p className="text-sm text-gray-600">
                Select whether you're training as an individual or organisation
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Pick Your Courses</h3>
              <p className="text-sm text-gray-600">
                Choose from our range of  health & safety courses
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Learn & Pass</h3>
              <p className="text-sm text-gray-600">
                Complete the course material and pass the quiz at your own pace
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Get Certified</h3>
              <p className="text-sm text-gray-600">
                Download your certificate and maintain compliance records
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Our Courses
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Explore our comprehensive range of health and safety training courses, designed for UK workplaces across all industries.
        </p>
        <CoursesPanel />
      </section>
    </main>
  );
}
