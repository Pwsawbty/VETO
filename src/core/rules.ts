import { Decision } from "./decisions";
import { Platform } from "./platforms";
import { Intent } from "./intents";
import { PostDecisionInput } from "./postInput";

export function applyHardRules(
  input: PostDecisionInput
): { decision: Decision; reason: string } {

  const { history, intent, platform } = input;

  // Rule 1: Too many posts in 24h → DO NOT POST
  if (history.postsLast24h >= 3) {
    return {
      decision: Decision.DO_NOT_POST,
      reason: "Too many posts in last 24 hours"
    };
  }

  // Rule 2: Posted very recently → SCHEDULE
  if (history.lastPostHours < 3) {
    return {
      decision: Decision.SCHEDULE,
      reason: "Posted too recently"
    };
  }

  // Rule 3: Opinion content on sensitive platforms → EDIT FIRST
  if (intent === Intent.OPINION && platform === Platform.LINKEDIN) {
    return {
      decision: Decision.EDIT_FIRST,
      reason: "Opinion content needs caution on LinkedIn"
    };
  }

  // Default: Safe to post
  return {
    decision: Decision.POST_NOW,
    reason: "No risk signals detected"
  };
}
