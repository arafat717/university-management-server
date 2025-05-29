import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { offeredCourseValidation } from "./OfferedCourse.validation";
import { OfferedCourseController } from "./OfferedCourse.controller";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-offered-course",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidation.createOfferedCourseZodSchema),
  OfferedCourseController.createOfferedCourse
);

router.get(
  "/my-offered-course",
  auth(USER_ROLE.student),
  OfferedCourseController.getMyOfferedCourse
);

router.get(
  "/",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.faculty),
  OfferedCourseController.getAllOfferedCourse
);
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  OfferedCourseController.getSingleOfferedCourse
);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(offeredCourseValidation.updateOfferedCourseZodSchema),
  OfferedCourseController.updateOfferedCourse
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  OfferedCourseController.deleteOfferedCourse
);

export const OfferedCourseRoute = router;
