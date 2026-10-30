import { NextResponse } from "next/server";
import { unifiedPrompt, model } from "@/lib/gemini";

// Rate limiting (in-memory, simple approach for MVP)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string, maxRequests: number = 10): boolean {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);

  if (!userLimit || now > userLimit.resetAt) {
    rateLimitMap.set(identifier, { count: 1, resetAt: now + 60000 });
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Sanitize input
function sanitizeInput(text: string): string {
  return text
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/[<>]/g, "")
    .slice(0, 2000);
}
// Detect symptoms that need urgent medical assessment.
function getUrgentSymptomResponse(symptoms: string, nickname: string) {
  const text = symptoms.toLowerCase();

  const severePain =
    /\b(severe|unbearable|excruciating|extreme|very bad)\b/.test(text) &&
    /\b(pain|cramp|cramps|ache|abdominal|stomach|belly)\b/.test(text);

  const faintness =
    /\b(faint|fainting|passed out|about to pass out|feel faint|dizzy|lightheaded)\b/.test(
      text,
    );

  const emergencyKeywords =
    /\b(chest pain|difficulty breathing|can't breathe|cannot breathe|heavy bleeding|bleeding heavily)\b/.test(
      text,
    );

  if ((severePain && faintness) || emergencyKeywords) {
    return {
      conversation: `${nickname}, severe pain with faintness can be a medical emergency. Please seek emergency medical care now. Call India's emergency number 112 if you need urgent assistance. Do not drive yourself; ask someone to stay with you and help you get care. Please do not delay getting medical help to continue this chat.`,
      show_doctor_choice: false,
      recommended_action: "Urgent medical assessment",
    };
  }

  return null;
}
// Production-ready fallback responses with comprehensive symptom coverage
function getDevelopmentResponse(symptoms: string, nickname: string = "friend") {
  const symptomsLower = symptoms.toLowerCase();

  // Period-related symptoms (most common)
  if (
    symptomsLower.includes("period") ||
    symptomsLower.includes("cramp") ||
    symptomsLower.includes("menstrual")
  ) {
    return {
      conversation: `I hear you, ${nickname}. Period cramps can be so tough to deal with. Please know that you're not alone in feeling this way.\n\nThis kind of pain often happens because our body is working hard during our cycle. Using a warm heating pad on your belly or drinking some ginger tea might help you feel a bit more comfortable right now.\n\nYou deserve to rest today. If the pain feels like too much to handle or is different than usual, we can look for a kind doctor to help you.`,
      show_doctor_choice: true,
    };
  }

  // General pain
  if (
    symptomsLower.includes("pain") ||
    symptomsLower.includes("hurt") ||
    symptomsLower.includes("ache")
  ) {
    return {
      conversation: `${nickname}, I'm so sorry you're experiencing pain. Your comfort matters, and what you're feeling is real and valid.\n\nPain is our body's way of telling us something needs attention. While some discomfort during certain times is normal, you shouldn't have to suffer through it alone.\n\nPlease try to rest, stay hydrated, and use a heating pad if it helps. If the pain is severe or unusual for you, it's absolutely okay to seek medical support.`,
      show_doctor_choice: true,
    };
  }

  // Headache
  if (symptomsLower.includes("headache") || symptomsLower.includes("head")) {
    return {
      conversation: `${nickname}, I'm so sorry your head is hurting. Dealing with a headache can be so draining.\n\nIt could be due to stress, not getting enough sleep, or maybe you haven't had enough water today. Our bodies usually send these signals when we need to slow down.\n\nPlease try to rest in a quiet, dark room for a bit and sip some water. If it feels very sharp or doesn't go away with rest, it might be good to talk to someone.`,
      show_doctor_choice: true,
    };
  }

  // Nausea/stomach
  if (
    symptomsLower.includes("nausea") ||
    symptomsLower.includes("stomach") ||
    symptomsLower.includes("vomit")
  ) {
    return {
      conversation: `Oh ${nickname}, feeling nauseous is really uncomfortable. I'm here with you.\n\nThis could be related to your cycle, something you ate, or even stress. Try sipping on some ginger tea or peppermint tea slowly, and rest in a comfortable position.\n\nIf you're unable to keep fluids down or if this continues, please reach out to a healthcare provider who can help you feel better.`,
      show_doctor_choice: true,
    };
  }

  // Mood/emotional
  if (
    symptomsLower.includes("sad") ||
    symptomsLower.includes("anxious") ||
    symptomsLower.includes("mood") ||
    symptomsLower.includes("depressed")
  ) {
    return {
      conversation: `${nickname}, thank you for trusting me with how you're feeling. Your emotions are valid, and you're not alone in this.\n\nOur hormones can affect our mood, especially around our cycle. But if you've been feeling this way for a while, it's important to talk to someone who can truly support you.\n\nPlease be gentle with yourself today. You deserve care and understanding.`,
      show_doctor_choice: true,
    };
  }

  // Fatigue/tiredness
  if (
    symptomsLower.includes("tired") ||
    symptomsLower.includes("fatigue") ||
    symptomsLower.includes("exhausted")
  ) {
    return {
      conversation: `${nickname}, feeling exhausted is your body asking for rest, and that's completely valid.\n\nFatigue can happen for many reasons - your cycle, stress, not enough sleep, or even low iron. Please listen to your body and give yourself permission to rest.\n\nMake sure you're eating well and staying hydrated. If this tiredness doesn't improve with rest, it might be good to get checked by a doctor.`,
      show_doctor_choice: true,
    };
  }

  // General warm fallback
  return {
    conversation: `${nickname}, thank you for telling me about this. I know it isn't always easy to talk about health concerns.\n\nOur bodies are very sensitive, and what you're feeling is valid. While I can't know for sure without a proper check-up, I want you to remember to take deep breaths and be gentle with yourself today.\n\nWould you like to talk more about how long this has been happening, or should we find someone nearby who can take a closer look?`,
    show_doctor_choice: true,
  };
}

