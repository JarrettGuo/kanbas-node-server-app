import courseModel from "./model.js";

export const findCourseById = (id) => {
    return courseModel.findById(id); // Ensure it queries based on `_id` and not another field
};
export const findAllCourses = () => courseModel.find();
export const createCourse = (course) => courseModel.create(course);
export const updateCourse = (id, course) => courseModel.updateOne({ _id: id }, { $set: course });
export const deleteCourse = (id) => courseModel.deleteOne({ _id: id });
