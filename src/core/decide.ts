import { PostDecisionInput } from "./postInput";
import { applyHardRules } from "./rules";
import { Decision } from "./decisions";

export interface DecisionResult {
  decision: Decision;
  reason: string;
  confidence: number;
}

export function decidePost(
  input: PostDecisionInput
): DecisionResult {

  const { decision, reason } = applyHardRules(input);

  // Hard rules = high confidence by default
  return {
    decision,
    reason,
    confidence: 0.9
  };
}
