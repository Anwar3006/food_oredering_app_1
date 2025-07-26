import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { DATABASE_URL } from "../config/env.js";

const sql = neon(DATABASE_URL);
export const db = drizzle({ client: sql });

export const testDb = async () => {
  try {
    const result = await db.execute("SELECT 1");
    return result === 1 ? true : false;
  } catch (error) {
    throw new Error("Failed to connect to the database: ", error.message);
  }
};
