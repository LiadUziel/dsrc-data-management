import mongoose from "mongoose";
import { Config } from "./config";

const connectDB = async () => {
  try {
    const MONGO_URL = Config.DB_URL!;

    const conn = await mongoose.connect(MONGO_URL);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
