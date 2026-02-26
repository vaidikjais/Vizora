"use client";

import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center p-4">
      <SignUp
        path="/sign-up"
        routing="path"
        fallbackRedirectUrl="/upload"
        signInUrl="/sign-in"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card border border-border shadow-none",
          },
        }}
      />
      <div className="absolute bottom-6 left-0 right-0 text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:text-primary/90">
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}
