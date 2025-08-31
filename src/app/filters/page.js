"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated, getCurrentUser, logout } from "@/lib/simple-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function FiltersPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customOptions, setCustomOptions] = useState({
    category: "",
    style: "",
    textOption: "",
    focus: "",
    colorScheme: "",
    aspectRatio: "16:9",
  });
  const [prompt, setPrompt] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      console.log("🔍 Checking authentication...");

      if (!isAuthenticated()) {
        console.log("❌ Not authenticated, redirecting to sign-in");
        router.replace("/sign-in");
        return;
      }

      console.log("✅ Authentication successful");
      const currentUser = getCurrentUser();
      setUser(currentUser);

      const image = localStorage.getItem("uploadedImage");
      if (!image) {
        console.log("❌ No uploaded image found, redirecting to upload");
        router.replace("/upload");
        return;
      }

      console.log("✅ Uploaded image found, setting loading to false");
      setLoading(false);
    };

    checkAuth();

    // Add timeout to prevent infinite loading
    const timeout = setTimeout(() => {
      if (loading) {
        console.log("⚠️ Loading timeout reached, forcing redirect to upload");
        router.replace("/upload");
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router, loading]);

  const handleLogout = () => {
    logout();
    router.replace("/");
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setCustomOptions({
      category: "",
      style: "",
      textOption: "",
      focus: "",
      colorScheme: "",
    });
  };

  const handleCustomOptionChange = (option, value) => {
    setCustomOptions((prev) => ({
      ...prev,
      [option]: value,
    }));
    setSelectedTemplate("");
  };

  const handleGenerate = async () => {
    const uploadedImage = localStorage.getItem("uploadedImage");
    if (!uploadedImage) return;

    setGenerating(true);
    setGenerationStep("Preparing your image...");

    try {
      setGenerationStep("Rewriting your prompt for better results...");

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: uploadedImage, // ✅ send base64 once to API
          prompt,
          ...customOptions,
          selectedTemplate,
        }),
      });

      if (generateResponse.ok) {
        setGenerationStep("Generating your thumbnails...");
        const result = await generateResponse.json();

        console.log("🎯 API Response:", result);
        console.log("📊 Thumbnails count:", result?.thumbnails?.length);

        if (result?.thumbnails?.length) {
          // Try to store in localStorage first, fallback to sessionStorage
          try {
            localStorage.setItem(
              "generatedThumbnails",
              JSON.stringify(result.thumbnails)
            );
            console.log("💾 Thumbnails saved to localStorage");
          } catch (error) {
            console.warn("⚠️ localStorage quota exceeded, using sessionStorage");
            try {
              sessionStorage.setItem(
                "generatedThumbnails",
                JSON.stringify(result.thumbnails)
              );
              console.log("💾 Thumbnails saved to sessionStorage");
            } catch (sessionError) {
              console.error("❌ Both localStorage and sessionStorage failed:", sessionError);
              alert("Error: Generated images are too large. Please try with a smaller image.");
              setGenerating(false);
              setGenerationStep("");
              return;
            }
          }
          
          setGenerating(false);
          setGenerationStep(""); // Clear the generation step
          console.log("🚀 Navigating to /output");

          // Try multiple navigation approaches
          try {
            router.push("/output");
            console.log("✅ Router.push() called successfully");

            // Add a timeout to ensure navigation happens
            setTimeout(() => {
              if (window.location.pathname !== "/output") {
                console.log("⚠️ Navigation timeout, using fallback");
                window.location.href = "/output";
              }
            }, 2000);
          } catch (error) {
            console.error("❌ Router.push() failed:", error);
            // Fallback to window.location
            window.location.href = "/output";
          }
        } else {
          console.error("No thumbnails returned from API");
          console.error("Result:", result);
          setGenerating(false);
        }
      } else {
        const errorData = await generateResponse.json();
        console.error("Failed to generate thumbnails:", errorData);
        alert(`Error: ${errorData.error || "Failed to generate thumbnails"}`);
        setGenerating(false);
      }
    } catch (error) {
      console.error("Error generating thumbnails:", error);
      setGenerating(false);
    }
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

  if (!user) {
    return null;
  }

  const templates = [
    {
      id: "pop",
      name: "Make my video POP",
      description: "High energy, vibrant colors, bold text",
    },
    {
      id: "professional",
      name: "Professional & Clean",
      description: "Minimalist design, corporate feel",
    },
    {
      id: "viral",
      name: "Viral/Clickbait",
      description: "Shocking elements, high contrast",
    },
    {
      id: "foodie",
      name: "Foodie Special",
      description: "Mouth-watering, appetizing design",
    },
    {
      id: "gamer",
      name: "Gamer Mode",
      description: "Epic gaming aesthetic, bold graphics",
    },
  ];

  const categories = [
    { value: "entertainment", label: "Entertainment" },
    { value: "food", label: "Food" },
    { value: "gaming", label: "Gaming" },
    { value: "tech", label: "Tech" },
    { value: "education", label: "Education" },
    { value: "travel", label: "Travel" },
    { value: "music", label: "Music" },
    { value: "fitness", label: "Fitness" },
    { value: "product-review", label: "Product Review" },
    { value: "news", label: "News" },
    { value: "motivation", label: "Motivation" },
  ];

  const styles = [
    { value: "bold-text-face", label: "Bold Text + Face" },
    { value: "minimalist", label: "Minimalist" },
    { value: "cinematic", label: "Cinematic" },
    { value: "cartoonish", label: "Cartoonish" },
    { value: "corporate", label: "Corporate" },
    { value: "clickbait", label: "Clickbait" },
  ];

  const textOptions = [
    { value: "auto-generate", label: "Auto-generate catchy text" },
    { value: "no-text", label: "No text" },
    { value: "highlighted-keywords", label: "Highlighted keywords" },
    { value: "emoji-style", label: "Emoji-style" },
  ];

  const focusOptions = [
    { value: "face-focused", label: "Face-focused" },
    { value: "object-focused", label: "Object-focused" },
    { value: "split-screen", label: "Split Screen" },
    { value: "collage", label: "Collage" },
  ];

  const colorSchemes = [
    { value: "bright-vibrant", label: "Bright + Vibrant" },
    { value: "dark-contrast", label: "Dark + Contrast" },
    { value: "pastel", label: "Pastel" },
    { value: "brand-colors", label: "Brand Colors" },
  ];

  const aspectRatios = [
    { value: "16:9", label: "16:9 (YouTube Standard)" },
    { value: "1:1", label: "1:1 (Square)" },
    { value: "4:3", label: "4:3 (Classic)" },
    { value: "9:16", label: "9:16 (Portrait)" },
    { value: "21:9", label: "21:9 (Ultrawide)" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-black">
      {/* Generation Loading Overlay */}
      {generating && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Creating Your Thumbnails
            </h3>
            <p className="text-muted-foreground mb-4">{generationStep}</p>
            <div className="flex space-x-2 justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.1s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
            </div>
          </div>
        </div>
      )}

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
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Customize Your Thumbnail
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your style and add custom instructions
          </p>
        </div>

        <div className="space-y-8">
          {/* Quick Templates */}
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Quick Templates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template.id)}
                  className={`w-full text-left p-3 rounded-lg border transition-colors ${
                    selectedTemplate === template.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="font-medium text-foreground">
                    {template.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {template.description}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Custom Options */}
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground">Custom Options</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Content Category
                </label>
                <select
                  value={customOptions.category}
                  onChange={(e) =>
                    handleCustomOptionChange("category", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Style
                </label>
                <select
                  value={customOptions.style}
                  onChange={(e) =>
                    handleCustomOptionChange("style", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Select style</option>
                  {styles.map((style) => (
                    <option key={style.value} value={style.value}>
                      {style.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Text Option
                </label>
                <select
                  value={customOptions.textOption}
                  onChange={(e) =>
                    handleCustomOptionChange("textOption", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Select text option</option>
                  {textOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Focus
                </label>
                <select
                  value={customOptions.focus}
                  onChange={(e) =>
                    handleCustomOptionChange("focus", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Select focus</option>
                  {focusOptions.map((focus) => (
                    <option key={focus.value} value={focus.value}>
                      {focus.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Color Scheme
                </label>
                <select
                  value={customOptions.colorScheme}
                  onChange={(e) =>
                    handleCustomOptionChange("colorScheme", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  <option value="">Select color scheme</option>
                  {colorSchemes.map((scheme) => (
                    <option key={scheme.value} value={scheme.value}>
                      {scheme.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Aspect Ratio
                </label>
                <select
                  value={customOptions.aspectRatio}
                  onChange={(e) =>
                    handleCustomOptionChange("aspectRatio", e.target.value)
                  }
                  className="w-full bg-background border border-border rounded-md px-3 py-2 text-foreground"
                >
                  {aspectRatios.map((ratio) => (
                    <option key={ratio.value} value={ratio.value}>
                      {ratio.label}
                    </option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Custom Prompt - Featured Section */}
          <Card className="bg-card border-border backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-foreground text-2xl">
                ✨ Custom Instructions
              </CardTitle>
              <p className="text-muted-foreground">
                Add specific details to make your thumbnail perfect
              </p>
            </CardHeader>
            <CardContent>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your ideal thumbnail... For example: Make it dramatic with red and black colors, add bold text saying EPIC FAIL, include shocked facial expressions, and make it look like a viral gaming moment"
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-foreground min-h-[150px] resize-none text-lg leading-relaxed"
              />
              <div className="mt-3 text-sm text-muted-foreground">
                💡 Tip: Be specific about colors, text, emotions, and style to
                get better results
              </div>
            </CardContent>
          </Card>

          {/* Generate Button */}
          <div className="text-center">
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-xl py-4 px-8 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generating ? "🔄 Generating..." : "🚀 Generate Thumbnails"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
