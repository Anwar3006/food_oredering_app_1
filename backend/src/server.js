import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { toNodeHandler } from "better-auth/node";

import { NODE_ENV, PORT, VERSION } from "./config/env.js";
import { db, testDb } from "./db/dbClient.js";
import logger from "./config/logger.js";
import { auth } from "./lib/auth.js";
import { scheduleJob } from "./utils/cronjob.js";
import { globalErrorHandler, notFound } from "./errors/errorHandler.error.js";
import menuItemRouter from "./routes/menuItem.route.js";
import categoryRouter from "./routes/category.route.js";
import addressRouter from "./routes/address.route.js";
import orderRouter from "./routes/order.route.js";
import paymentRouter from "./routes/payment.route.js";

const app = express();

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  // Production: use combined format or disable entirely
  app.use(morgan("combined"));
}

// BetterAuth middleware: mount before json middleware
app.all(`/api/auth/*`, toNodeHandler(auth));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Trigger cronjob only in production
if (NODE_ENV === "production") scheduleJob.start();

//Routes
app.use(`/api/${VERSION}/menu-items`, menuItemRouter);
app.use(`/api/${VERSION}/categories`, categoryRouter);
app.use(`/api/${VERSION}/addresses`, addressRouter);
app.use(`/api/${VERSION}/orders`, orderRouter);
app.use(`/api/${VERSION}/payments`, paymentRouter);

// Healthcheck
app.get(`/api/${VERSION}/health`, (req, res) => {
  res.status(200).json({ status: "healthy" });
});

// Errorhandler Middleware
app.use("*", notFound);
app.use(globalErrorHandler);

// Listen
app.listen(PORT || process.env.PORT, async () => {
  try {
    await testDb();
    logger.info("Database connected successfully");
  } catch (error) {
    logger.error("Database connection failed: ", error);
    process.exit(1);
  }

  if (NODE_ENV === "development") {
    logger.info(
      `Server running in (${NODE_ENV}) on port ${PORT || process.env.PORT}`
    );
  } else {
    logger.info("Application ready🚀");
  }
});
