import { Platform } from "../core/platforms";
import { Intent } from "../core/intents";
import { Decision } from "../core/decisions";

export interface VetoDecisionRequest {
  platform: Platform;
  intent: Intent;
  hasMedia: boolean;
  history: {
    lastPostHours: number;
    postsLast24h: number;
    accountAgeDays: number;
  };
}

export interface VetoDecisionResponse {
  decision: Decision;
  reason: string;
  confidence: number;
}
