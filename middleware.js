import { NextResponse } from "next/server";

// Simple middleware to redirect to sign-in for protected routes
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Protected routes
  const protectedRoutes = [
    "/dashboard",
    "/upload",
    "/filters",
    "/output",
    "/api/rewrite",
    "/api/generate",
    "/api/iterate",
  ];

  // Check if the current path is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // For API routes, we'll let them handle authentication internally
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // For dashboard, redirect to sign-in if not authenticated
  if (pathname.startsWith("/dashboard")) {
    // This will be handled by the client-side authentication check
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
