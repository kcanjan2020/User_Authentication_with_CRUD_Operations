import { Router } from "express";
import {
  deleteProfile,
  loginUser,
  myProfile,
  registerUser,
  updatePassword,
  updateProfile,
  verifyEmail,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";

let userRouter = Router();
userRouter.route("/signup").post(registerUser);
userRouter.route("/verify-email").put(verifyEmail);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").get(isAuthenticated, myProfile);
userRouter.route("/profile").put(isAuthenticated, updateProfile);
userRouter.route("/profile").delete(isAuthenticated, deleteProfile);
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);
export default userRouter;
