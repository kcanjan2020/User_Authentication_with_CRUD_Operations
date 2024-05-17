import express, { json } from "express";
import cors from "cors";
import connectToMongoDB from "./src/databaseConnection/mongoDbConnection.js";
import { port } from "./config.js";
import userRouter from "./src/router/userRouter.js";
let expressApp = express();
expressApp.use(json());
expressApp.use(cors());
expressApp.use(express.static("./public"));
expressApp.listen(port, () => {
  console.log(`Express app is Listening at port ${port}`);
});
connectToMongoDB();

expressApp.use("/api/auth", userRouter);
