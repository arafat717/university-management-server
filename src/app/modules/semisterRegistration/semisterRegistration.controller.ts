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
    await SemisterRegistrationService.getAllSemisterRegistrationFromDb(
      req.query
    );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",
    data: result,
  });
});

const getSingleSemisterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemisterRegistrationService.getSingleSemisterRegistrationFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Semester are retrived successfuly",
    data: result,
  });
});

const updateSemisterRegistration = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result =
    await SemisterRegistrationService.updateSemisterRegistrationIntoDb(
      id,
      req.body
    );

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
