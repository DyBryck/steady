import { NotFoundError } from "../errors/customErrors.js";
import * as studentRepository from "../repositories/studentRepository.js";

export const createStudent = async (data) => {
  const studentCreated = await studentRepository.createStudent(data);

  const student = {
    id: studentCreated.id,
    firstName: studentCreated.firstName,
    lastName: studentCreated.lastName,
  };

  return student;
};

export const getStudentByEmail = async (email) => {
  const studentFound = await studentRepository.getStudentByEmail(email);

  return studentFound;
};

export const deleteStudent = async (id) => {
  const studentDeleted = await studentRepository.deleteStudent(id);

  if (!studentDeleted) throw new NotFoundError("Étudiant introuvable");
};
