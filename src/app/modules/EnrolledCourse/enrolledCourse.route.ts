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

router.patch(
  "/update-enrolled-course-marks",
  auth("faculty"),
  validateRequest(
    enrolledCourseValidation.updateCourseEnrollMarksValidationZodSchema
  ),
  enrolledCourseController.updateEnrollCourseMark
);

router.get("/", auth("admin"), enrolledCourseController.getAlLCourse);

export const enrolledCourseRoute = router;
