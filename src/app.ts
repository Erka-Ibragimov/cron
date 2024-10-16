import * as dotenv from 'dotenv';
import { connectDB } from "./database/db";
import { startCronJob } from "./crons/save-data";
import express, { Express } from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT || 9000;
const app: Express = express();


app.use(json());
app.use(cookieParser());

const startApp = async () => {
  try {
    await connectDB();
    
    startCronJob();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting application:", error);
  }
};

startApp();
