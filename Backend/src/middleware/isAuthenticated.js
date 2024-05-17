import jwt from "jsonwebtoken";
import { secreteKey } from "../../config.js";
let isAuthenticated = async (req, res, next) => {
  try {
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];
    let user = await jwt.verify(token, secreteKey);
    let userId = user._id;
    req._id = userId;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Token not valid",
    });
  }
};

export default isAuthenticated;
