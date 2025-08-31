"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getCurrentUser, logout } from "@/lib/simple-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OutputPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.replace("/sign-in");
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);

        // Check both localStorage and sessionStorage for thumbnails
    let storedThumbnails = localStorage.getItem("generatedThumbnails");
    if (!storedThumbnails) {
      storedThumbnails = sessionStorage.getItem("generatedThumbnails");
      console.log("📦 Found thumbnails in sessionStorage");
    } else {
      console.log("📦 Found thumbnails in localStorage");
    }
    
    console.log("📦 Stored thumbnails:", storedThumbnails);
    
    if (!storedThumbnails) {
      console.log("❌ No stored thumbnails found, redirecting to upload");
      router.replace("/upload");
      return;
    }

    try {
      const parsed = JSON.parse(storedThumbnails);
      console.log("✅ Parsed thumbnails:", parsed);
      console.log("📊 Thumbnails count:", parsed.length);

      if (parsed.length > 0) {
        setThumbnails(parsed);
        setSelectedThumbnail(parsed[0]);
        console.log("🎯 Selected thumbnail:", parsed[0]);
      } else {
        console.log("❌ No thumbnails in parsed data, redirecting to upload");
        router.replace("/upload");
      }
    } catch (error) {
      console.error("❌ Error parsing thumbnails:", error);
      router.replace("/upload");
    }

    setLoading(false);
  }, [router]);

  // Cleanup storage when component unmounts
  useEffect(() => {
    return () => {
      // Don't clear storage on unmount as user might want to refresh
      // Only clear when explicitly navigating away
    };
  }, []);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const handleDownload = (thumbnail) => {
    const link = document.createElement("a");
    link.href = thumbnail.url;
    link.download = `${thumbnail.id || "thumbnail"}.png`; // ✅ ensure PNG extension
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleNewThumbnail = () => {
    // Clear storage before navigating
    localStorage.removeItem("generatedThumbnails");
    sessionStorage.removeItem("generatedThumbnails");
    router.push("/upload");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || thumbnails.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-foreground">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">No Thumbnails Found</h2>
          <Button onClick={handleNewThumbnail} className="bg-primary">
            Create a Thumbnail
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-primary rounded-full"></div>
          <span className="text-foreground font-semibold text-lg">Vizora</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-muted-foreground">
            Welcome, {user.username}
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
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Your Generated Thumbnails
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your favorite and download it
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side - Selected Thumbnail */}
          <div>
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  Selected Thumbnail
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedThumbnail && (
                  <div className="space-y-4">
                    <div className="w-full aspect-video rounded-lg overflow-hidden bg-background border border-border">
                      <img
                        src={selectedThumbnail.url}
                        alt="Selected thumbnail"
                        className="w-full h-full object-cover"
                        style={{
                          filter: selectedThumbnail.cssFilter || "none",
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Variation:
                        </span>
                        <span className="text-foreground font-medium">
                          {selectedThumbnail.metadata?.variation || "Primary"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Score:
                        </span>
                        <span className="text-foreground font-medium">
                          {(selectedThumbnail.optimizationScore * 100).toFixed(
                            0
                          )}
                          %
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">
                          Model:
                        </span>
                        <span className="text-foreground font-medium">
                          {selectedThumbnail.metadata?.model || "AI Generated"}
                        </span>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <Button
                        onClick={() => handleDownload(selectedThumbnail)}
                        className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Download
                      </Button>
                      <Button
                        onClick={handleNewThumbnail}
                        variant="outline"
                        className="flex-1 text-foreground border-border hover:bg-card"
                      >
                        Create New
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Thumbnail Gallery */}
          <div>
            <Card className="bg-card border-border backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-foreground">
                  All Variations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {thumbnails.map((thumbnail) => (
                    <div
                      key={thumbnail.id}
                      className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                        selectedThumbnail?.id === thumbnail.id
                          ? "border-primary scale-105"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedThumbnail(thumbnail)}
                    >
                      <div className="aspect-video bg-background">
                        <img
                          src={thumbnail.url}
                          alt={`Thumbnail ${
                            thumbnail.metadata?.variation || "variation"
                          }`}
                          className="w-full h-full object-cover"
                          style={{ filter: thumbnail.cssFilter || "none" }}
                        />
                      </div>
                      <div className="p-3 bg-card">
                        <div className="text-sm font-medium text-foreground">
                          {thumbnail.metadata?.variation || "Primary"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Score:{" "}
                          {(thumbnail.optimizationScore * 100).toFixed(0)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="mt-12 text-center">
          <div className="flex justify-center space-x-4">
            <Button
              onClick={handleNewThumbnail}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Create Another Thumbnail
            </Button>
            <Button
              onClick={() => {
                // Clear storage before navigating
                localStorage.removeItem("generatedThumbnails");
                sessionStorage.removeItem("generatedThumbnails");
                router.push("/");
              }}
              variant="outline"
              className="text-foreground border-border hover:bg-card"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
