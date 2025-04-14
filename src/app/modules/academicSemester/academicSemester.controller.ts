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

export const AcademicSemesterController = {
  createAcademicSemester,
};
