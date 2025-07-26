import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";

import { db } from "../db/dbClient.js"; // your drizzle instance

export const auth = betterAuth({
  plugins: [expo()],
  emailAndPassword: {
    enabled: true,
  },
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  trustedOrigins: ["food_ordering_app://", "http://localhost:8081"],
});
