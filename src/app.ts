import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";
import { academicSemisterRoute } from "./app/modules/academicSemester/academicSemester.route";
import { academicFacultyRoute } from "./app/modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoute } from "./app/modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "./app/modules/faculty/faculty.route";
import { AdminRoutes } from "./app/modules/admim/admin.route";
import { courseRoute } from "./app/modules/Course/course.route";
import { semisterRegistrationRoute } from "./app/modules/semisterRegistration/semisterRegistration.route";
import { OfferedCourseRoute } from "./app/modules/OfferedCourse/OfferedCourse.route";
import { autheRoute } from "./app/modules/Auth/auth.route";
import cookieParser from "cookie-parser";
import { enrolledCourseRoute } from "./app/modules/EnrolledCourse/enrolledCourse.route";

// parser
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());

// application route
app.use("/api/v1/students", StudentRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/academic-semester", academicSemisterRoute);
app.use("/api/v1/academic-faculty", academicFacultyRoute);
app.use("/api/v1/academic-department", academicDepartmentRoute);
app.use("/api/v1/faculties", FacultyRoutes);
app.use("/api/v1/admins", AdminRoutes);
app.use("/api/v1/courses", courseRoute);
app.use("/api/v1/registration", semisterRegistrationRoute);
app.use("/api/v1/offeredcourse", OfferedCourseRoute);
app.use("/api/v1/auth", autheRoute);
app.use("/api/v1/enorlled-course", enrolledCourseRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
