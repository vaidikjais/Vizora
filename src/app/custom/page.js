"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getDisplayName } from "@/lib/utils";
import { RectangleHorizontal, Square, RectangleVertical, ImagePlus } from "lucide-react";

// Canonical dimensions for each aspect ratio
const ASPECT_RATIO_DIMENSIONS = {
  "16:9": { width: 1280, height: 720 },
  "1:1": { width: 1080, height: 1080 },
  "4:3": { width: 1440, height: 1080 },
  "9:16": { width: 1080, height: 1920 },
  "21:9": { width: 1920, height: 823 },
};

const normalizeImageToAspectRatio = (base64DataUrl, aspectRatio) => {
  return new Promise((resolve, reject) => {
    const { width: targetW, height: targetH } =
      ASPECT_RATIO_DIMENSIONS[aspectRatio] || ASPECT_RATIO_DIMENSIONS["16:9"];

    const img = new Image();
    img.onload = () => {
      const srcW = img.naturalWidth;
      const srcH = img.naturalHeight;
      const targetRatio = targetW / targetH;
      const srcRatio = srcW / srcH;

      let cropX = 0, cropY = 0, cropW = srcW, cropH = srcH;
      if (srcRatio > targetRatio) {
        cropW = Math.round(srcH * targetRatio);
        cropX = Math.round((srcW - cropW) / 2);
      } else if (srcRatio < targetRatio) {
        cropH = Math.round(srcW / targetRatio);
        cropY = Math.round((srcH - cropH) / 2);
      }

      const canvas = document.createElement("canvas");
      canvas.width = targetW;
      canvas.height = targetH;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, cropX, cropY, cropW, cropH, 0, 0, targetW, targetH);

      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    img.onerror = reject;
    img.src = base64DataUrl;
  });
};

const compressThumbnails = async (thumbnails) => {
  const compressedThumbnails = [];
  for (const thumbnail of thumbnails) {
    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();
      const maxWidth = 800;
      const maxHeight = 600;

      await new Promise((resolve, reject) => {
        img.onload = () => {
          let { width, height } = img;
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          compressedThumbnails.push({
            ...thumbnail,
            url: canvas.toDataURL("image/jpeg", 0.7),
          });
          resolve();
        };
        img.onerror = reject;
        img.src = thumbnail.url;
      });
    } catch (error) {
      console.warn("Failed to compress thumbnail, using original:", error);
      compressedThumbnails.push(thumbnail);
    }
  }
  return compressedThumbnails;
};

const ASPECT_RATIOS = [
  { id: "16:9", label: "YouTube 16:9", icon: RectangleHorizontal },
  { id: "1:1", label: "Square 1:1", icon: Square },
  { id: "9:16", label: "Portrait 9:16", icon: RectangleVertical },
];

export default function CustomPromptPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  const [prompt, setPrompt] = useState("");
  const [customOptions, setCustomOptions] = useState({
    aspectRatio: "16:9",
  });

  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;
    const image = localStorage.getItem("uploadedImage");
    if (!image) {
      router.replace("/upload");
      return;
    }
    setLoading(false);
  }, [isLoaded, router]);

  const handleLogout = () => signOut(() => router.push("/"));

  const handleCustomOptionChange = (option, value) => {
    setCustomOptions((prev) => ({ ...prev, [option]: value }));
  };

  const handleGenerate = async () => {
    const uploadedImage = localStorage.getItem("uploadedImage");
    if (!uploadedImage) return;

    if (!prompt.trim()) {
      alert("Please enter a custom prompt describes what you want.");
      return;
    }

    setGenerating(true);
    setGenerationStep("Preparing your image...");

    try {
      const targetRatio = customOptions.aspectRatio;
      setGenerationStep(`Cropping image to ${targetRatio}...`);
      const normalizedImage = await normalizeImageToAspectRatio(uploadedImage, targetRatio);

      setGenerationStep("Generating your Custom Thumbnails...");

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: normalizedImage,
          prompt,
          ...customOptions,
        }),
      });

      if (generateResponse.ok) {
        setGenerationStep("Processing results...");
        const result = await generateResponse.json();

        if (result?.thumbnails?.length) {
          const compressedThumbnails = await compressThumbnails(result.thumbnails);
          try {
            localStorage.setItem("generatedThumbnails", JSON.stringify(compressedThumbnails));
          } catch (error) {
            try {
              sessionStorage.setItem("generatedThumbnails", JSON.stringify(compressedThumbnails));
            } catch (sessionError) {
              alert("Error: Generated images are too large. Please try with a smaller image.");
              setGenerating(false);
              return;
            }
          }
          setGenerating(false);
          window.location.href = "/output";
        } else {
          setGenerating(false);
          alert("No thumbnails returned from API");
        }
      } else {
        const errorData = await generateResponse.json();
        alert(`Error: ${errorData.error || "Failed to generate thumbnails"}`);
        setGenerating(false);
      }
    } catch (error) {
      console.error("Error generating thumbnails:", error);
      setGenerating(false);
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {generating && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 max-w-sm mx-4 text-center shadow-2xl shadow-blue-500/20">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"></div>
              <ImagePlus className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500 w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crafting Custom Vision</h3>
            <p className="text-zinc-400 mb-6 font-medium">{generationStep}</p>
            <div className="flex space-x-2 justify-center">
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-xl z-30">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/mode-select")}>
          <div className="w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"></div>
          <span className="text-foreground font-semibold text-lg tracking-wide">Vizora</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-zinc-400 hidden sm:block text-sm font-medium">
            {getDisplayName(user)}
          </span>
          <Button onClick={handleLogout} variant="ghost" className="text-zinc-400 hover:text-white hover:bg-white/10 rounded-full">
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Your Custom Prompt</h1>
          <p className="text-xl text-zinc-400">Describe exactly what you want to see. The more detailed, the better.</p>
        </div>

        <div className="space-y-8">
          {/* Main Prompt Area */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl p-8 focus-within:border-blue-500/50 focus-within:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all duration-300">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A dramatic gaming thumbnail. The background is a fiery explosion. The text MUST say 'EPIC FAIL' in massive 3D metallic yellow letters. The lighting is dark and moody..."
              className="w-full bg-transparent text-white text-xl placeholder:text-zinc-600 border-none outline-none focus:ring-0 min-h-[200px] resize-y"
            />
          </div>

          <div className="max-w-2xl mx-auto w-full">
            {/* Aspect Ratio Box */}
            <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center">
              <h3 className="text-sm font-medium text-zinc-400 mb-4">Aspect Ratio</h3>
              <div className="flex flex-wrap justify-center gap-3 w-full">
                {ASPECT_RATIOS.map((ratio) => {
                  const isSelected = customOptions.aspectRatio === ratio.id;
                  const Icon = ratio.icon;
                  return (
                    <button
                      key={ratio.id}
                      onClick={() => handleCustomOptionChange("aspectRatio", ratio.id)}
                      className={`flex-1 min-w-[140px] flex items-center justify-center h-12 px-4 rounded-xl border transition-all shadow-sm ${isSelected ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/30'}`}
                    >
                      <Icon className={`w-4 h-4 mr-3 ${isSelected ? 'text-blue-400' : 'opacity-70'}`} />
                      <span className="text-sm font-medium">{ratio.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-8 text-center max-w-2xl mx-auto w-full">
            <Button
              onClick={handleGenerate}
              disabled={generating || !prompt.trim()}
              className="w-full h-14 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] hover:shadow-[0_0_50px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center outline-none"
            >
              Generate Custom Vision
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
