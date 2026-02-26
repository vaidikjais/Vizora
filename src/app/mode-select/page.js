"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { LayoutTemplate, SlidersHorizontal, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getDisplayName } from "@/lib/utils";
import Link from "next/link";

export default function ModeSelectPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const handleLogout = () => {
    signOut(() => router.push("/"));
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      {/* Background visual flair (restored theme, lower intensity) */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 relative z-10">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-foreground font-semibold text-lg">Vizora</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground hidden sm:block">
            Welcome, {getDisplayName(user)}
          </span>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="text-foreground border-border hover:bg-card"
          >
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        <div className="text-center mb-12 max-w-2xl">
          <h1 className="text-4xl font-bold mb-4 tracking-tight text-white">
            Choose Your <span className="text-primary">Workflow</span>
          </h1>
          <p className="text-lg text-zinc-400">
            Select how you want to create your thumbnail. Use our optimized
            templates or take full control with a custom prompt.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
          {/* Templates Card */}
          <Link href="/templates" className="group relative block">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-primary/40 rounded-3xl p-8 flex flex-col items-start transition-all duration-300 transform group-hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center mb-6 shadow-md">
                <LayoutTemplate className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Quick Templates
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-1">
                Get stunning results in seconds using our pre-optimized aesthetic
                styles. Perfect if you want beautiful thumbnails without overthinking verbs and adjectives.
              </p>
              <div className="flex items-center text-primary font-medium text-base group-hover:translate-x-1 transition-transform duration-300">
                Use Templates
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>

          {/* Custom Card */}
          <Link href="/custom" className="group relative block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
            <div className="relative h-full bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 hover:border-blue-500/40 rounded-3xl p-8 flex flex-col items-start transition-all duration-300 transform group-hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-6 shadow-md">
                <SlidersHorizontal className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3">
                Custom Prompt
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed mb-8 flex-1">
                Take absolute control. Describe exactly what you want to see, tweak all advanced parameters (style, lighting, focus), and craft a highly specific vision.
              </p>
              <div className="flex items-center text-blue-400 font-medium text-base group-hover:translate-x-1 transition-transform duration-300">
                Craft Custom Prompt
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
