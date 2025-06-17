/* eslint-disable @typescript-eslint/no-explicit-any */
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AccademicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AccademicSemesterService.createAcademicSemesterIntoDb(
    req.body
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Student created successfuly",
    data: result,
  });
});

const getAllSemester = catchAsync(async (req, res) => {
  const result = await AccademicSemesterService.getAllSemesterFromDb(req.query);
  // console.log(result);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",

    data: result.result,
    meta: result.meta,
  });
});

const getSingleSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AccademicSemesterService.getSingleSemesterFromDb(
    semesterId
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result = await AccademicSemesterService.updateAcademicSemesterIntoDb(
    semesterId,
    req.body
  );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is retrieved successfully",
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateAcademicSemester,
};
