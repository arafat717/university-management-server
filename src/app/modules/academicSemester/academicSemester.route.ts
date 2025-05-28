import express from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlwares/validateRequest";
import { AcademicSemesterValidations } from "./academicSemester.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-academic-semester",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(AcademicSemesterValidations.createAcademicSemesterZodSchema),
  AcademicSemesterController.createAcademicSemester
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicSemesterController.getAllSemester
);
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  AcademicSemesterController.getSingleSemester
);
router.patch(
  "/:semesterId",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema
  ),
  AcademicSemesterController.updateAcademicSemester
);

export const academicSemisterRoute = router;
