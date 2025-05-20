import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import { enrolledCourseService } from "./enrolledCourse.service";

const enrolledCourse = catchAsync(async (req, res) => {
  const userId = req.user.userId;
  const result = await enrolledCourseService.enrolledCourse(userId, req.body);

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "You successfully enrolled",
    data: result,
  });
});

export const enrolledCourseController = {
  enrolledCourse,
};
