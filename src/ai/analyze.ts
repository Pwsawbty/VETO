import { buildAnalysisPrompt } from "./prompt";
import { Decision } from "../core/decisions";

/**
 * AI never decides.
 * AI only explains an already-made decision.
 */
export async function analyzeDecision(params: {
  platform: string;
  intent: string;
  decision: Decision;
  historySummary: string;
  callLLM: (prompt: string) => Promise<string>;
}): Promise<{ reason?: string; confidence?: number }> {

  // Skip AI for hard NO decisions (cost control)
  if (params.decision === Decision.DO_NOT_POST) {
    return {};
  }

  const prompt = buildAnalysisPrompt({
    platform: params.platform,
    intent: params.intent,
    decision: params.decision,
    historySummary: params.historySummary
  });

  try {
    const raw = await params.callLLM(prompt);
    const parsed = JSON.parse(raw);

    return {
      reason: typeof parsed.reason === "string" ? parsed.reason : undefined,
      confidence:
        typeof parsed.confidence === "number"
          ? Math.min(0.95, Math.max(0.6, parsed.confidence))
          : undefined
    };
  } catch {
    // AI failure must NOT break the system
    return {};
  }
}
