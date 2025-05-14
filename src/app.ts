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

app.use(express.json());
app.use(cors());

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

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
