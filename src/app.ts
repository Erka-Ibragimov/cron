import { initializeServer } from "./server";
import { connectDB } from "./db";
import { startCronJob } from "./cron";

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectDB();
    startCronJob();
    initializeServer(PORT);
  } catch (error) {
    console.error("Error starting application:", error);
  }
};

startApp();
