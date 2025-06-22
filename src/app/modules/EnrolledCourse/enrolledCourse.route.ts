import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { enrolledCourseValidation } from "./enrolledCourse.validation";
import { enrolledCourseController } from "./enrolledCourse.controller";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-enrolled-course",
  auth(USER_ROLE.student),
  validateRequest(
    enrolledCourseValidation.createEnrolledCourseValidationZodSchema
  ),
  enrolledCourseController.enrolledCourse
);

router.get(
  "/my-enrolled-courses",
  auth(USER_ROLE.student),
  enrolledCourseController.getMyEnrolledCourses
);

router.patch(
  "/update-enrolled-course-marks",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  validateRequest(
    enrolledCourseValidation.updateCourseEnrollMarksValidationZodSchema
  ),
  enrolledCourseController.updateEnrollCourseMark
);

router.get("/", auth("admin"), enrolledCourseController.getAlLCourse);

export const enrolledCourseRoute = router;
