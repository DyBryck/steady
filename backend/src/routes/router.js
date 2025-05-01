import express from "express";
import * as authController from "../controllers/authController.js";
import * as courseController from "../controllers/courseController.js";
import * as courseStudentController from "../controllers/courseStudentController.js";
import { handleRequest } from "../utils/handleRequestUtils.js";

const router = express();

// Students
router.post("/auth/register", handleRequest(authController.register));
router.post("/auth/login", handleRequest(authController.login));

// Courses
router.post("/courses", handleRequest(courseController.createCourse));

// CourseStudents (relation between courses & students)
router.post("/course-students", handleRequest(courseStudentController.createCourseStudent));

export default router;
