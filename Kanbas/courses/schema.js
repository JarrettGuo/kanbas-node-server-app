// courseSchema.js
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  description: String,
  publishedDate: { type: Date, default: Date.now }
}, { collection: "courses" });

export default courseSchema;