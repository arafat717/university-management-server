/* eslint-disable @typescript-eslint/no-explicit-any */

import { StudentService } from "./student.service";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const getAllStudent = catchAsync(async (req, res) => {
  const result = await StudentService.getAllStudentFromDb(req.query);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Students are retrived successfuly",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.getSingleStudentFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student are retrived successfuly",
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { student } = req.body;
  const result = await StudentService.updateStudentIntoDb(id, student);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student are retrived successfuly",
    data: result,
  });
});

const deleteStudent = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StudentService.deletestudentFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student are deleted successfuly",
    data: result,
  });
});

export const StudentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
