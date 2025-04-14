import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import { StudentRoute } from "./app/modules/student/student.route";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./app/middlwares/globalErrorHandler";
import notFound from "./app/middlwares/notFound";
import { academicSemisterRoute } from "./app/modules/academicSemester/academicSemester.route";

app.use(express.json());
app.use(cors());

// application route
app.use("/api/v1/students", StudentRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/academic-semester", academicSemisterRoute);

app.get("/", (req: Request, res: Response) => {
  res.send("server is running");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
