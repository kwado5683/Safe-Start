"use client";

import { useUser, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { PLANS } from "@/lib/plans";

/**
 * Pricing Component - Organization Plans
 * Displays tiered pricing for organizations including free tier
 */
export default function Pricing(){
  const { isSignedIn } = useUser();
  
  // Convert PLANS object to array for rendering
  const plansArray = [
    { ...PLANS.free, id: "free", desc: "2 staff • 2 courses" },
    { ...PLANS.starter, id: "starter", desc: "Up to 10 staff" },
    { ...PLANS.pro, id: "pro", desc: "Up to 50 staff" },
    { ...PLANS.business, id: "business", desc: "Unlimited staff" },
  ];
  
  return(
    <section id="pricing" className="bg-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            Organisation Plans
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your organisation's training needs. All plans include full access to our course library, progress tracking, and certificate management.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plansArray.map((p)=>(
            <div 
              key={p.id} 
              className={`bg-white border-2 rounded-xl p-6 hover:shadow-lg transition-all ${
                p.id === 'free' 
                  ? 'border-emerald-500 shadow-md' 
                  : 'border-gray-200 hover:border-emerald-500'
              }`}
            >
              {p.id === 'free' && (
                <div className="inline-block bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-medium mb-3">
                  Start Free
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
              <div>
                <span className="text-3xl font-bold text-emerald-600">{p.price}</span>
                {p.id !== 'free' && <span className="text-gray-600 text-sm">/month</span>}
              </div>
              <p className="text-sm text-gray-600 mt-2 mb-6">{p.desc}</p>
              
              <ul className="space-y-2 mb-6 text-sm">
                {p.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              {/* Button Logic: Free plan -> Sign up to dashboard, Paid plans -> Checkout */}
              {p.id === 'free' ? (
                // Free plan button
                isSignedIn ? (
                  <Link 
                    href="/dashboard"
                    className="block w-full px-4 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 text-center transition-colors"
                  >
                    Go to Dashboard
                  </Link>
                ) : (
                  <SignUpButton mode="modal" afterSignUpUrl="/dashboard">
                    <span className="block w-full px-4 py-3 bg-emerald-600 text-white rounded-md font-medium hover:bg-emerald-700 cursor-pointer transition-colors text-center">
                      Start Free
                    </span>
                  </SignUpButton>
                )
              ) : (
                // Paid plan buttons
                isSignedIn ? (
                  <Link 
                    href={`/checkout?plan=${p.id}`}
                    className="block w-full px-4 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-black text-center transition-colors"
                  >
                    Upgrade to {p.name}
                  </Link>
                ) : (
                  <SignUpButton mode="modal" afterSignUpUrl={`/checkout?plan=${p.id}`}>
                    <span className="block w-full px-4 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-black cursor-pointer transition-colors text-center">
                      Get Started
                    </span>
                  </SignUpButton>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
