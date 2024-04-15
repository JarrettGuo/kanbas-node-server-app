import Assignment from './schema.js';

export const findAllAssignmentsByCourse = (courseId) => Assignment.find({ course: courseId });
export const createAssignment = (assignmentData) => Assignment.create(assignmentData);
export const updateAssignment = (assignmentId, updateData) => Assignment.findByIdAndUpdate(assignmentId, updateData, { new: true });
export const deleteAssignment = (assignmentId) => Assignment.findByIdAndDelete(assignmentId);
