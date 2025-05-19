/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserService } from "./user.service";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";

const createStudent = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;
  const result = await UserService.createStudentIntoDb(
    req.file,
    password,
    studentData
  );
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

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;

  const result = await UserService.createAdminIntoDB(password, adminData);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin is created succesfully",
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  const result = await UserService.getMe(userId, role);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My data retrived succesfully",
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await UserService.changeStatus(id, req.body);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User status updated succesfully",
    data: result,
  });
});

export const userController = {
  createStudent,
  createFaculty,
  createAdmin,
  getMe,
  changeStatus,
};
