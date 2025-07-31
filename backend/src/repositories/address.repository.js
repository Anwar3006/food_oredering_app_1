import { eq, sql } from "drizzle-orm";

import { db } from "../db/dbClient.js";
import { address } from "../db/schema/address.schema.js";

export const AddressRepository = {
  addAddress: async (data) => {
    const newAddress = await db.insert(address).values(data).returning();
    return newAddress[0] || null;
  },

  getAllAddressForUser: async (user_id) => {
    const addressForUser = await db
      .select()
      .from(address)
      .where(eq(address.userId, user_id));
    return addressForUser[0] || null;
  },

  updateAddress: async (id, data) => {
    const updatedAddress = await db
      .update(address)
      .set({ ...data, updatedAt: sql`now()` })
      .where(eq(address.id, id))
      .returning();
    return updatedAddress[0] || null;
  },

  deleteAddress: async (id) => {
    const deletedAddress = await db
      .delete(address)
      .where(eq(address.id, id))
      .returning();
    return deletedAddress[0] || null;
  },
};
