import { Schema } from "mongoose";

export const LearningProfileSchema = new Schema({
  childId: { type: Schema.Types.ObjectId, ref: "Child", required: true },
  visualSupport: { type: Boolean, default: true },
  audioSupport: { type: Boolean, default: false },
  interactionPreference: { type: String, default: "games" },
  attentionLevel: { type: Number, default: 0.5 },
  memoryLevel: { type: Number, default: 0.5 },
  readingLevel: { type: Number, default: 0.5 },
  mathematicsLevel: { type: Number, default: 0.5 },
  currentDifficulty: { type: Number, default: 1 },
}, { timestamps: true });
