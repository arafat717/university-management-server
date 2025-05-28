import express from "express";
import validateRequest from "../../middlwares/validateRequest";
import { SemisterRegistrationServiceController } from "./semisterRegistration.controller";
import { SemisterRegistrationValidations } from "./semisterRegistration.validation";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post(
  "/create-semester-registration",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemisterRegistrationValidations.createSemisterRegistrationValidation
  ),
  SemisterRegistrationServiceController.createSemisterRegistration
);

router.get(
  "/",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemisterRegistrationServiceController.getAllSemisterRegistration
);
router.get(
  "/:id",
  auth(
    USER_ROLE.superAdmin,
    USER_ROLE.admin,
    USER_ROLE.faculty,
    USER_ROLE.student
  ),
  SemisterRegistrationServiceController.getSingleSemisterRegistration
);
router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    SemisterRegistrationValidations.updateSemisterRegistrationValidationSchema
  ),
  SemisterRegistrationServiceController.updateSemisterRegistration
);

router.delete(
  "/:id",
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  SemisterRegistrationServiceController.deleteSemesterRegistration
);

export const semisterRegistrationRoute = router;
