import { Request, Response, NextFunction } from "express";

const VALID_API_KEYS = (process.env.VETO_API_KEYS || "")
  .split(",")
  .map(k => k.trim())
  .filter(Boolean);

export function apiKeyAuth(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key");

  if (!key || !VALID_API_KEYS.includes(key)) {
    return res.status(401).json({ error: "Invalid or missing API key" });
  }

  next();
}
