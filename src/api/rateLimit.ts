import { Request, Response, NextFunction } from "express";

const WINDOW_MS = 60_000; // 1 minute
const MAX_REQ = 60; // 60 req / minute / key

const store = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(req: Request, res: Response, next: NextFunction) {
  const key = req.header("x-api-key") || "anonymous";
  const now = Date.now();

  const entry = store.get(key);

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return next();
  }

  if (entry.count >= MAX_REQ) {
    return res.status(429).json({ error: "Rate limit exceeded" });
  }

  entry.count += 1;
  next();
}
