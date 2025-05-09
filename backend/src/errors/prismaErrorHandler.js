import { Prisma } from "../generated/prisma/index.js";
import { BadRequestError, NotFoundError } from "./customErrors.js";

export const prismaErrorHandler = async (callback) => {
  try {
    return await callback();
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case "P2002":
          if (error.meta?.modelName === "Student")
            throw new BadRequestError("L'email est déjà utilisé");

          if (error.meta?.modelName === "CourseStudent")
            throw new BadRequestError("Vous êtes déjà inscrit à ce cours");

          break;

        case "P2025":
          if (error.meta?.modelName === "Student") throw new NotFoundError("Étudiant introuvable");
          if (error.meta?.modelName === "Course") throw new NotFoundError("Cours introuvable");

          break;

        default:
          throw new Error("Une erreur de base de données est survenue");
      }
    }
    throw new Error(error);
  }
};
