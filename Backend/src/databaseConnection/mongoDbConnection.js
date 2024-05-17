import mongoose from "mongoose";
import { dbUrl } from "../../config.js";
let connectToMongoDB = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Our application is connected to mongoDb Successfully");
  } catch (error) {
    console.log(error.message);
  }
};
export default connectToMongoDB;
