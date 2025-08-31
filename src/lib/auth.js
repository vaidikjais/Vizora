import { auth } from "@clerk/nextjs/server";

// Get allowed emails from environment variable
const getAllowedEmails = () => {
  const emails = process.env.ALLOWED_EMAILS;
  if (!emails) {
    console.warn(
      "No allowed emails configured. Please set ALLOWED_EMAILS environment variable."
    );
    return [];
  }
  return emails.split(",").map((email) => email.trim().toLowerCase());
};

// Check if user is authenticated and authorized
export async function isAuthorized() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return { authorized: false, reason: "Not authenticated" };
    }

    // Get user details from Clerk
    const { getToken } = await import("@clerk/nextjs/server");
    const token = await getToken();

    if (!token) {
      return { authorized: false, reason: "No token available" };
    }

    // Extract email from token
    const email = token.email?.toLowerCase();

    if (!email) {
      return { authorized: false, reason: "No email found in token" };
    }

    const allowedEmails = getAllowedEmails();

    if (allowedEmails.length === 0) {
      console.warn(
        "No allowed emails configured. Allowing access for development."
      );
      return { authorized: true, email };
    }

    if (!allowedEmails.includes(email)) {
      return {
        authorized: false,
        reason: "Email not in allowed list",
        email,
        allowedEmails,
      };
    }

    return { authorized: true, email };
  } catch (error) {
    console.error("Error checking authorization:", error);
    return { authorized: false, reason: "Authentication error" };
  }
}

// Middleware function for API routes
export async function requireAuth(request) {
  const authResult = await isAuthorized();

  if (!authResult.authorized) {
    return {
      error: true,
      status: 403,
      message: `Access denied: ${authResult.reason}`,
      details: authResult,
    };
  }

  return {
    error: false,
    user: { email: authResult.email },
  };
}

// Get current user info
export async function getCurrentUser() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return null;
    }

    const authResult = await isAuthorized();

    if (!authResult.authorized) {
      return null;
    }

    return {
      id: userId,
      email: authResult.email,
    };
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

// Check if user has admin privileges (for future use)
export async function isAdmin() {
  const user = await getCurrentUser();

  if (!user) {
    return false;
  }

  // For now, all authorized users are considered admins
  // You can extend this logic based on your needs
  return true;
}
