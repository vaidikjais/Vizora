import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// YouTube thumbnail analysis and optimization tools
class ThumbnailOptimizer {
  static getColorPsychology(emotion) {
    const colorMap = {
      excitement: "bright reds, electric blues, vibrant oranges",
      trust: "calming blues, professional navy, clean whites",
      urgency: "bold reds, warning yellows, contrasting blacks",
      curiosity: "mysterious purples, intriguing teals, gradient combinations",
      success: "confident greens, golden yellows, premium blacks",
      shock: "electric neons, high contrast combinations, dramatic shadows"
    };
    return colorMap[emotion] || "high-contrast, vibrant colors";
  }

  static getTrendingElements() {
    return [
      "glowing arrows pointing to key elements",
      "shocked face expressions with wide eyes",
      "before/after comparison splits",
      "money symbols and cash stacks",
      "countdown timers and urgency indicators",
      "VS battles and comparison layouts",
      "red circles highlighting important details",
      "dramatic lighting and shadows",
      "bold, chunky text overlays",
      "celebrity reactions and emotions"
    ];
  }

  static getIndustrySpecificElements(industry) {
    const industryElements = {
      gaming: "epic battles, character showcases, level progressions, achievement unlocks",
      tech: "futuristic interfaces, gadget closeups, before/after comparisons, innovation reveals",
      fitness: "transformation photos, workout intensity, muscle definition, progress tracking",
      cooking: "mouth-watering close-ups, ingredient reveals, cooking processes, final dish glamour shots",
      education: "knowledge visualization, step-by-step processes, problem-solving reveals, lightbulb moments",
      entertainment: "dramatic reactions, celebrity moments, behind-scenes reveals, emotional expressions",
      finance: "wealth symbols, growth charts, money stacks, success indicators",
      lifestyle: "aspirational imagery, lifestyle upgrades, personal transformations, aesthetic beauty"
    };
    return industryElements[industry?.toLowerCase()] || "engaging visual elements";
  }

  static getAudienceOptimization(targetAudience) {
    const audienceMap = {
      "kids": "bright colors, cartoon-like elements, playful fonts, animated characters",
      "teens": "trendy aesthetics, social media style, bold graphics, meme references",
      "young adults": "modern design, lifestyle elements, aspirational content, sleek visuals",
      "professionals": "clean design, sophisticated color schemes, business elements, premium feel",
      "seniors": "clear, readable fonts, classic layouts, trustworthy design elements"
    };
    return audienceMap[targetAudience?.toLowerCase()] || "universally appealing design";
  }
}

// Corrective RAG implementation
class CorrectiveRAG {
  static analyzePromptQuality(prompt) {
    const qualityMetrics = {
      specificity: this.checkSpecificity(prompt),
      visualElements: this.checkVisualElements(prompt),
      emotionalTriggers: this.checkEmotionalTriggers(prompt),
      clickworthiness: this.checkClickworthiness(prompt),
      technicalOptimization: this.checkTechnicalOptimization(prompt)
    };
    
    return qualityMetrics;
  }

  static checkSpecificity(prompt) {
    const specificWords = ["detailed", "close-up", "dramatic", "vibrant", "bold", "contrasting"];
    const score = specificWords.filter(word => 
      prompt.toLowerCase().includes(word.toLowerCase())
    ).length;
    return { score: Math.min(score / 3, 1), missing: specificWords.slice(score) };
  }

  static checkVisualElements(prompt) {
    const visualElements = ["lighting", "composition", "color", "contrast", "text overlay"];
    const score = visualElements.filter(element => 
      prompt.toLowerCase().includes(element.toLowerCase())
    ).length;
    return { score: Math.min(score / 3, 1), missing: visualElements.slice(score) };
  }

  static checkEmotionalTriggers(prompt) {
    const triggers = ["shocking", "amazing", "secret", "revealed", "exclusive", "urgent"];
    const score = triggers.filter(trigger => 
      prompt.toLowerCase().includes(trigger.toLowerCase())
    ).length;
    return { score: Math.min(score / 2, 1), missing: triggers.slice(score) };
  }

