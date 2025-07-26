import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

import { NODE_ENV, PORT, VERSION } from "./config/env.js";
import { db, testDb } from "./db/dbClient.js";
import logger from "./config/logger.js";
import { auth } from "./lib/auth.js";

const app = express();

app.use(morgan("dev"));

// BetterAuth middleware: mount before json middleware
app.all(`/api/${VERSION}/auth/*`, toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes

// Healthcheck
app.get(`/api/${VERSION}/health`, (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Errorhandler Middleware

// Listen
app.listen(PORT, async () => {
  try {
    await testDb();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed: ", error);
    process.exit(1);
  }
  logger.info(`Server running in (${NODE_ENV}) on port ${PORT}`);
});
