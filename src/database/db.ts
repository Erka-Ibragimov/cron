import * as dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

export const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL!;

  try {
    await mongoose.connect(mongoUrl);
  } catch (error) {
    console.error("Ошибка подключения к MongoDB", error);
    process.exit(1);
  }
};
