import express from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.joiValidation";
import { facultyValidations } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admim/admin.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  // auth(USER_ROLE.admin),
  validateRequest(studentValidations.createStudentValidationSchema),
  userController.createStudent
);

router.post(
  "/create-faculty",
  validateRequest(facultyValidations.createFacultyValidationSchema),
  userController.createFaculty
);

router.post(
  "/create-admin",
  validateRequest(createAdminValidationSchema),
  userController.createAdmin
);

router.get("/me", auth("student", "admin", "faculty"), userController.getMe);

export const UserRoute = router;
