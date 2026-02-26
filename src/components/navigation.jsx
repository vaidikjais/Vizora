"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { useAuth, useClerk, useUser } from "@clerk/nextjs";

function getDisplayName(user) {
  if (!user) return "User";
  return (
    user.username ??
    user.firstName ??
    user.emailAddresses?.[0]?.emailAddress ??
    "User"
  );
}

export default function Navigation() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="/"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer hover:scale-105"
            >
              WHAT WE DO
            </a>
            <a
              href="/dashboard"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer hover:scale-105"
            >
              CASES
            </a>
            <a
              href="/about"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer hover:scale-105"
            >
              ABOUT
            </a>
            <a
              href="/contact"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer hover:scale-105"
            >
              CONTACT
            </a>
          </div>

          {/* Center Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                V
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Vizora</h1>
              <p className="text-xs text-muted-foreground">
                AI YouTube Thumbnails
              </p>
            </div>
          </div>

          {/* Right Auth Section */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isSignedIn ? (
                <div className="flex items-center space-x-3">
                  <div className="text-right hidden lg:block">
                    <p className="text-sm text-foreground">
                      {getDisplayName(user)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Authorized User
                    </p>
                  </div>
                  <Button
                    onClick={() => signOut(() => (window.location.href = "/"))}
                    variant="outline"
                    size="sm"
                    className="text-foreground border-border hover:bg-card"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/sign-in">
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    SIGN IN
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg
                className="w-6 h-6 text-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-sm">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a
                href="/"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                WHAT WE DO
              </a>
              <a
                href="/dashboard"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CASES
              </a>
              <a
                href="/about"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT
              </a>
              <a
                href="/contact"
                className="block px-3 py-2 text-foreground hover:text-primary transition-colors font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </a>
              {!isSignedIn && (
                <div className="pt-4">
                  <Link href="/sign-in">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      SIGN IN
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
