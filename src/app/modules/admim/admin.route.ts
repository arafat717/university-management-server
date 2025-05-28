import express from "express";

import { updateAdminValidationSchema } from "./admin.validation";
import { AdminControllers } from "./admin.controller";
import validateRequest from "../../middlwares/validateRequest";
import auth from "../../middlwares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/", auth(USER_ROLE.superAdmin), AdminControllers.getAllAdmins);

router.get("/:id", auth(USER_ROLE.superAdmin), AdminControllers.getSingleAdmin);

router.patch(
  "/:id",
  auth(USER_ROLE.superAdmin),
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin
);

router.delete(
  "/:adminId",
  auth(USER_ROLE.superAdmin),
  AdminControllers.deleteAdmin
);

export const AdminRoutes = router;
