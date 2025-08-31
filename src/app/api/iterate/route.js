import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs-extra";
import path from "path";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export async function POST(request) {
  try {
    const {
      originalPrompt,
      iterationType,
      modifications,
      originalThumbnailId,
    } = await request.json();

    if (!originalPrompt || !iterationType) {
      return NextResponse.json(
        { error: "Original prompt and iteration type are required" },
        { status: 400 }
      );
    }

    // Create iteration-specific prompts based on the type
    let enhancedPrompt = originalPrompt;

    switch (iterationType) {
      case "more_vibrant":
        enhancedPrompt = `${originalPrompt} Make the colors more vibrant and eye-catching. Increase saturation and contrast for better visual impact.`;
        break;
      case "add_text":
        enhancedPrompt = `${originalPrompt} Add bold, readable text overlay that stands out. Use high contrast colors for maximum readability.`;
        break;
      case "change_background":
        enhancedPrompt = `${originalPrompt} Change the background to something more dramatic and engaging. Use gradients or dynamic backgrounds.`;
        break;
      case "different_style":
        enhancedPrompt = `${originalPrompt} Apply a different artistic style - make it more modern, minimalist, or dramatic based on the content.`;
        break;
      case "custom":
        enhancedPrompt = `${originalPrompt} ${modifications || ""}`;
        break;
      default:
        enhancedPrompt = `${originalPrompt} Apply the requested modifications: ${
          modifications || ""
        }`;
    }

    // Initialize Gemini model
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Generate the iteration
    const result = await model.generateContent(enhancedPrompt);
    const response = await result.response;

    // Generate unique filename for the iteration
    const timestamp = Date.now();
    const filename = `iteration_${originalThumbnailId}_${timestamp}.png`;
    const filepath = path.join(process.cwd(), "temp", "generated", filename);

    const iterationData = {
      id: timestamp,
      originalThumbnailId: originalThumbnailId,
      filename: filename,
      prompt: enhancedPrompt,
      iterationType: iterationType,
      modifications: modifications,
      generatedAt: new Date().toISOString(),
      status: "generated",
    };

    return NextResponse.json({
      success: true,
      iteration: iterationData,
      message: "Iteration generated successfully",
    });
  } catch (error) {
    console.error("Error in iteration generation:", error);
    return NextResponse.json(
      { error: "Failed to generate iteration" },
      { status: 500 }
    );
  }
}
