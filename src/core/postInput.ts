import { Platform } from "./platforms";
import { Intent } from "./intents";
import { PostHistory } from "./history";

export interface PostDecisionInput {
  platform: Platform;
  intent: Intent;
  hasMedia: boolean;
  history: PostHistory;
}
