/* eslint-disable @typescript-eslint/no-explicit-any */
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import { OfferedCourseService } from "./OfferedCourse.service";

const createOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.createOfferedCourseIntoDb(req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Offered Course Created successfuly",
    data: result,
  });
});

const getAllOfferedCourse = catchAsync(async (req, res) => {
  const result = await OfferedCourseService.getAllOfferedCourseFromDb(
    req.query
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Offered Course retrived successfuly",
    data: result,
  });
});

const getMyOfferedCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await OfferedCourseService.getMyOfferedCourseFromDb(
    userId,
    req.query
  );
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "My Offered Course retrived successfuly",
    meta: result.meta,
    data: result.result,
  });
});

const getSingleOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.getSingleOfferedCourseFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Offered Course retrived successfuly",
    data: result,
  });
});

const updateOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.updateOfferedCourseIntoDb(
    id,
    req.body
  );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Offered Course updated successfully",
    data: result,
  });
});

const deleteOfferedCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await OfferedCourseService.deleteOfferedCourseFromDB(id);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Offered Course deleted successfully",
    data: result,
  });
});

export const OfferedCourseController = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
  getMyOfferedCourse,
};
