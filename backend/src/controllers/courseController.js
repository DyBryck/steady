import * as courseService from "../services/courseService.js";

export const createCourse = async (req) => {
  // Validation des données ici
  const { name, date } = req.body;

  const courseCreated = await courseService.createCourse(name, date);

  return { message: "Cours crée avec succès", courseCreated };
};

export const getAllCourses = async () => {
  const courses = await courseService.getAllCourses();

  return { message: "Liste des cours trouvée", courses };
};
