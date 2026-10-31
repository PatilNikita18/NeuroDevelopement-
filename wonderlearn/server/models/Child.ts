import { Schema } from "mongoose";

export const ChildSchema = new Schema({
  name: { type: String, required: true },
  avatar: { type: String, required: true },
  ageRange: { type: String, enum: ["5-8", "9-12", "13-18"], required: true },
  condition: { type: String, enum: ["ID", "Autism", "ADHD"], required: true },
  preferences: [{ type: String }],
  sessionDuration: { type: Number, enum: [5, 10, 15], default: 10 },
}, { timestamps: true });
