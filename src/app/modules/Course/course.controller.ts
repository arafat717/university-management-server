import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sendResponse";
import { CourseService } from "./course.service";

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseService.createCourseIntoDb(req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course created successfuly",
    data: result,
  });
});

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseService.getAllCourseFromDb(req.query);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Courses are retrived successfuly",
    data: result,
  });
});

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.getSingleCourseFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course is retrived successfuly",
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.deleteCourseFromDb(id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course deleted successfuly",
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseService.updateCourseIntoDb(id, req.body);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Academic Faculty is updated successfully",
    data: result,
  });
});

const assignfaculltiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.assignFacultyWithCourseIntoDb(
    courseId,
    faculties
  );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty assign successfully",
    data: result,
  });
});

const getFaculltiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const result = await CourseService.getCourseWithFacultyFromDb(courseId);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty assign successfully",
    data: result,
  });
});

const removefaculltiesWithCourse = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await CourseService.removeFacultyFromCourseFromDb(
    courseId,
    faculties
  );

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Faculty remove successfully",
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignfaculltiesWithCourse,
  removefaculltiesWithCourse,
  getFaculltiesWithCourse,
};
