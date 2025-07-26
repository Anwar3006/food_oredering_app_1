import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";

import { db } from "../db/dbClient.js"; // your drizzle instance
import * as schema from "../db/schema.js";

export const auth = betterAuth({
  plugins: [expo()],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  trustedOrigins: ["food_ordering_app://", "http://localhost:8081"],
});
