/* eslint-disable @typescript-eslint/no-explicit-any */
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AccademicFacultyService } from "./academicFaculty.service";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AccademicFacultyService.createAcademicFacultyIntoDb(
    req.body
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty created successfuly",
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await AccademicFacultyService.getAllFacultyFromDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty are retrived successfuly",
    data: result,
  });
});

const getSingleFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AccademicFacultyService.getSingleFacultyFromDb(
    facultyId
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty is retrived successfuly",
    data: result,
  });
});

const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AccademicFacultyService.updateAcademicFacultyIntoDb(
    facultyId,
    req.body
  );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is updated successfully",
    data: result,
  });
});

export const AcademicFacultyController = {
  createAcademicFaculty,
  updateAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
};