export async function POST(req: Request) {
  try {
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0] : "anonymous";

    // Rate limiting check
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          error: "Too many requests. Please wait a moment before trying again.",
        },
        { status: 429 },
      );
    }

    const body = await req.json();
    const { age, symptoms, language, nickname, location } = body;

    if (
      !symptoms ||
      typeof symptoms !== "string" ||
      symptoms.trim().length < 2
    ) {
      return NextResponse.json(
        { error: "Please describe your symptoms in detail." },
        { status: 400 },
      );
    }

    const cleanSymptoms = sanitizeInput(symptoms);

    const cleanAge = age ? sanitizeInput(age.toString()) : "25";
    const cleanLanguage = sanitizeInput(language || "English");
    const cleanNickname = nickname ? sanitizeInput(nickname) : "friend";
    const cleanLocation = location ? sanitizeInput(location) : "India";
    const urgentResponse = getUrgentSymptomResponse(
      cleanSymptoms,
      cleanNickname,
    );

    if (urgentResponse) {
      return NextResponse.json({
        conversation: urgentResponse.conversation,
        show_doctor_choice: false,
        reasoning: {
          action: urgentResponse.recommended_action,
        },
      });
    }

    // Handle simple greetings without triggering medical guidance.
    const normalizedMessage = cleanSymptoms
      .trim()
      .toLowerCase()
      .replace(/[.!?,]+$/g, "");

    const greetings = new Set([
      "hi",
      "hello",
      "hey",
      "hi there",
      "hello there",
      "good morning",
      "good afternoon",
      "good evening",
    ]);

    if (greetings.has(normalizedMessage)) {
      const greeting = cleanLanguage.toLowerCase().startsWith("hindi")
        ? `Namaste${cleanNickname !== "friend" ? `, ${cleanNickname}` : ""}! Main HerCare hoon. Aap kaisi hain? Aap apni health concern ya koi sawaal share kar sakti hain.`
        : `Hi${cleanNickname !== "friend" ? `, ${cleanNickname}` : ""}! 💗 I'm here to support you. What's on your mind today?`;

      return NextResponse.json({
        conversation: greeting,
        show_doctor_choice: false,
        reasoning: { action: "Greeting response" },
      });
    }

    // Check if Gemini API is available
    if (!model) {
      console.log("⚠️ No API key: Using intelligent fallback responses");
      const fallbackResponse = getDevelopmentResponse(
        cleanSymptoms,
        cleanNickname,
      );
      return NextResponse.json({
        conversation: fallbackResponse.conversation,
        show_doctor_choice: fallbackResponse.show_doctor_choice,
        reasoning: { note: "Fallback mode - API key not configured" },
      });
    }

    // --- UNIFIED HIGH-SPEED AGENT ---
    try {
      const prompt = unifiedPrompt(
        cleanNickname,
        cleanAge,
        cleanLocation,
        cleanSymptoms,
        cleanLanguage,
      );
      let result: Awaited<ReturnType<typeof model.generateContent>> | undefined;

      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          result = await model.generateContent(prompt);
          break;
        } catch (error) {
          const message =
            error instanceof Error ? error.message : String(error);
          const retryable =
            /\b(429|500|503|504)\b/.test(message) ||
            /fetch failed|network|timeout|ECONNRESET|ETIMEDOUT/i.test(message);

          if (!retryable || attempt === 2) {
            throw error;
          }

          const delayMs = 1000 * 2 ** attempt;
          console.warn(`Gemini retrying after ${delayMs}ms`);
          await new Promise((resolve) => setTimeout(resolve, delayMs));
        }
      }

      if (!result) {
        throw new Error("Gemini request failed after retries.");
      }

      const responseText = result.response.text().trim();

      if (!responseText) {
        throw new Error("Gemini returned an empty response.");
      }

      return NextResponse.json({
        conversation: responseText,
        show_doctor_choice: false,
        reasoning: { action: "AI-generated response" },
      });
    } catch (geminiError: any) {
      // Production-ready: Use intelligent fallback instead of showing error
      console.error(
        "Gemini API error (using fallback):",
        geminiError?.message || geminiError,
      );

      const fallbackResponse = getDevelopmentResponse(
        cleanSymptoms,
        cleanNickname,
      );
      return NextResponse.json({
        conversation: fallbackResponse.conversation,
        show_doctor_choice: fallbackResponse.show_doctor_choice,
        reasoning: { note: "Using fallback - API temporarily unavailable" },
      });
    }
  } catch (error) {
    console.error("API Error:", error);
    // Even in case of unexpected errors, provide a helpful fallback
    return NextResponse.json({
      conversation:
        "I'm having a little trouble right now, but I'm here for you. Please try again in a moment, or if this is urgent, don't hesitate to reach out to a trusted healthcare provider.",
      show_doctor_choice: true,
      reasoning: { note: "System error - fallback response" },
    });
  }
}

export const runtime = "edge";
