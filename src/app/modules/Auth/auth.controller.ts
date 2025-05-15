import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDb(req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Course created successfuly",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
