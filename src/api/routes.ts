import { Router } from "express";
import { decidePost } from "../core/decide";
import { VetoDecisionRequest } from "./types";
import { apiKeyAuth } from "./auth";
import { rateLimit } from "./rateLimit";

export const router = Router();

router.post(
  "/v1/veto/decision",
  apiKeyAuth,
  rateLimit,
  async (req, res) => {
    const body = req.body as VetoDecisionRequest;

    if (!body || !body.platform || !body.intent || !body.history) {
      return res.status(400).json({ error: "Invalid request body" });
    }

    try {
      const result = await decidePost({
        platform: body.platform,
        intent: body.intent,
        hasMedia: body.hasMedia,
        history: body.history
      });

      return res.json(result);
    } catch {
      return res.status(500).json({ error: "Decision failed" });
    }
  }
);
