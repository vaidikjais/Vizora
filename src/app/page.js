"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "@/lib/simple-auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function HomePage() {
  const router = useRouter();

  // Remove automatic redirect for authenticated users
  // They should be able to see the landing page

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-foreground font-semibold text-lg">Vizora</span>
        </div>
        <nav className="flex items-center space-x-6">
          <a
            href="#features"
            className="text-foreground hover:text-primary transition-colors"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-foreground hover:text-primary transition-colors"
          >
            About
          </a>
          {isAuthenticated() ? (
            <Link
              href="/upload"
              className="text-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/sign-in"
              className="text-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Content */}
          <div className="space-y-8">
            <div className="inline-block bg-card border border-border rounded-full px-4 py-2">
              <span className="text-sm text-foreground">
                AI-Powered Thumbnail Generation
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Make your videos stand out with{" "}
              <span className="text-primary">Vizora</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-lg">
              Upload your image, choose your style, and generate stunning
              YouTube thumbnails in seconds. AI-powered design with multiple
              variations and optimization scores.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/sign-in">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                className="text-foreground border-border hover:bg-card text-lg px-8 py-3 w-full sm:w-auto"
              >
                View Demo
              </Button>
            </div>
          </div>

          {/* Right Side - Feature Showcase */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-6 backdrop-blur-sm">
              <div className="space-y-6">
                {/* Feature 1 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Upload Image
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      PNG, JPG, and high-quality formats
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      AI Generation
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Multiple variations with optimization scores
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold">
                      Smart Templates
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Pre-designed styles for instant results
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-center text-muted-foreground text-sm">
              Upload, generate, and download — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="max-w-7xl mx-auto px-6 py-20" id="features">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Templates</CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose from pre-designed templates for instant results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select from templates like &ldquo;Make my video POP&rdquo;, &ldquo;Professional &
                Clean&rdquo;, &ldquo;Viral/Clickbait&rdquo;, &ldquo;Foodie Special&rdquo;, and &ldquo;Gamer Mode&rdquo;.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Custom Options</CardTitle>
              <CardDescription className="text-muted-foreground">
                Fine-tune every aspect of your thumbnail
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose content category, visual style, text options, subject
                focus, and color schemes to create the perfect thumbnail.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">AI-Powered</CardTitle>
              <CardDescription className="text-muted-foreground">
                Powered by Google Gemini for stunning results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Advanced AI generates multiple variations with optimization
                scores, ensuring your thumbnails are engaging and click-worthy.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Ready to create amazing thumbnails?
        </h2>
        <p className="text-muted-foreground mb-8">
          {isAuthenticated()
            ? "Start creating your next viral thumbnail"
            : "Sign in with your credentials to start generating"}
        </p>

        <div className="mt-8">
          <Link href={isAuthenticated() ? "/upload" : "/sign-in"}>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
              {isAuthenticated() ? "Create Thumbnail" : "Get Started Now"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
