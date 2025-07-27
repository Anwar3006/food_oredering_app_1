import cron from "cron";
import https from "https";

import logger from "../config/logger.js";
import { SERVER_URL, VERSION } from "../config/env.js";

export const scheduleJob = new cron.CronJob("*/14 * * * *", () => {
  https.get(`${SERVER_URL}/api/${VERSION}/health`, (res) => {
    res
      .on("data", () => {
        logger.info("Cron job ran successfully💚✅");
      })
      .on("error", (err) => {
        logger.error("Cron job failed❌", err);
      });
  });
});
