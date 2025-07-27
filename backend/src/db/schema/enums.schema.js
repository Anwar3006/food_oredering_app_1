import { pgEnum } from "drizzle-orm/pg-core";

const CUSTOM_TYPES = [
  "topping",
  "size",
  "side",
  "crust",
  "bread",
  "spice",
  "base",
  "sauce",
];
export const customizationTypeEnum = pgEnum("customization_type", CUSTOM_TYPES);
