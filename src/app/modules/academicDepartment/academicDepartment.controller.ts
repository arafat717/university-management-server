/* eslint-disable @typescript-eslint/no-explicit-any */
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AccademicDepartmentService } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AccademicDepartmentService.createAcademicDepartmentIntoDb(req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty created successfuly",
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res) => {
  const result = await AccademicDepartmentService.getAllDepartmentFromDb(
    req.query
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Departments are retrived successfuly",
    data: result.result,
    meta: result.meta,
  });
});

const getSingleDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result = await AccademicDepartmentService.getSingleDepartmentFromDb(
    departmentId
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Department is retrived successfuly",
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await AccademicDepartmentService.updateAcademicDepartmentIntoDb(
      departmentId,
      req.body
    );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic department is updated successfully",
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  updateAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
};
