import express from "express";
import { FacultyControllers } from "./faculty.controller";
import validateRequest from "../../middlwares/validateRequest";
import { facultyValidations } from "./faculty.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/:id", FacultyControllers.getSingleFaculty);

router.patch(
  "/:id",
  validateRequest(facultyValidations.updateFacultyValidationSchema),
  FacultyControllers.updateFaculty
);

router.delete("/:id", FacultyControllers.deleteFaculty);

router.get(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyControllers.getAllFaculties
);

export const FacultyRoutes = router;
