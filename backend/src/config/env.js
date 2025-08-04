import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const {
  VERSION,
  NODE_ENV,
  PORT,
  DATABASE_URL,
  SERVER_URL,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLISHABLE_KEY,
} = process.env;
