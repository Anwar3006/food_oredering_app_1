import { eq } from "drizzle-orm";

import { db } from "../db/dbClient.js";
import { user } from "../db/schema/auth-schema.js";
import { address } from "../db/schema/address.schema.js";
import logger from "../config/logger.js";

export const UserRepository = {
  getUserById: async (id) => {
    try {
      const userData = await db
        .select({
          id: user.id,
          name: user.name,
          email: user.email,
        })
        .from(user)
        .where(eq(user.id, id));

      if (!userData.length) return null;

      const userAddresses = await db
        .select()
        .from(address)
        .where(eq(address.userId, id));

      const result = {
        ...userData[0],
        addresses: userAddresses,
      };
      return result;
    } catch (error) {
      logger.error("Error in get user by id: ", error);
    }
  },
};
