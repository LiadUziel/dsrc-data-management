import cors from "cors";
import express from "express";
import { Config } from "./config/config";
import { errorHandler } from "./controllers/error.controller";
import connectDB from "./config/db-config";
import authRouter from "./routes/auth.route";

let str: string;
str = "check ts-node-dev";
console.log("Hello, TypeScript!", str);

const PORT = Config.PORT;
const appName = process.env.npm_package_name;

const frontend_url = Config.FRONTEND_URL;

const node_env = Config.NODE_ENV;

const app = express();

// Cors
app.use(cors());

// Express body parser
app.use(express.json());

// connect to mongoDB
connectDB();

app.use("/api/auth", authRouter);

// Error handler
app.use(errorHandler);

async function main() {
  try {
    app.listen(PORT, () =>
      console.log(`App '${appName}' is running on port ${PORT}`)
    );
  } catch (err) {
    console.error(err);
  }
}

main();
