import Link from "next/link";
import CoursesPanel from "@/components/ui/courses";
import Pricing from "@/components/ui/pricing";

/**
 * Home Page Component
 * B2B platform landing page for organizations:
 * - Hero section with call-to-action
 * - About section with platform details
 * - Organization benefits
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
            Safe Start • Health & Safety Training for Organisations
          </span>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
            Enterprise Health & Safety Training
            <br />
            Made Simple
          </h1>
          
          <p className="text-base md:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Comprehensive online training for your entire organisation. Manage staff training, track progress, and ensure compliance across your workplace.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#pricing"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-md text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer"
            >
              View Plans
            </a>
            <a
              href="#courses"
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border border-gray-200 rounded-md text-sm font-medium hover:border-gray-300 transition-colors cursor-pointer"
            >
              View Courses
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-6">
            Trusted by organisations across the UK • Comprehensive safety training
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
              Safe Start is an enterprise training platform built to help organisations meet mandatory health and safety requirements with ease.
            </p>
            
            <p>
              Our courses cover the most common workplace risks faced in construction, healthcare, logistics, manufacturing, hospitality, retail, and office environments. We ensure that every worker, manager, and contractor is equipped with the knowledge to work safely and confidently.
            </p>
            
            <p>
              Safe Start provides an all-in-one solution to assign courses, track staff progress, issue certificates, and manage refresher training. Our centralized admin dashboard gives you complete visibility and control over your organisation's compliance status.
            </p>
            
            <p className="font-medium text-emerald-700">
              With Safe Start, compliance becomes effortless, empowering workplaces to stay safe and confident.
            </p>
          </div>
        </div>
      </section>

      {/* Organisation Benefits Section */}
      <section className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">
          Everything Your Organisation Needs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
              📊
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Centralized Management
            </h3>
            <p className="text-sm text-gray-600">
              Add staff, assign courses, and monitor completion rates all from one intuitive dashboard.
            </p>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
              📈
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Progress Tracking
            </h3>
            <p className="text-sm text-gray-600">
              Real-time visibility into training progress with detailed reports and analytics for compliance audits.
            </p>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-lg flex items-center justify-center text-2xl font-bold mb-4">
              🎓
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Certificate Management
            </h3>
            <p className="text-sm text-gray-600">
              Automatic certificate generation and storage, with alerts for upcoming refresher training.
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#pricing"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md text-sm font-medium hover:bg-black transition-colors cursor-pointer"
          >
            Get Started for Your Organisation
          </a>
        </div>
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
              <h3 className="font-semibold text-gray-900 mb-2">Choose Your Plan</h3>
              <p className="text-sm text-gray-600">
                Select the organisation plan that matches your team size and training needs
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Add Your Team</h3>
              <p className="text-sm text-gray-600">
                Invite staff members and assign relevant courses from our comprehensive library
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">
                Monitor completion rates and training status through your admin dashboard
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Stay Compliant</h3>
              <p className="text-sm text-gray-600">
                Automatically generate certificates and receive alerts for refresher training
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

      {/* Pricing Section */}
      <Pricing />
    </main>
  );
}
