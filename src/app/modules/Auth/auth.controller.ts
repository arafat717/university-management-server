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
  const user = req.user;
  const { ...passwordData } = req.body;
  const result = await AuthService.changePasswordIntoDb(user, passwordData);
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
