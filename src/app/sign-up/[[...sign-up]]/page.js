import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Create Account
          </h1>
          <p className="text-muted-foreground">
            Sign up to start generating YouTube thumbnails
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 backdrop-blur-sm">
          <p className="text-center text-muted-foreground mb-4">
            Sign-up functionality is currently disabled. Please use the demo credentials to sign in.
          </p>
          <Link href="/sign-in">
            <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-md transition-colors">
              Go to Sign In
            </button>
          </Link>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-primary hover:text-primary/90">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
