import nodemailer from "nodemailer";
import { user_email, userEmail_Password } from "../../config.js";
let transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: user_email,
    pass: userEmail_Password,
  },
};

export let sendMail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo); //
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
