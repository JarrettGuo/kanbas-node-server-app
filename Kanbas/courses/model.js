import mongoose from "mongoose";
import courseSchema from "./schema.js";

const courseModel = mongoose.model("Course", courseSchema);
export default courseModel;