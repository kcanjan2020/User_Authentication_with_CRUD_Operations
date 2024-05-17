import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { secreteKey } from "../../config.js";
import { sendMail } from "../utils/sendMail.js";
export const registerUser = async (req, res, next) => {
  try {
    let data = req.body;
    let password = data.password;
    let hasPassword = await bcrypt.hash(password, 10);
    data = {
      ...data,
      password: hasPassword,
      isVerifiedEmail: false,
    };
    let result = await User.create(data);
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };
    let token = await jwt.sign(infoObj, secreteKey, expiryInfo);
    await sendMail({
      from: '"Freedom Khabar" <kcanjan2020@gmail.com>',
      to: [req.body.email],
      subject: "Verify Email",
      html: `
      <h1> Your account has been created successfully !</h1>
      <p>Dear ${req.body.fullName}</p>
      <p>Click below to verify your email</p>
      <a href="http://localhost:3000/verify-email?token=${token}"> http://localhost:3000/verify-email?token=${token}</a>
      <p>If you did not request any email verification then please ignore this email</p>
      <p>Thank Your for using our application</p>

      `,
    });
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    //get token
    let tokenString = req.headers.authorization;
    let tokenArray = tokenString.split(" ");
    let token = tokenArray[1];

    //verify
    let infoObj = await jwt.verify(token, secreteKey);
    let userId = infoObj._id;
    let result = await User.findByIdAndUpdate(
      userId,
      { isVerifiedEmail: true },
      { new: true }
    );
    res.status(201).json({
      success: true,
      message: "user verified successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;
    let user = await User.findOne({ email: email });
    if (user) {
      if (user.isVerifiedEmail) {
        let isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          let infoObj = {
            _id: user._id,
          };
          let expiryInfo = {
            expiresIn: "365d",
          };
          let token = await jwt.sign(infoObj, secreteKey, expiryInfo);
          res.status(200).json({
            success: true,
            message: "User Login Successfully",
            token: token,
          });
        } else {
          let error = new Error("Credential does not match");
          throw error;
        }
      } else {
        let error = new Error("Credential does not match");
        throw error;
      }
    } else {
      let error = new Error("Credential does not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myProfile = async (req, res, next) => {
  try {
    let _id = req._id; //here req._id is passing through isAuthenticated middleware
    let result = await User.findById(_id);
    res.status(200).json({
      success: true,
      message: "Profile read successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "unable to read profile",
    });
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    //we can not update email, password and phoneNumber
    delete data.email;
    delete data.password;
    delete data.phoneNumber;
    let result = await User.findByIdAndUpdate(_id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "Profile updated successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res, next) => {
  try {
    let _id = req._id;
    let result = await User.findByIdAndDelete(_id);
    res.status(201).json({
      success: true,
      message: "Profile Deleted successfully",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    let _id = req._id;
    let data = req.body;
    let oldPassword = data.oldPassword;
    let newPassword = data.newPassword;
    let user = await User.findById(_id);
    let hasPassword = user.password;
    let isValidPassword = await bcrypt.compare(oldPassword, hasPassword);
    if (isValidPassword) {
      let newHashPassword = await bcrypt.hash(newPassword, 10);
      let result = await User.findByIdAndUpdate(
        _id,
        { password: newHashPassword },
        { new: true }
      );
      res.status(201).json({
        success: true,
        message: "Password updated successfully.",
        data: result,
      });
    } else {
      let error = new Error("Credential dose not match");
      throw error;
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readAllUser = async (req, res, next) => {
  try {
    let result = await User.find({});
    res.status(200).json({
      success: true,
      message: "All user read successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const readSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    console.log(id);
    let result = await User.findById(id);
    res.status(200).json({
      success: true,
      message: "User Read Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let data = req.body;
    //we can not update email, password and phoneNumber
    delete data.email;
    delete data.password;
    delete data.phoneNumber;
    let result = await User.findByIdAndUpdate(id, data, { new: true });
    res.status(201).json({
      success: true,
      message: "User Updated Successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteSpecificUser = async (req, res, next) => {
  try {
    let id = req.params.id;
    let result = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
