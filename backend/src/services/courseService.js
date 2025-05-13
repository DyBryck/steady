import * as courseRepository from "../repositories/courseRepository.js";

export const createCourse = async (name, date) => {
  const formatedDate = new Date(date);

  const courseCreated = await courseRepository.createCourse(name, formatedDate);

  return courseCreated;
};

export const getCourseById = async (courseId) => {
  const courseFound = await courseRepository.getCourseById(courseId);

  return courseFound;
};

export const getAllCourses = async () => {
  const coursesList = await courseRepository.getAllCourses();

  return coursesList;
};