  static checkClickworthiness(prompt) {
    const clickElements = ["arrow", "circle", "highlight", "reaction", "before/after"];
    const score = clickElements.filter(element => 
      prompt.toLowerCase().includes(element.toLowerCase())
    ).length;
    return { score: Math.min(score / 2, 1), missing: clickElements.slice(score) };
  }

  static checkTechnicalOptimization(prompt) {
    const techElements = ["high resolution", "1280x720", "readable text", "mobile-friendly"];
    const score = techElements.filter(element => 
      prompt.toLowerCase().includes(element.toLowerCase())
    ).length;
    return { score: Math.min(score / 2, 1), missing: techElements.slice(score) };
  }

  static generateCorrections(qualityMetrics, industry, targetAudience) {
    const corrections = [];
    
    if (qualityMetrics.specificity.score < 0.7) {
      corrections.push("Add more specific visual descriptors and detailed elements");
    }
    if (qualityMetrics.visualElements.score < 0.7) {
      corrections.push("Include lighting, composition, and color specifications");
    }
    if (qualityMetrics.emotionalTriggers.score < 0.5) {
      corrections.push("Add emotional triggers and curiosity-inducing elements");
    }
    if (qualityMetrics.clickworthiness.score < 0.5) {
      corrections.push("Include click-worthy visual elements like arrows, circles, or reactions");
    }
    if (qualityMetrics.technicalOptimization.score < 0.5) {
      corrections.push("Specify technical requirements for optimal thumbnail generation");
    }

    return corrections;
  }
}

// Advanced prompt enhancement tools
class PromptEnhancer {
  static addPsychologicalTriggers(prompt, audience) {
    const triggers = {
      curiosity: ["What happens next will shock you", "The secret behind", "Hidden truth about"],
      urgency: ["Before it's too late", "Limited time", "Don't miss out"],
      social_proof: ["Everyone is talking about", "Viral sensation", "Trending now"],
      exclusivity: ["Exclusive reveal", "Behind the scenes", "Never seen before"]
    };
    
    // Select appropriate trigger based on audience
    const triggerType = audience?.includes("teen") ? "curiosity" : "urgency";
    return prompt + ` with ${triggers[triggerType][0]} elements`;
  }

  static optimizeForAlgorithm(prompt, industry) {
    const algorithmKeywords = {
      gaming: "epic gameplay, boss fight, rare items, speedrun, pro tips",
      tech: "latest update, breakthrough, comparison, review, unboxing",
      fitness: "transformation, workout, results, challenge, motivation",
      cooking: "recipe, delicious, easy, quick, homemade",
      education: "tutorial, learn, master, guide, explained",
      entertainment: "reaction, funny, compilation, highlights, exclusive"
    };
    
    const keywords = algorithmKeywords[industry?.toLowerCase()] || "trending, viral, amazing";
    return `${prompt}, incorporating ${keywords} visual elements`;
  }

  static addCompositionRules(prompt) {
    const rules = [
      "rule of thirds composition",
      "subject positioned off-center for dynamic feel",
      "high contrast between foreground and background",
      "clear visual hierarchy with main subject prominent",
      "negative space used effectively"
    ];
    
    return `${prompt}, following ${rules[Math.floor(Math.random() * rules.length)]}`;
  }
}

