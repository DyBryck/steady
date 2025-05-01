import * as courseStudentRepository from "../repositories/courseStudentRepository.js";

export const createCourseStudent = async (userId, courseId) => {
  const relationCreated = await courseStudentRepository.createCourseStudent(userId, courseId);

  return relationCreated;
};
