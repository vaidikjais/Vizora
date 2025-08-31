import { SignIn } from "@clerk/nextjs";
import { clerkConfig } from "@/lib/clerk-config";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Sign in to access your YouTube thumbnail generator
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              formButtonPrimary:
                "bg-primary hover:bg-primary/90 text-primary-foreground",
              card: "bg-card border-border backdrop-blur-sm opacity-50",
              headerTitle: "text-foreground",
              headerSubtitle: "text-muted-foreground",
              formFieldLabel: "text-foreground",
              formFieldInput: "bg-background border-border text-foreground",
              footerActionLink: "text-primary hover:text-primary/90",
              // Hide social buttons
              socialButtonsBlockButton: "hidden",
              socialButtonsBlockButtonText: "hidden",
              socialButtonsBlockButtonArrow: "hidden",
              socialButtonsBlockButtonIcon: "hidden",
            },
            variables: {
              colorPrimary: "oklch(0.75 0.25 25)",
              colorBackground: "oklch(0.08 0.02 30)",
              colorText: "oklch(0.985 0 0)",
              colorTextSecondary: "oklch(0.708 0 0)",
            },
          }}
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          redirectUrl="/dashboard"
          afterSignInUrl="/dashboard"
          identifier="username"
          {...clerkConfig.signIn}
        />
      </div>
    </div>
  );
}
