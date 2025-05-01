import { PrismaClient } from "../generated/prisma/client.js";

const prisma = new PrismaClient();

export const createCourse = async (courseName) => {
  return await prisma.course.create({
    data: {
      name: courseName,
    },
  });
};
