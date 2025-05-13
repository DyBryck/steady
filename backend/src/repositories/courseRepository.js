import { prismaErrorHandler } from "../errors/prismaErrorHandler.js";
import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createCourse = async (name, date) =>
  prismaErrorHandler(() =>
    prisma.course.create({
      data: {
        name,
        date,
      },
    }),
  );

export const getCourseById = async (id) =>
  prismaErrorHandler(() =>
    prisma.course.findUniqueOrThrow({
      where: {
        id,
      },
    }),
  );

export const getAllCourses = async () => prismaErrorHandler(() => prisma.course.findMany());
