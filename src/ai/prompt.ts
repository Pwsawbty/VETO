export function buildAnalysisPrompt(params: {
  platform: string;
  intent: string;
  decision: string;
  historySummary: string;
}) {
  return `
You are an assistant that explains posting decisions.
You do NOT change decisions.

Context:
- Platform: ${params.platform}
- Intent: ${params.intent}
- Decision: ${params.decision}
- History: ${params.historySummary}

Task:
- Give ONE short reason (max 15 words).
- Suggest a confidence score between 0.6 and 0.95.
- Do NOT recommend posting changes.
- Do NOT override the decision.

Respond strictly in JSON:
{
  "reason": "...",
  "confidence": 0.0
}
`;
}
