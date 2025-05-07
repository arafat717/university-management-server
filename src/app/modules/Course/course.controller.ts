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

//   const updateAcademicFaculty = catchAsync(async (req, res) => {
//     const { facultyId } = req.params;
//     const result = await AccademicFacultyService.updateAcademicFacultyIntoDb(
//       facultyId,
//       req.body
//     );

//     sentResponse(res, {
//       statusCode: status.OK,
//       success: true,
//       message: "Academic Faculty is updated successfully",
//       data: result,
//     });
//   });

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
};
