/* eslint-disable @typescript-eslint/no-explicit-any */
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { SemisterRegistrationService } from "./semisterRegistration.service";

const createSemisterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemisterRegistrationService.createSemisterRegistrationIntoDb(
      req.body
    );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semister Registration successfuly",
    data: result,
  });
});

const getAllSemisterRegistration = catchAsync(async (req, res) => {
  const result =
    await SemisterRegistrationService.getAllSemisterRegistrationFromDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",
    data: result,
  });
});

const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const {} = req.params;
  const result =
    await SemisterRegistrationService.getSingleSemisterRegistrationFromDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",
    data: result,
  });
});

const updateSemisterRegistration = catchAsync(async (req, res) => {
  const { semesterId } = req.params;
  const result =
    await SemisterRegistrationService.updateSemisterRegistrationIntoDb();

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic semester is retrieved successfully",
    data: result,
  });
});

export const SemisterRegistrationServiceController = {
  createSemisterRegistration,
  getAllSemisterRegistration,
  getSingleSemisterRegistration,
  updateSemisterRegistration,
};
