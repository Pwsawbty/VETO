import { Router } from "express";
import { decidePost } from "../core/decide";
import { VetoDecisionRequest } from "./types";

export const router = Router();

router.post("/v1/veto/decision", async (req, res) => {
  const body = req.body as VetoDecisionRequest;

  // Minimal validation (cheap & strict)
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
  } catch (err) {
    return res.status(500).json({ error: "Decision failed" });
  }
});
