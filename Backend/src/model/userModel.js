import { model } from "mongoose";
import userSchema from "../schema/userSchema.js";
let User = model("User", userSchema);

export default User;
