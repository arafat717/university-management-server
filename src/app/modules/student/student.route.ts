import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.get("/", StudentControllers.getAllStudent);
router.get("/:studentId", StudentControllers.getSingleStudent);

export const StudentRoute = router;
