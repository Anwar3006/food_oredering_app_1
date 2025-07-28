import cron from "cron";
import https from "https";

import logger from "../config/logger.js";
import { SERVER_URL, VERSION } from "../config/env.js";

export const scheduleJob = new cron.CronJob("*/14 * * * *", () => {
  https.get(`${SERVER_URL}/api/${VERSION}/health`, (res) => {
    res
      .on("end", () => {
        if (res.statusCode === 200) {
          logger.info("✅ Cron job health check successful", {
            statusCode: res.statusCode,
            timestamp: new Date().toISOString(),
            response: data,
          });
        } else {
          logger.warn("⚠️ Health check returned non-200 status", {
            statusCode: res.statusCode,
            response: data,
          });
        }
      })
      .on("error", (err) => {
        logger.error("❌ Cron job health check failed", {
          error: err.message,
          code: err.code,
          timestamp: new Date().toISOString(),
        });
      });
  });
});
