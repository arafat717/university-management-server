import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDb(req.body);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successfuly",
    data: result,
  });
});

const changePassword = catchAsync(async (req, res) => {
  console.log(req.body, req.user);
  // const result = await AuthService.changePasswordIntoDb();
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfuly",
    data: null,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
};
