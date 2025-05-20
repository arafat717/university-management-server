import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { enrolledCourseValidation } from "./enrolledCourse.validation";
import { enrolledCourseController } from "./enrolledCourse.controller";
import auth from "../../middlwares/auth";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth("student"),
  validateRequest(
    enrolledCourseValidation.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseController.enrolledCourse
);

export const enrolledCourseRoute = router;