// Main enhancement function
async function enhancePromptWithCorrectiveRAG(originalPrompt, industry, targetAudience, stylePreferences) {
  // Step 1: Analyze current prompt quality
  const qualityMetrics = CorrectiveRAG.analyzePromptQuality(originalPrompt);
  
  // Step 2: Generate corrections based on analysis
  const corrections = CorrectiveRAG.generateCorrections(qualityMetrics, industry, targetAudience);
  
  // Step 3: Apply industry and audience-specific optimizations
  const colorPsychology = ThumbnailOptimizer.getColorPsychology("excitement");
  const trendingElements = ThumbnailOptimizer.getTrendingElements();
  const industryElements = ThumbnailOptimizer.getIndustrySpecificElements(industry);
  const audienceOptimization = ThumbnailOptimizer.getAudienceOptimization(targetAudience);
  
  // Step 4: Create enhanced system prompt with corrective feedback
  const enhancedSystemPrompt = `You are an elite YouTube thumbnail optimization AI with access to real-time performance analytics.

CONTEXT ANALYSIS:
- Industry: ${industry || "General"}
- Target Audience: ${targetAudience || "General viewers"}
- Style Preferences: ${stylePreferences || "Modern and engaging"}

QUALITY ASSESSMENT OF ORIGINAL PROMPT:
- Specificity Score: ${(qualityMetrics.specificity.score * 100).toFixed(0)}%
- Visual Elements Score: ${(qualityMetrics.visualElements.score * 100).toFixed(0)}%
- Emotional Triggers Score: ${(qualityMetrics.emotionalTriggers.score * 100).toFixed(0)}%
- Click-worthiness Score: ${(qualityMetrics.clickworthiness.score * 100).toFixed(0)}%

REQUIRED CORRECTIONS:
${corrections.map(correction => `- ${correction}`).join('\n')}

OPTIMIZATION FRAMEWORK:
1. Color Psychology: ${colorPsychology}
2. Industry Elements: ${industryElements}
3. Audience Optimization: ${audienceOptimization}
4. Trending Elements: ${trendingElements.slice(0, 3).join(', ')}

TECHNICAL SPECIFICATIONS FOR GEMINI NANO:
- Resolution: 1280x720 pixels (16:9 aspect ratio)
- High contrast ratios for mobile viewing
- Bold, readable typography (minimum 48pt equivalent)
- Clear subject-background separation
- Optimized for 4-6 second attention spans

GEMINI NANO PROMPT STRUCTURE:
Create a prompt that follows this structure:
"[Main Subject] + [Action/Emotion] + [Background/Setting] + [Text Overlay] + [Visual Effects] + [Technical Specs]"

Your rewritten prompt must:
1. Fix all identified quality gaps
2. Include specific visual composition instructions
3. Add psychological trigger elements
4. Optimize for the target industry and audience
5. Be clear and actionable for image generation
6. Include specific color, lighting, and composition details`;

  return enhancedSystemPrompt;
}

// Multi-step validation and refinement
async function validateAndRefinePrompt(prompt, industry, targetAudience) {
  const validation = {
    hasEmotionalHook: /shocking|amazing|secret|exclusive|revealed/i.test(prompt),
    hasVisualElements: /color|lighting|composition|contrast/i.test(prompt),
    hasClickTriggers: /arrow|circle|highlight|reaction/i.test(prompt),
    hasIndustryContext: industry ? new RegExp(industry, 'i').test(prompt) : true,
    hasTechnicalSpecs: /resolution|contrast|readable/i.test(prompt)
  };

  const score = Object.values(validation).filter(Boolean).length / Object.keys(validation).length;
  
  return {
    isOptimal: score >= 0.8,
    score: score,
    improvements: Object.entries(validation)
      .filter(([key, value]) => !value)
      .map(([key]) => key)
  };
}

