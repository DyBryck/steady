import * as courseRepository from "../repositories/courseRepository.js";

export const createCourse = async (courseName) => {
  const courseCreated = await courseRepository.createCourse(courseName);

  return courseCreated;
};

export const getCourseById = async (courseId) => {
  const courseFound = await courseRepository.getCourseById(courseId);

  return courseFound;
};
