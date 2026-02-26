import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Cache prompts in memory so we don't hit the disk on every API call
const promptsCache = {};
function getPrompt(relativePath) {
  if (promptsCache[relativePath]) return promptsCache[relativePath];
  try {
    const fullPath = path.join(process.cwd(), "src", "lib", "prompts", relativePath);
    const content = fs.readFileSync(fullPath, "utf-8").trim();
    promptsCache[relativePath] = content;
    return content;
  } catch (err) {
    console.warn(`Prompt file not found: ${relativePath}`);
    return "";
  }
}

// Aspect ratio mappings
const ASPECT_RATIO_MAP = {
  "16:9": "16:9 aspect ratio (1280x720 pixels)",
  "1:1": "1:1 aspect ratio (1080x1080 pixels)",
  "4:3": "4:3 aspect ratio (1440x1080 pixels)",
  "9:16": "9:16 aspect ratio (1080x1920 pixels)",
  "21:9": "21:9 aspect ratio (1920x823 pixels)",
};

export async function GET(request) {
  return NextResponse.json({ message: "Generate API is working" });
}

export async function POST(request) {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) {
      console.error("GOOGLE_AI_API_KEY is not set");
      return NextResponse.json(
        { error: "API key not configured." },
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

    const thumbnails = await generateThumbnails(finalPrompt, image, aspectRatio);

    return NextResponse.json({
      success: true,
      thumbnails,
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
  const { prompt, category, style, textOption, focus, colorScheme, selectedTemplate, aspectRatio } = options;
  let finalPrompt = getPrompt("base.txt") + " ";

  if (prompt) finalPrompt += `Core Subject Modification: ${prompt}. `;
  if (selectedTemplate) finalPrompt += getPrompt(`templates/${selectedTemplate}.txt`) + " ";
  if (category) finalPrompt += getPrompt(`categories/${category}.txt`) + " ";
  if (style) finalPrompt += getPrompt(`styles/${style}.txt`) + " ";
  if (textOption) finalPrompt += getPrompt(`text_options/${textOption}.txt`) + " ";
  if (focus) finalPrompt += getPrompt(`focus/${focus}.txt`) + " ";
  if (colorScheme) finalPrompt += getPrompt(`colors/${colorScheme}.txt`) + " ";

  finalPrompt += getPrompt("negative.txt") + " ";
  finalPrompt += `Fill the entire canvas at exactly ${ASPECT_RATIO_MAP[aspectRatio] || "a 16:9 ratio"}.`;

  return finalPrompt;
}

function formatDataUrl(base64Data) {
  if (!base64Data.startsWith("data:image/")) {
    return `data:image/png;base64,${base64Data}`;
  }
  return base64Data;
}

async function generateThumbnails(prompt, baseImage, aspectRatio = "16:9") {
  try {
    const geminiThumbnail = await generateWithGemini(prompt, baseImage, aspectRatio);

    if (geminiThumbnail) {
      const thumbnails = [];
      const primaryUrl = formatDataUrl(geminiThumbnail);
      
      thumbnails.push({
        id: `thumb_${Date.now()}_primary`,
        url: primaryUrl,
        prompt,
        originalPrompt: prompt,
        optimizationScore: 0.95,
        timestamp: new Date().toISOString(),
        metadata: {
          variation: "primary",
          aspectRatio,
          model: "Gemini 2.5 Flash",
        },
      });

      const variationPrompts = [
        { name: "dramatic", prompt: `${prompt}. ${getPrompt("variations/dramatic.txt")}` },
        { name: "vibrant", prompt: `${prompt}. ${getPrompt("variations/vibrant.txt")}` },
        { name: "professional", prompt: `${prompt}. ${getPrompt("variations/professional.txt")}` },
      ];

      for (let i = 0; i < variationPrompts.length; i++) {
        const variation = variationPrompts[i];
        try {
          const variationResult = await generateWithGemini(variation.prompt, baseImage, aspectRatio);
          if (variationResult) {
            thumbnails.push({
              id: `thumb_${Date.now()}_${variation.name}`,
              url: formatDataUrl(variationResult),
              prompt: variation.prompt,
              originalPrompt: prompt,
              optimizationScore: 0.9 - i * 0.02,
              timestamp: new Date().toISOString(),
              metadata: {
                variation: variation.name,
                aspectRatio,
                model: "Gemini 2.5 Flash",
              },
            });
          } else {
            thumbnails.push(createCssFallback(variation, primaryUrl, prompt, aspectRatio, i));
          }
        } catch (error) {
          console.error(`Error generating ${variation.name} variation:`, error.message);
          thumbnails.push(createCssFallback(variation, primaryUrl, prompt, aspectRatio, i));
        }
      }
      return thumbnails;
    } else {
      return createEnhancedMockThumbnails(baseImage, prompt, aspectRatio);
    }
  } catch (error) {
    console.error("Error in thumbnail generation:", error.message);
    return createEnhancedMockThumbnails(baseImage, prompt, aspectRatio);
  }
}

function createCssFallback(variation, primaryUrl, prompt, aspectRatio, index) {
  return {
    id: `thumb_${Date.now()}_${variation.name}`,
    url: primaryUrl,
    prompt: variation.prompt,
    originalPrompt: prompt,
    optimizationScore: 0.85 - index * 0.02,
    timestamp: new Date().toISOString(),
    metadata: {
      variation: variation.name,
      aspectRatio,
      model: "Gemini 2.5 Flash + CSS Filter",
    },
    cssFilter: getCssFilterForVariation(variation.name),
  };
}

async function generateWithGemini(prompt, baseImage, aspectRatio = "16:9") {
  try {
    if (!process.env.GOOGLE_AI_API_KEY) return null;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-image" });
    const imageData = baseImage.replace(/^data:image\/[a-z]+;base64,/, "");

    const maxRetries = 2;
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        if (attempt > 0) {
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise((resolve) => setTimeout(resolve, delay));
        }

        const result = await model.generateContent([
          {
            text: `Based on this reference image, create a YouTube thumbnail: ${prompt}. The input image is already cropped to the correct aspect ratio — preserve that exact composition without adding borders or padding. Enhance the image to be more engaging and suitable for YouTube. Keep the main subject but improve the composition, colors, and overall appeal.`,
          },
          {
            inlineData: {
              mimeType: "image/jpeg",
              data: imageData,
            },
          },
        ]);

        const response = await result.response;
        if (!response.candidates || response.candidates.length === 0) return null;

        const candidate = response.candidates[0];
        if (!candidate.content || !candidate.content.parts) return null;

        for (const part of candidate.content.parts) {
          if (part.inlineData && part.inlineData.data) {
            return `data:image/jpeg;base64,${part.inlineData.data}`;
          }
        }
        return null;
      } catch (error) {
        if (attempt === maxRetries) break;
        const msg = error.message?.toLowerCase() || "";
        if (msg.includes("429") || msg.includes("quota") || msg.includes("rate limit")) {
          break; // Don't retry quota errors
        }
      }
    }
    return null;
  } catch (error) {
    console.error("Unexpected error in Gemini generation:", error.message);
    return null;
  }
}

function getCssFilterForVariation(variationName) {
  const filters = {
    dramatic: "brightness(0.9) contrast(1.4) saturate(1.3) hue-rotate(5deg)",
    vibrant: "brightness(1.2) contrast(1.2) saturate(1.6) hue-rotate(-5deg)",
    professional: "brightness(1.1) contrast(1.1) saturate(0.9) hue-rotate(0deg)",
  };
  return filters[variationName] || "none";
}

function createEnhancedMockThumbnails(baseImage, prompt, aspectRatio = "16:9") {
  const fileUrl = formatDataUrl(baseImage);
  const mockVariations = [
    { id: "mock_primary", filter: "brightness(1.1) contrast(1.2) saturate(1.3)", variation: "primary", score: 0.92 },
    { id: "mock_dramatic", filter: "brightness(0.8) contrast(1.8) saturate(1.6) hue-rotate(10deg)", variation: "dramatic", score: 0.88 },
    { id: "mock_vibrant", filter: "brightness(1.3) contrast(1.2) saturate(1.8) hue-rotate(-5deg)", variation: "vibrant", score: 0.85 },
  ];

  return mockVariations.map((v) => ({
    id: v.id,
    url: fileUrl,
    prompt,
    originalPrompt: prompt,
    optimizationScore: v.score,
    timestamp: new Date().toISOString(),
    metadata: {
      variation: v.variation,
      aspectRatio,
      model: "Mock Generator",
    },
    cssFilter: v.filter,
  }));
}
