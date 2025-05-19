import catchAsync from "../../utils/catchAsync";
import sentResponse from "../../utils/sendResponse";
import status from "http-status";
import { AuthService } from "./auth.service";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUserIntoDb(req.body);
  const { accesstoken, refreshToken, needsPasswordChange } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successfuly",
    data: {
      accesstoken,
      needsPasswordChange,
    },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthService.changePasswordIntoDb(req.user, passwordData);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Password changed successfuly",
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Access token retrived successfuly",
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const result = await AuthService.forgetPassword(req.body.id);
  sentResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Reset link genarated successfuly",
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
};
