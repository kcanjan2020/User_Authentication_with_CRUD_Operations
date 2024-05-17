import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import { secreteKey } from "../../config.js";
import { sendMail } from "../utils/sendMail.js";
export const registerUser = async (req, res, next) => {
  try {
    let data = req.body;
    let password = data.password;
    // console.log(password)
    let hasPassword = await bcrypt.hash(password, 10);
    // console.log(hasPassword);
    data = {
      ...data,
      password: hasPassword,
      isVerifiedEmail: false,
    };
    let result = await User.create(data);

    /* 
    send email with link
    =>generate token
    =>link => frontend link
    =>send Mail 
     */
    let infoObj = {
      _id: result._id,
    };
    let expiryInfo = {
      expiresIn: "5d",
    };
    let token = await jwt.sign(infoObj, secreteKey, expiryInfo);
    // console.log(token);

    //send Mail
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