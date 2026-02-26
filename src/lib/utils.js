import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the best display name for a Clerk user object.
 * Falls back through: username → firstName → email → "User"
 */
export function getDisplayName(user) {
  if (!user) return "User";
  return (
    user.username ??
    user.firstName ??
    user.emailAddresses?.[0]?.emailAddress ??
    "User"
  );
}
