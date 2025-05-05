/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from "./user.service";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDb(password, studentData);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student created successfuly",
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserService.createFacultyIntoDB(password, facultyData);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty is created succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
};
