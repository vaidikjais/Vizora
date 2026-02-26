"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center p-4">
      <SignIn
        path="/sign-in"
        routing="path"
        fallbackRedirectUrl="/upload"
        signUpUrl="/sign-up"
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "bg-card border border-border shadow-none",
          },
        }}
      />
    </div>
  );
}
