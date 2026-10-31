import { Schema } from "mongoose";

export const AttemptSchema = new Schema({
  childId: { type: Schema.Types.ObjectId, ref: "Child", required: true },
  activityId: { type: Schema.Types.ObjectId, ref: "Activity", required: true },
  score: Number,
  accuracy: Number,
  responseTime: Number,
  mistakes: Number,
  hintsUsed: Number,
  completedAt: Date,
}, { timestamps: true });
