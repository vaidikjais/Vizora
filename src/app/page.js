"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navigation from "@/components/navigation";
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
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push("/dashboard");
    }
  }, [isLoaded, isSignedIn, router]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-primary-foreground font-bold text-sm">V</span>
          </div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center mx-auto mb-6">
            <span className="text-primary-foreground font-bold text-2xl">
              V
            </span>
          </div>
          <h1 className="text-5xl font-bold text-foreground mb-6">
            AI YouTube Thumbnail Generator
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Create stunning, click-worthy YouTube thumbnails with AI. Upload
            your image, choose your style, and generate professional thumbnails
            in seconds.
          </p>
          <Link href="/sign-in">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-3">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-card border-border backdrop-blur-sm opacity-50">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Templates</CardTitle>
              <CardDescription className="text-muted-foreground">
                Choose from pre-designed templates for instant results
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select from templates like "Make my video POP", "Professional &
                Clean", "Viral/Clickbait", "Foodie Special", and "Gamer Mode".
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border backdrop-blur-sm opacity-50">
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

          <Card className="bg-card border-border backdrop-blur-sm opacity-50">
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

        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to create amazing thumbnails?
          </h2>
          <p className="text-muted-foreground mb-6">
            Sign in with your credentials to start generating
          </p>
          <div className="bg-card border-border backdrop-blur-sm opacity-50 rounded-lg p-6 inline-block">
            <p className="text-sm text-muted-foreground mb-2">
              Demo Credentials:
            </p>
            <p className="font-mono text-primary">Username: chaicode</p>
            <p className="font-mono text-primary">Password: ilovetea</p>
          </div>
        </div>
      </div>
    </div>
  );
}
