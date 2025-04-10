/* eslint-disable @typescript-eslint/no-explicit-any */

import { StudentService } from "./student.service";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students are retrived successfuly",
    data: result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StudentService.getSingleStudentFromDb(studentId);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student are retrived successfuly",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
};
