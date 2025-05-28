import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseController } from "./course.controller";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";
const router = express.Router();

router.post(
  "/create-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.createCoourseValidationSchema),
  CourseController.createCourse
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getAllCourse
);
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getSingleCourse
);
router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  CourseController.deleteCourse
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.updateCreateCoourseValidationSchema),
  CourseController.updateCourse
);

router.put(
  "/:courseId/assign-faculties",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignfaculltiesWithCourse
);

router.get(
  "/:courseId/get-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  CourseController.getFaculltiesWithCourse
);

router.delete(
  "/:courseId/remove-faculties",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseController.removefaculltiesWithCourse
);

export const courseRoute = router;
