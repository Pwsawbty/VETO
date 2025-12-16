import { PostDecisionInput } from "./postInput";
import { applyHardRules } from "./rules";
import { Decision } from "./decisions";
import { analyzeDecision } from "../ai/analyze";

export interface DecisionResult {
  decision: Decision;
  reason: string;
  confidence: number;
}

export async function decidePost(
  input: PostDecisionInput,
  callLLM?: (prompt: string) => Promise<string>
): Promise<DecisionResult> {

  const base = applyHardRules(input);

  let reason = base.reason;
  let confidence = 0.9;

  if (callLLM) {
    const analysis = await analyzeDecision({
      platform: input.platform,
      intent: input.intent,
      decision: base.decision,
      historySummary: `lastPostHours=${input.history.lastPostHours}, posts24h=${input.history.postsLast24h}`,
      callLLM
    });

    if (analysis.reason) reason = analysis.reason;
    if (analysis.confidence) confidence = analysis.confidence;
  }

  return {
    decision: base.decision,
    reason,
    confidence
  };
}