export async function POST(request) {
  try {
    const { prompt, industry, targetAudience, stylePreferences, iterations = 1 } =
      await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Step 1: Generate enhanced system prompt using Corrective RAG
    const enhancedSystemPrompt = await enhancePromptWithCorrectiveRAG(
      prompt, industry, targetAudience, stylePreferences
    );

    let currentPrompt = prompt;
    let rewrittenPrompt = "";
    let finalScore = 0;

    // Step 2: Iterative refinement (Corrective RAG loop)
    for (let i = 0; i < Math.min(iterations, 3); i++) {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: enhancedSystemPrompt,
          },
          {
            role: "user",
            content: `Original prompt: "${currentPrompt}"\n\nRewrite this prompt to create an engaging YouTube thumbnail optimized for Gemini Nano image generation. Focus on visual clarity, emotional impact, and click-through optimization.`,
          },
        ],
        max_tokens: 400,
        temperature: 0.8,
      });

      rewrittenPrompt = completion.choices[0].message.content.trim();
      
      // Step 3: Validate the rewritten prompt
      const validation = await validateAndRefinePrompt(rewrittenPrompt, industry, targetAudience);
      finalScore = validation.score;
      
      // If optimal or final iteration, break
      if (validation.isOptimal || i === iterations - 1) {
        break;
      }
      
      // Use the rewritten prompt as input for next iteration
      currentPrompt = rewrittenPrompt;
    }

    // Step 4: Apply final optimizations
    const finalOptimizedPrompt = PromptEnhancer.addPsychologicalTriggers(
      PromptEnhancer.optimizeForAlgorithm(
        PromptEnhancer.addCompositionRules(rewrittenPrompt),
        industry
      ),
      targetAudience
    );

    // Step 5: Generate alternative variations for A/B testing
    const variations = await generatePromptVariations(finalOptimizedPrompt, industry);

    // Step 6: Quality assurance check
    const finalValidation = await validateAndRefinePrompt(finalOptimizedPrompt, industry, targetAudience);

    // Step 7: Generate metadata for tracking and optimization
    const metadata = {
      optimizationScore: finalValidation.score,
      appliedCorrections: CorrectiveRAG.generateCorrections(
        CorrectiveRAG.analyzePromptQuality(prompt), 
        industry, 
        targetAudience
      ),
      industryElements: ThumbnailOptimizer.getIndustrySpecificElements(industry),
      audienceOptimization: ThumbnailOptimizer.getAudienceOptimization(targetAudience),
      trendingElements: ThumbnailOptimizer.getTrendingElements().slice(0, 3),
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      originalPrompt: prompt,
      rewrittenPrompt: finalOptimizedPrompt,
      optimizationScore: finalValidation.score,
      variations: variations,
      metadata: metadata,
      qualityInsights: {
        improvements: finalValidation.improvements,
        isOptimal: finalValidation.isOptimal,
        suggestedNextSteps: finalValidation.isOptimal ? 
          ["Ready for image generation"] : 
          ["Consider additional refinement", "Test with different emotional triggers"]
      }
    });

  } catch (error) {
    console.error("Error in enhanced prompt rewriting:", error);
    return NextResponse.json(
      { 
        error: "Failed to rewrite prompt",
        details: error.message,
        fallbackPrompt: `Enhanced YouTube thumbnail: ${prompt} with high contrast, bold text, engaging composition, optimized for ${industry || 'general'} audience`
      },
      { status: 500 }
    );
  }
}

// Generate multiple prompt variations for A/B testing
async function generatePromptVariations(basePrompt, industry) {
  const variationStyles = [
    "dramatic and intense with high contrast lighting",
    "clean and modern with bold typography focus", 
    "energetic and colorful with dynamic composition",
    "mysterious and intriguing with selective lighting"
  ];

  const variations = variationStyles.map((style, index) => ({
    id: `variation_${index + 1}`,
    style: style,
    prompt: `${basePrompt}, rendered in ${style} style`,
    optimizedFor: index % 2 === 0 ? "mobile viewing" : "desktop viewing"
  }));

  return variations;
}

// Additional utility functions for enhanced functionality
export async function GET(request) {
  // Health check endpoint with optimization metrics
  return NextResponse.json({
    status: "healthy",
    availableTools: [
      "Color Psychology Optimization",
      "Industry-Specific Enhancement", 
      "Audience Targeting",
      "Corrective RAG Analysis",
      "Multi-iteration Refinement",
      "A/B Testing Variations",
      "Quality Score Validation"
    ],
    supportedIndustries: ["gaming", "tech", "fitness", "cooking", "education", "entertainment", "finance", "lifestyle"],
    geminiNanoOptimized: true,
    version: "2.0.0"
  });
}