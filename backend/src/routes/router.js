import express from "express";
import * as authController from "../controllers/authController.js";
import * as courseController from "../controllers/courseController.js";
import * as courseStudentController from "../controllers/courseStudentController.js";
import * as studentController from "../controllers/studentController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express();

// Students
router.post("/auth/register", handleRequest(authController.register));
router.post("/auth/login", handleRequest(authController.login));
router.delete("/students/:id", handleRequest(studentController.deleteStudent));

// Courses
router.post("/courses", handleRequest(courseController.createCourse));

// CourseStudents (relation between courses & students)
router.post("/course-students", handleRequest(courseStudentController.createCourseStudent));

export default router;
