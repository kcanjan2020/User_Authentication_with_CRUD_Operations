import { config } from "dotenv";

config();
export let port = process.env.PORT;
export let dbUrl = process.env.DATABASE_URL;
