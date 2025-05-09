import * as studentRepository from "../repositories/studentRepository.js";

export const createStudent = async (body) => {
  const studentCreated = await studentRepository.createStudent(body);

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

export const getStudentById = async (id) => {
  const studentFound = await studentRepository.getStudentById(id);

  return studentFound;
};

export const deleteStudent = async (id) => {
  await studentRepository.deleteStudent(id);
};
