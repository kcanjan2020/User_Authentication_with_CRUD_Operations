import { Router } from "express";
import { registerUser, verifyEmail } from "../controller/userController.js";

let userRouter = Router();
userRouter.route("/signup").post(registerUser);
userRouter.route("/verify-email").put(verifyEmail);
export default userRouter;
