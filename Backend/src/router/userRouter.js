import { Router } from "express";
import { registerUser } from "../controller/userController.js";

let userRouter = Router();
userRouter.route("/signup").post(registerUser);
export default userRouter;
