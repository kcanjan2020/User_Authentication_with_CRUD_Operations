import { config } from "dotenv";

config();
export let port = process.env.PORT;
export let dbUrl = process.env.DATABASE_URL;
export let secreteKey = process.env.SECRETE_KEY;
export let user_email = process.env.USER_EMAIL;
export let userEmail_Password = process.env.USER_EMAIL_PASSWORD;