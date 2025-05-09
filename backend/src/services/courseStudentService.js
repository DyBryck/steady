import { BadRequestError } from "../errors/customErrors.js";
import * as courseStudentRepository from "../repositories/courseStudentRepository.js";
import * as courseService from "../services/courseService.js";
import * as studentService from "../services/studentService.js";

export const createCourseStudent = async (studentId, courseId) => {
  await studentService.getStudentById(studentId);
  await courseService.getCourseById(courseId);

  const courseFollowed = await courseStudentRepository.createCourseStudent(studentId, courseId);

  return courseFollowed;
};

export const deleteCourseStudent = async (studentId, courseId) => {
  await studentService.getStudentById(studentId);
  await courseService.getCourseById(courseId);

  const courseUnfollowed = await courseStudentRepository.deleteCourseStudent(studentId, courseId);

  if (courseUnfollowed.count === 0)
    throw new BadRequestError("Vous n'étiez pas inscrit à ce cours");

  return courseUnfollowed;
};
