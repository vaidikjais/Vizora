import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Vizora - AI YouTube Thumbnail Generator",
  description: "AI-powered YouTube thumbnail generator with Gemini and OpenAI",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
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
        },
        variables: {
          colorPrimary: "oklch(0.75 0.25 25)",
          colorBackground: "oklch(0.08 0.02 30)",
          colorText: "oklch(0.985 0 0)",
          colorTextSecondary: "oklch(0.708 0 0)",
        },
      }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/dashboard"
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
