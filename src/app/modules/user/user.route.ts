import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import validateRequest from "../../middlwares/validateRequest";
import { studentValidations } from "../student/student.joiValidation";
import { facultyValidations } from "../faculty/faculty.validation";
import { createAdminValidationSchema } from "../admim/admin.validation";
import auth from "../../middlwares/auth";
import { userValidation } from "./user.validation";
import { upload } from "../../utils/sentImageToCloudinary";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-student",
  auth(USER_ROLE.admin),
  upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
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

router.post(
  "/change-status/:id",
  auth("admin"),
  validateRequest(userValidation.changeStatusValidationSchema),
  userController.changeStatus
);

router.get("/me", auth("student", "admin", "faculty"), userController.getMe);

export const UserRoute = router;
