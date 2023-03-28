import { Config } from "./config/config";

let str: string;
str = "check ts-node-dev";
console.log("Hello, TypeScript!", str);

const port = Config.PORT;
console.log("🚀 ~ file: index.ts:8 ~ port:", port);

const frontend_url = Config.FRONTEND_URL;
console.log("🚀 ~ file: index.ts:11 ~ frontend_url:", frontend_url);

const node_env = Config.NODE_ENV;
console.log("🚀 ~ file: index.ts:14 ~ node_env:", node_env);

const db_url = Config.DB_URL;
console.log("🚀 ~ file: index.ts:17 ~ db_url:", db_url);
