"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

/**
 * Navbar component - Organization-focused navigation
 * Features:
 * - "Safe Start" branding at the left
 * - Simplified navigation links (About, Courses, Pricing)
 * - Sign In/Out buttons for organization accounts
 * - Mobile hamburger menu for small screens
 */
export default function Navbar() {
  // State to control mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Toggle mobile menu open/close
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  // Handle smooth scroll for hash links
  const handleHashClick = (e, targetId) => {
    e.preventDefault();
    const element = document.querySelector(targetId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      // Close mobile menu if open
      setMobileMenuOpen(false);
      // Update URL without jumping
      window.history.pushState(null, "", targetId);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left: Brand/Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-gray-900 hover:text-emerald-700 transition-colors"
          >
            Safe Start
          </Link>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#about"
              onClick={(e) => handleHashClick(e, "#about")}
              className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              href="#courses"
              onClick={(e) => handleHashClick(e, "#courses")}
              className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Courses
            </a>
            <a
              href="#pricing"
              onClick={(e) => handleHashClick(e, "#pricing")}
              className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors cursor-pointer"
            >
              Pricing
            </a>

            {/* Desktop Sign In/Out - Right side */}
            <div className="flex items-center gap-3 ml-4 border-l pl-6">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-emerald-600 text-white rounded-md font-medium text-sm h-10 px-5 hover:bg-emerald-700 transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-emerald-700 transition-colors"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>
          </div>

          {/* Mobile Menu Button and Auth - Visible only on mobile */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Auth Buttons */}
            <SignedOut>
              <SignInButton mode="modal">
                <button className="text-sm font-medium text-gray-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>

            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              {/* Hamburger icon - changes to X when menu is open */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown - Shows when mobileMenuOpen is true */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a
                href="#about"
                onClick={(e) => handleHashClick(e, "#about")}
                className="text-base font-medium text-gray-700 hover:text-emerald-700 transition-colors py-2 cursor-pointer"
              >
                About
              </a>
              <a
                href="#courses"
                onClick={(e) => handleHashClick(e, "#courses")}
                className="text-base font-medium text-gray-700 hover:text-emerald-700 transition-colors py-2 cursor-pointer"
              >
                Courses
              </a>
              <a
                href="#pricing"
                onClick={(e) => handleHashClick(e, "#pricing")}
                className="text-base font-medium text-gray-700 hover:text-emerald-700 transition-colors py-2 cursor-pointer"
              >
                Pricing
              </a>
              
              {/* Mobile Dashboard Link (Signed In) */}
              <SignedIn>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-medium text-gray-700 hover:text-emerald-700 transition-colors py-2"
                >
                  Dashboard
                </Link>
              </SignedIn>
              
              {/* Mobile Sign Up Button */}
              <SignedOut>
                <SignUpButton mode="modal">
                  <button className="bg-emerald-600 text-white rounded-md font-medium text-sm h-10 px-5 hover:bg-emerald-700 transition-colors w-full">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

