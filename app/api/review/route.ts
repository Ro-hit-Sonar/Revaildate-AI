import { generateText } from "ai";
import { groq } from "@ai-sdk/groq";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { goal, prompt, aiOutput, language, concerns, feedbackTypes } = body;

    // Validate required fields
    if (!goal || !prompt || !aiOutput || !language) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create feedback type string
    const feedbackTypesStr =
      feedbackTypes.length > 0
        ? feedbackTypes.join(", ")
        : "general code review";

    // Construct the system prompt for the senior developer persona
    const systemPrompt = `You are a senior software developer with 20+ years of experience across multiple technologies and industries. You provide thorough, constructive, and actionable code reviews. Your feedback is:

- Detailed and specific
- Constructive rather than just critical
- Includes concrete suggestions for improvement
- Considers real-world implications
- Balances technical excellence with practical constraints
- Explains the "why" behind recommendations

Focus on the requested feedback areas and provide insights that would help a developer grow and improve their code quality.`;

    // Construct the user prompt
    const userPrompt = `Please review this AI-generated code as a senior developer:

**Project Goal:** ${goal}

**Original AI Prompt:** ${prompt}

**Language/Framework:** ${language}

**AI-Generated Code:**
\`\`\`${language.toLowerCase()}
${aiOutput}
\`\`\`

${concerns ? `**Specific Concerns:** ${concerns}` : ""}

**Requested Feedback Areas:** ${feedbackTypesStr}

Please provide a comprehensive review covering the requested areas. Structure your feedback with clear sections and actionable recommendations.`;

    // Generate feedback using Groq (using Llama model)
    const { text } = await generateText({
      model: groq("llama-3.3-70b-versatile"),
      system: systemPrompt,
      prompt: userPrompt,
      maxTokens: 2000,
      temperature: 0.7,
    });

    return NextResponse.json({ feedback: text });
  } catch (error) {
    console.error("Error generating review:", error);
    return NextResponse.json(
      { error: "Failed to generate review" },
      { status: 500 }
    );
  }
}
