// ================================
// Core system contracts
// ================================
export * from "./core/decisions";
export * from "./core/intents";
export * from "./core/platforms";
export * from "./core/boundaries";
export * from "./core/version";

// ================================
// Input signal contracts
// ================================
export * from "./core/signals";
export * from "./core/history";
export * from "./core/postInput";

// ================================
// Decision engine (rules + entry)
// ================================
export * from "./core/rules";
export * from "./core/decide";

// ================================
// AI analysis layer (non-intrusive)
// ================================
export * from "./ai/analyze";

// ================================
// Public API contracts (HTTP-safe)
// ================================
export * from "./api/types";
