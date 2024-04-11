// courseDao.js
import courseModel from "./model.js";

export const createCourse = (course) => courseModel.create(course);
export const findAllCourses = () => courseModel.find();
export const findCourseById = (courseId) => courseModel.findById(courseId);
export const updateCourse = (courseId, course) => courseModel.updateOne({ _id: courseId }, { $set: course });
export const deleteCourse = (courseId) => courseModel.deleteOne({ _id: courseId });