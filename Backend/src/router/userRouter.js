import { Router } from "express";
import {
  deleteProfile,
  deleteSpecificUser,
  forgotPassword,
  loginUser,
  myProfile,
  readAllUser,
  readSpecificUser,
  registerUser,
  resetPassword,
  updatePassword,
  updateProfile,
  updateSpecificUser,
  verifyEmail,
} from "../controller/userController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import authorized from "../middleware/authorized.js";

let userRouter = Router();
userRouter.route("/signup").post(registerUser);
userRouter.route("/verify-email").put(verifyEmail);
userRouter.route("/login").post(loginUser);
userRouter.route("/profile").get(isAuthenticated, myProfile);
userRouter.route("/profile").put(isAuthenticated, updateProfile);
userRouter.route("/profile").delete(isAuthenticated, deleteProfile);
userRouter.route("/update-password").patch(isAuthenticated, updatePassword);

userRouter
  .route("/read-alluser")
  .get(isAuthenticated, authorized(["admin", "superadmin"]), readAllUser);

userRouter.route("/forgot-password").post(forgotPassword);
userRouter.route("/reset-password").patch(isAuthenticated, resetPassword);

userRouter
  .route("/:id")
  .get(isAuthenticated, authorized(["admin", "superadmin"]), readSpecificUser)
  .patch(
    isAuthenticated,
    authorized(["admin", "superadmin"]),
    updateSpecificUser
  )
  .delete(isAuthenticated, authorized(["superadmin"]), deleteSpecificUser);
export default userRouter;
