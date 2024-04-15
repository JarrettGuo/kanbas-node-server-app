import Module from './schema.js';

export const findModulesByCourse = (courseId) => Module.find({ course: courseId });
export const createModule = (moduleData) => Module.create(moduleData);
export const updateModule = (moduleId, updateData) => Module.findByIdAndUpdate(moduleId, updateData, { new: true });
export const deleteModule = (moduleId) => Module.findByIdAndDelete(moduleId);
