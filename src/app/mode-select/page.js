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
          <Link href="/templates" className="group block h-full">
            <div className="h-full bg-black border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-primary/5">
              {/* Gradient Header */}
              <div className="relative h-32 flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-purple-600/30 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <LayoutTemplate className="w-10 h-10 relative z-10 text-zinc-500 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <div className="p-8 pt-6 flex flex-col items-start h-[calc(100%-8rem)]">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                  Quick Templates
                </h2>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-1">
                  Get stunning results in seconds using our pre-optimized aesthetic
                  styles. Perfect if you want beautiful thumbnails without overthinking verbs and adjectives.
                </p>
                <div className="flex items-center text-primary font-medium text-base group-hover:translate-x-1 transition-transform duration-300">
                  Use Templates
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>

          {/* Custom Card */}
          <Link href="/custom" className="group block h-full">
            <div className="h-full bg-black border border-zinc-800 rounded-3xl overflow-hidden hover:border-zinc-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-blue-500/5">
              {/* Gradient Header */}
              <div className="relative h-32 flex items-center justify-center bg-black">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 opacity-30 group-hover:opacity-60 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                <SlidersHorizontal className="w-10 h-10 relative z-10 text-zinc-500 group-hover:text-white transition-colors duration-300" />
              </div>
              
              <div className="p-8 pt-6 flex flex-col items-start h-[calc(100%-8rem)]">
                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                  Custom Prompt
                </h2>
                <p className="text-zinc-500 text-base leading-relaxed mb-8 flex-1">
                  Take absolute control. Describe exactly what you want to see, tweak all advanced parameters (style, lighting, focus), and craft a highly specific vision.
                </p>
                <div className="flex items-center text-blue-400 font-medium text-base group-hover:translate-x-1 transition-transform duration-300">
                  Craft Custom Prompt
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
