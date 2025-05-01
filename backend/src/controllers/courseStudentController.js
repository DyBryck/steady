import * as courseStudentService from "../services/courseStudentService.js";

export const createCourseStudent = async (req) => {
  const { studentId, courseId } = req.body;

  const relationCreated = await courseStudentService.createCourseStudent(studentId, courseId);

  return { message: `Inscription au cours réussie`, relationCreated };
};
