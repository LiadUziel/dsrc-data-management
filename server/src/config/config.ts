import { config } from "dotenv";

config(); // read from .env file, insert to process.env

export class Config {
  /**
   * node environment
   * @example 'local' | 'prod'
   * @default 'local'
   */
  public static NODE_ENV = process.env.NODE_ENV || "local";

  /**
   * express port
   * @default 3000
   */
  public static PORT = Number(process.env.PORT) || 3000;

  /**
   * Mongodb url
   * @example mongodb://localhost:27017/sample_db
   */ // TODO - add db url
  public static DB_URL = process.env.DB_URL;

  /**
   * @example http://localhost:4200
   */
  public static FRONTEND_URL =
    process.env.NODE_ENV?.toLowerCase() === "local"
      ? process.env.FRONTEND_URL_LOCAL
      : process.env.FRONTEND_URL_PROD;
}
