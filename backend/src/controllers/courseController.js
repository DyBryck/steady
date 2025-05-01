import * as courseService from "../services/courseService.js";

export const createCourse = async (req) => {
  const { name } = req.body;

  const courseCreated = await courseService.createCourse(name);

  return { message: "Cours crée avec succès", courseCreated };
};
