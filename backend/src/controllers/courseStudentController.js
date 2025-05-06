import * as courseStudentService from "../services/courseStudentService.js";

export const createCourseStudent = async (req) => {
  const { studentId, courseId } = req.body;

  const relationCreated = await courseStudentService.createCourseStudent(studentId, courseId);

  return { message: "Inscription au cours réussie", relationCreated };
};

export const deleteCourseStudent = async (req) => {
  const { studentId, courseId } = req.body;

  const relationDeleted = await courseStudentService.deleteCourseStudent(studentId, courseId);

  return { message: "Désinscription au cours réussie", relationDeleted };
};
