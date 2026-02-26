"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useClerk, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { getDisplayName } from "@/lib/utils";
import { RectangleHorizontal, Square, RectangleVertical, Check, Wand2, Flame, Briefcase, TrendingUp, Pizza, Gamepad2 } from "lucide-react";

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

const TEMPLATES = [
  {
    id: "pop",
    name: "Make my video POP",
    description: "High energy, vibrant colors, bold text",
    color: "from-pink-500 to-rose-500",
    icon: Flame,
  },
  {
    id: "professional",
    name: "Professional & Clean",
    description: "Minimalist corporate aesthetic",
    color: "from-blue-500 to-cyan-500",
    icon: Briefcase,
  },
  {
    id: "viral",
    name: "Viral/Clickbait",
    description: "High contrast, shocking elements",
    color: "from-red-600 to-orange-500",
    icon: TrendingUp,
  },
  {
    id: "foodie",
    name: "Foodie Special",
    description: "Mouth-watering, appetizing vibes",
    color: "from-amber-400 to-orange-500",
    icon: Pizza,
  },
  {
    id: "gamer",
    name: "Gamer Mode",
    description: "Epic gaming aesthetic, bold graphics",
    color: "from-purple-600 to-indigo-600",
    icon: Gamepad2,
  },
];

const ASPECT_RATIOS = [
  { id: "16:9", label: "YouTube 16:9", icon: RectangleHorizontal },
  { id: "1:1", label: "Square 1:1", icon: Square },
  { id: "9:16", label: "Portrait 9:16", icon: RectangleVertical },
];

export default function TemplatesPage() {
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");

  // Form State
  const [selectedTemplate, setSelectedTemplate] = useState("pop");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [prompt, setPrompt] = useState("");
  const [isStylized, setIsStylized] = useState(true);

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

  const handleGenerate = async () => {
    const uploadedImage = localStorage.getItem("uploadedImage");
    if (!uploadedImage) return;

    setGenerating(true);
    setGenerationStep("Preparing your image...");

    try {
      setGenerationStep(`Cropping image to ${aspectRatio}...`);
      const normalizedImage = await normalizeImageToAspectRatio(uploadedImage, aspectRatio);

      setGenerationStep("Generating your thumbnails...");
      
      // Append stylized vibe if requested
      const finalPrompt = prompt + (isStylized && prompt ? " Make it stylized and illustrative." : isStylized ? "Make it stylized and illustrative." : "");

      const generateResponse = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: normalizedImage,
          prompt: finalPrompt,
          selectedTemplate,
          aspectRatio,
        }),
      });

      if (generateResponse.ok) {
        setGenerationStep("Compressing results...");
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
          alert("No thumbnails generated.");
        }
      } else {
        const errorData = await generateResponse.json();
        alert(`Error: ${errorData.error || "Failed to generate thumbnails"}`);
        setGenerating(false);
      }
    } catch (error) {
      console.error("Error generating thumbnails:", error);
      setGenerating(false);
      alert("An unexpected error occurred.");
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Loading Overlay */}
      {generating && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 max-w-sm mx-4 text-center shadow-2xl shadow-primary/20">
            <div className="relative w-20 h-20 mx-auto mb-6">
              <div className="absolute inset-0 border-4 border-zinc-800 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin"></div>
              <Wand2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Crafting Magic</h3>
            <p className="text-zinc-400 mb-6 font-medium">{generationStep}</p>
            <div className="flex space-x-2 justify-center">
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce"></div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
              <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/5 sticky top-0 bg-black/50 backdrop-blur-xl z-30">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => router.push("/mode-select")}>
          <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_10px_rgba(var(--primary),0.8)]"></div>
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

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Choose a Template</h1>
          <p className="text-xl text-zinc-400">Select a base style, frame your shot, and add a personal touch.</p>
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          
          {/* Left Column: Flow */}
          <div className="space-y-12">
            
            {/* Step 1: Templates */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mr-3 border border-primary/30">1</div>
                <h2 className="text-2xl font-semibold">Select Aesthetic</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {TEMPLATES.map((tmpl) => {
                  const isSelected = selectedTemplate === tmpl.id;
                  return (
                    <div
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 transform border group ${isSelected ? 'scale-[1.02] border-primary shadow-lg shadow-primary/10 bg-zinc-900/80' : 'hover:scale-[1.01] hover:border-zinc-700 bg-black border-zinc-800'}`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 z-10 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-lg">
                          <Check className="text-white w-4 h-4" />
                        </div>
                      )}
                      
                      {/* Gradient Accent Overlay & Icon */}
                      <div className="relative h-20 flex items-center justify-center overflow-hidden bg-black">
                        {/* Subtle background glow based on template colors */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${tmpl.color} opacity-20 group-hover:opacity-40 transition-opacity duration-300`}></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                        <tmpl.icon className={`w-8 h-8 relative z-10 ${isSelected ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors duration-300'}`} />
                      </div>

                      <div className="p-5 pt-2 relative z-10">
                        <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-white' : 'text-zinc-200'}`}>{tmpl.name}</h3>
                        <p className="text-zinc-500 text-sm leading-relaxed">{tmpl.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Step 2: Personalize (Optional) */}
            <section>
              <div className="flex items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold mr-3 border border-primary/30">2</div>
                <h2 className="text-2xl font-semibold">Personalize <span className="text-zinc-600 font-normal text-lg ml-2">(Optional)</span></h2>
              </div>
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 focus-within:border-primary/50 focus-within:shadow-[0_0_15px_rgba(var(--primary),0.1)] transition-all duration-300">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g. Add red arrows pointing left, make the text say 'OMG!'"
                  className="w-full bg-transparent border-none focus:ring-0 outline-none px-4 py-2 text-white min-h-[100px] resize-none placeholder:text-zinc-600 text-lg"
                />
                
                <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-6">
                  <div>
                    <h4 className="font-medium mb-1">Stylized Vibe</h4>
                    <p className="text-zinc-500 text-sm">Apply an illustrative, polished look to the image</p>
                  </div>
                  <button 
                    onClick={() => setIsStylized(!isStylized)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isStylized ? 'bg-primary' : 'bg-zinc-700'}`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${isStylized ? 'translate-x-6' : 'translate-x-1'}`}/>
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Settings & CTA */}
          <div>
            <div className="sticky top-24 space-y-8">
              
              {/* Aspect Ratio Box */}
              <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 flex flex-col">
                <h3 className="text-sm font-medium text-zinc-400 mb-4">Aspect Ratio</h3>
                <div className="space-y-3">
                  {ASPECT_RATIOS.map((ratio) => {
                    const isSelected = aspectRatio === ratio.id;
                    const Icon = ratio.icon;
                    return (
                      <button
                        key={ratio.id}
                        onClick={() => setAspectRatio(ratio.id)}
                        className={`w-full flex items-center h-12 px-4 rounded-xl border transition-all shadow-sm ${isSelected ? 'bg-primary/10 border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary),0.1)]' : 'bg-black border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-white hover:bg-zinc-800/30'}`}
                      >
                        <Icon className={`w-4 h-4 mr-3 ${isSelected ? 'text-primary' : 'opacity-70'}`} />
                        <span className="text-sm font-medium">{ratio.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate CTA */}
              <Button
                onClick={handleGenerate}
                disabled={generating}
                className="w-full h-14 text-base font-bold bg-primary hover:bg-primary/90 text-white rounded-2xl shadow-[0_0_30px_rgba(var(--primary),0.3)] hover:shadow-[0_0_50px_rgba(var(--primary),0.5)] transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none outline-none"
              >
                Generate Magic
              </Button>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
