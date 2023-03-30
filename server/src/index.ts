import cors from "cors";
import express from "express";
import { Config } from "./config/config";
import { errorHandler } from "./controllers/error.controller";

let str: string;
str = "check ts-node-dev";
console.log("Hello, TypeScript!", str);

const PORT = Config.PORT;
const appName = process.env.npm_package_name;

const frontend_url = Config.FRONTEND_URL;

const node_env = Config.NODE_ENV;

const db_url = Config.DB_URL;

const app = express();

// Cors
app.use(cors());

// Express body parser
app.use(express.json());

// 'Hello Express' endpoint - //* http://localhost:3000/api
app.use("/api", async (req, res, next) => {
  try {
    console.log("🚀 ~ file: index.ts:30 ~ app.use ~ req.body:", req.body);
    // throw new Error("EROROROROROR");
    return res.send("Hello Express");
  } catch (err) {
    next(err);
  }
});

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
