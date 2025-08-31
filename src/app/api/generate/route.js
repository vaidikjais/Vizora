import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Check if API key is available
if (!process.env.GOOGLE_AI_API_KEY) {
  console.error("❌ GOOGLE_AI_API_KEY is not set");
}

// Helper: Prepare image for AI processing (Vercel-compatible)
async function prepareImageForAI(base64Data, aspectRatio) {
  try {
    // For Vercel deployment, we'll use the original image
    // The AI model can handle different aspect ratios
    console.log(`🖼️ Using original image for ${aspectRatio} aspect ratio`);
    
    // Log the aspect ratio for the AI prompt
    const aspectRatioMap = {
      "16:9": "16:9 aspect ratio (1280x720 pixels)",
      "1:1": "1:1 aspect ratio (1080x1080 pixels)",
      "4:3": "4:3 aspect ratio (1440x1080 pixels)",
      "9:16": "9:16 aspect ratio (1080x1920 pixels)",
      "21:9": "21:9 aspect ratio (1920x823 pixels)",
    };
    
    console.log(`📐 Target aspect ratio: ${aspectRatioMap[aspectRatio] || "16:9"}`);
    return base64Data;
  } catch (error) {
    console.error("❌ Error preparing image:", error);
    return base64Data;
  }
}

// Helper: Save base64 image into /public/generated and return URL
function saveBase64Image(base64Data, prefix = "thumb") {
  const data = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(data, "base64");

  // Ensure /public/generated exists
  const dir = path.join(process.cwd(), "public", "generated");
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const fileName = `${prefix}-${Date.now()}-${Math.floor(
    Math.random() * 1000
  )}.png`;
  const filePath = path.join(dir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/generated/${fileName}`; // ✅ return URL instead of base64
}

export async function GET(request) {
  return NextResponse.json({ message: "Generate API is working" });
}

export async function POST(request) {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error("❌ GOOGLE_AI_API_KEY is not set");
      return NextResponse.json(
        {
          error:
            "API key not configured. Please set GOOGLE_AI_API_KEY in environment variables.",
        },
        { status: 500 }
      );
    }

    const {
      image,
      prompt,
      category,
      style,
      textOption,
      focus,
      colorScheme,
      selectedTemplate,
      aspectRatio = "16:9",
    } = await request.json();

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    // Build the final prompt
    const finalPrompt = buildFinalPrompt({
      prompt,
      category,
      style,
      textOption,
      focus,
      colorScheme,
      selectedTemplate,
      aspectRatio,
    });

    console.log("📝 Original prompt:", prompt);
    console.log("🎯 Final optimized prompt:", finalPrompt);

    // Prepare image for AI processing
    console.log("🔄 Preparing image for AI processing...");
    const preparedImage = await prepareImageForAI(image, aspectRatio);

    // Generate thumbnails with prepared image
    const thumbnails = await generateThumbnails(
      finalPrompt,
      preparedImage,
      aspectRatio
    );

    return NextResponse.json({
      success: true,
      thumbnails: thumbnails,
      originalPrompt: prompt,
      optimizedPrompt: finalPrompt,
      metadata: {
        category,
        style,
        textOption,
        focus,
        colorScheme,
        template: selectedTemplate,
        aspectRatio,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate thumbnails" },
      { status: 500 }
    );
  }
}

function buildFinalPrompt(options) {
  const {
    prompt,
    category,
    style,
    textOption,
    focus,
    colorScheme,
    selectedTemplate,
    aspectRatio,
  } = options;

  // Start with user's custom prompt as the primary focus
  let finalPrompt = prompt || "Create a YouTube thumbnail";

  // If a template is selected, use it as a style guide but prioritize user prompt
  if (selectedTemplate) {
    const templateStyles = {
      pop: "with high-energy, vibrant colors, bold text overlays, and dramatic lighting",
      professional:
        "with clean, professional layout and sophisticated typography",
      viral:
        "with shocking, clickbait elements, high contrast, and attention-grabbing effects",
      foodie:
        "with appetizing close-ups, warm lighting, and vibrant food colors",
      gamer:
        "with bold graphics, gaming aesthetics, and dynamic action elements",
    };

    // Combine user prompt with template style
    finalPrompt += ` ${templateStyles[selectedTemplate] || ""}`;
  }

  // Add category context
  if (category) {
    const categoryMap = {
      entertainment: "entertainment content",
      food: "food and cooking",
      gaming: "gaming content",
      tech: "technology and gadgets",
      education: "educational content",
      travel: "travel and adventure",
      music: "music and audio",
      fitness: "fitness and health",
      "product-review": "product review",
      news: "news and current events",
      motivation: "motivational content",
    };
    finalPrompt += ` for ${categoryMap[category] || category}`;
  }

  // Add style instructions
  if (style) {
    const styleMap = {
      "bold-text-face":
        "with bold text overlays and prominent facial expressions",
      minimalist: "with minimalist design and clean layout",
      cinematic: "with cinematic lighting and dramatic composition",
      cartoonish: "with cartoonish, fun style",
      corporate: "with professional, corporate aesthetic",
      clickbait: "with shocking, clickbait elements",
    };
    finalPrompt += `, ${styleMap[style] || ""}`;
  }

  // Add color scheme
  if (colorScheme) {
    const colorMap = {
      "bright-vibrant": "using bright, vibrant colors",
      "dark-contrast": "using dark colors with high contrast",
      pastel: "using soft, pastel colors",
      "brand-colors": "using brand-appropriate colors",
    };
    finalPrompt += `, ${colorMap[colorScheme] || ""}`;
  }

  // Add aspect ratio requirement
  const aspectRatioMap = {
    "16:9": "16:9 aspect ratio (1280x720 pixels)",
    "1:1": "1:1 aspect ratio (1080x1080 pixels)",
    "4:3": "4:3 aspect ratio (1440x1080 pixels)",
    "9:16": "9:16 aspect ratio (1080x1920 pixels)",
    "21:9": "21:9 aspect ratio (1920x823 pixels)",
  };

  finalPrompt += `. Create this as a YouTube thumbnail with ${
    aspectRatioMap[aspectRatio] || "16:9 aspect ratio (1280x720 pixels)"
  }. Make it engaging and click-worthy with high contrast and clear visual hierarchy.`;

  return finalPrompt;
}

async function generateThumbnails(prompt, baseImage, aspectRatio = "16:9") {
  try {
    console.log("🎨 Starting thumbnail generation process...");

    // Try to generate with Gemini first
    const geminiThumbnail = await generateWithGemini(
      prompt,
      baseImage,
      aspectRatio
    );

    if (geminiThumbnail) {
      console.log("✨ Using Gemini-generated image for variations");

      const thumbnails = [];

      // Primary version
      const primaryUrl = saveBase64Image(geminiThumbnail, "gemini_primary");
      thumbnails.push({
        id: `thumb_${Date.now()}_primary`,
        url: primaryUrl,
        prompt: prompt,
        originalPrompt: prompt,
        optimizationScore: 0.95,
        timestamp: new Date().toISOString(),
        metadata: {
          variation: "primary",
          aspectRatio: aspectRatio,
          model: "Gemini 2.5 Flash",
          description: "AI-generated primary version",
        },
      });

      // Generate additional AI variations
      const variationPrompts = [
        {
          name: "dramatic",
          prompt: `${prompt} Make this more dramatic with higher contrast, bold colors, and intense lighting. Add dramatic shadows and make it more eye-catching.`,
        },
        {
          name: "vibrant",
          prompt: `${prompt} Make this more vibrant and colorful. Increase saturation, add bright neon colors, and make it pop with energetic lighting.`,
        },
        {
          name: "professional",
          prompt: `${prompt} Make this more professional and clean. Use sophisticated colors, clean composition, and elegant typography style.`,
        },
      ];

      // Generate each variation with AI
      for (let i = 0; i < variationPrompts.length; i++) {
        const variation = variationPrompts[i];
        console.log(`🎨 Generating ${variation.name} variation...`);

        try {
          const variationResult = await generateWithGemini(
            variation.prompt,
            baseImage,
            aspectRatio
          );

          if (variationResult) {
            const variationUrl = saveBase64Image(
              variationResult,
              `gemini_${variation.name}`
            );
            thumbnails.push({
              id: `thumb_${Date.now()}_${variation.name}`,
              url: variationUrl,
              prompt: variation.prompt,
              originalPrompt: prompt,
              optimizationScore: 0.9 - i * 0.02,
              timestamp: new Date().toISOString(),
              metadata: {
                variation: variation.name,
                aspectRatio: aspectRatio,
                model: "Gemini 2.5 Flash",
                description: `AI-generated ${variation.name} variation`,
              },
            });
          } else {
            // Fallback to CSS filter if AI generation fails
            console.log(
              `⚠️ AI generation failed for ${variation.name}, using CSS filter`
            );
            const cssFilter = getCssFilterForVariation(variation.name);
            thumbnails.push({
              id: `thumb_${Date.now()}_${variation.name}`,
              url: primaryUrl,
              prompt: variation.prompt,
              originalPrompt: prompt,
              optimizationScore: 0.85 - i * 0.02,
              timestamp: new Date().toISOString(),
              metadata: {
                variation: variation.name,
                aspectRatio: aspectRatio,
                model: "Gemini 2.5 Flash + CSS Filter",
                description: `${variation.name} variation (CSS enhanced)`,
              },
              cssFilter: cssFilter,
            });
          }
        } catch (error) {
          console.log(
            `❌ Error generating ${variation.name} variation:`,
            error.message
          );
          // Fallback to CSS filter
          const cssFilter = getCssFilterForVariation(variation.name);
          thumbnails.push({
            id: `thumb_${Date.now()}_${variation.name}`,
            url: primaryUrl,
            prompt: variation.prompt,
            originalPrompt: prompt,
            optimizationScore: 0.85 - i * 0.02,
            timestamp: new Date().toISOString(),
            metadata: {
              variation: variation.name,
              aspectRatio: aspectRatio,
              model: "Gemini 2.5 Flash + CSS Filter",
              description: `${variation.name} variation (CSS enhanced)`,
            },
            cssFilter: cssFilter,
          });
        }
      }

      console.log(`🎯 Generated ${thumbnails.length} thumbnails with Gemini`);
      return thumbnails;
    } else {
      console.log("🔄 Falling back to mock data (CSS filters)");
      return createEnhancedMockThumbnails(baseImage, prompt, aspectRatio);
    }
  } catch (error) {
    console.log(
      "💥 Error in thumbnail generation, using mock data:",
      error.message
    );
    return createEnhancedMockThumbnails(baseImage, prompt, aspectRatio);
  }
}

async function generateWithGemini(prompt, baseImage, aspectRatio = "16:9") {
  try {
    // Check if API key is available
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.log("❌ No Google AI API key found");
      return null;
    }

    console.log("🚀 Attempting Gemini image generation...");
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-image-preview",
    });

    // Prepare the base image
    const imageData = baseImage.replace(/^data:image\/[a-z]+;base64,/, "");
    console.log(
      "📸 Image prepared, size:",
      Math.round(imageData.length / 1024),
      "KB"
    );

    // Simple retry mechanism with exponential backoff
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          // Wait before retry (exponential backoff)
          const delay = Math.pow(2, attempt) * 1000; // 2s, 4s
          console.log(`🔄 Retry attempt ${attempt + 1}/${maxRetries + 1}...`);
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.log("🎯 Initial Gemini API call...");
        }

        const result = await model.generateContent([
          {
            text: `Based on this reference image, create a YouTube thumbnail: ${prompt}. Modify and enhance this image to make it more engaging and suitable for YouTube. Keep the main subject but improve the composition, colors, and overall appeal.`,
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageData,
            },
          },
        ]);

        const response = await result.response;
        console.log("📡 Gemini response received");

        // Check if response has candidates
        if (!response.candidates || response.candidates.length === 0) {
          console.log("❌ No candidates in Gemini response");
          return null;
        }

        const candidate = response.candidates[0];
        if (
          !candidate.content ||
          !candidate.content.parts ||
          candidate.content.parts.length === 0
        ) {
          console.log("❌ No content parts in candidate");
          return null;
        }

        // Look for image data in all parts
        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            console.log("✅ Gemini image generation successful!");
            return `data:image/jpeg;base64,${part.inlineData.data}`;
          }
        }

        console.log("❌ No image data found in any part of the response");
        console.log(
          "🔍 Response parts:",
          JSON.stringify(candidate.content.parts, null, 2)
        );
        return null;
      } catch (error) {
        lastError = error;
        console.log(
          `❌ Gemini API error (attempt ${attempt + 1}):`,
          error.message
        );

        // If this is the last attempt, don't retry
        if (attempt === maxRetries) {
          break;
        }

        // Check if it's a rate limit error - don't retry these
        const errorMessage = error.message?.toLowerCase() || "";
        if (
          errorMessage.includes("429") ||
          errorMessage.includes("quota") ||
          errorMessage.includes("rate limit") ||
          errorMessage.includes("too many requests") ||
          errorMessage.includes("exceeded") ||
          errorMessage.includes("billing") ||
          errorMessage.includes("plan")
        ) {
          console.log("🚫 Rate limit/quota error - not retrying");
          break;
        }

        // Continue to next retry attempt
        continue;
      }
    }

    // All attempts failed - return null for mock data fallback
    console.log("💥 All Gemini attempts failed, falling back to mock data");
    return null;
  } catch (error) {
    console.log("💥 Unexpected error in Gemini generation:", error.message);
    return null;
  }
}

function getCssFilterForVariation(variationName) {
  const filters = {
    dramatic: "brightness(0.9) contrast(1.4) saturate(1.3) hue-rotate(5deg)",
    vibrant: "brightness(1.2) contrast(1.2) saturate(1.6) hue-rotate(-5deg)",
    professional:
      "brightness(1.1) contrast(1.1) saturate(0.9) hue-rotate(0deg)",
  };
  return filters[variationName] || "none";
}

function createEnhancedMockThumbnails(baseImage, prompt, aspectRatio = "16:9") {
  const fileUrl = saveBase64Image(baseImage, "mock");

  const mockVariations = [
    {
      id: "mock_primary",
      filter: "brightness(1.1) contrast(1.2) saturate(1.3)",
      variation: "primary",
      score: 0.92,
      description: "Enhanced primary version",
    },
    {
      id: "mock_dramatic",
      filter: "brightness(0.8) contrast(1.8) saturate(1.6) hue-rotate(10deg)",
      variation: "dramatic",
      score: 0.88,
      description: "Dramatic high-contrast version",
    },
    {
      id: "mock_vibrant",
      filter: "brightness(1.3) contrast(1.2) saturate(1.8) hue-rotate(-5deg)",
      variation: "vibrant",
      score: 0.85,
      description: "Bright and vibrant version",
    },
  ];

  return mockVariations.map((variation) => ({
    id: variation.id,
    url: fileUrl, // ✅ URL now
    prompt: prompt,
    originalPrompt: prompt,
    optimizationScore: variation.score,
    timestamp: new Date().toISOString(),
    metadata: {
      variation: variation.variation,
      filter: variation.filter,
      description: variation.description,
      aspectRatio: aspectRatio,
      model: "Mock Generator",
    },
    cssFilter: variation.filter,
  }));
}

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    models: ["Gemini 2.5 Flash Image Preview"],
    features: [
      "Simple Prompt Input",
      "Template Presets",
      "Custom Options",
      "Multi-variation Generation",
      "Quality Scoring",
      "YouTube 16:9 Aspect Ratio",
    ],
    version: "2.5.0",
  });
}
