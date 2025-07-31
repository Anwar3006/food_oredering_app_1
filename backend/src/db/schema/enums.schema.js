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

const REGION = [
  "Greater Accra",
  "Ahafo",
  "Eastern",
  "Northern",
  "Upper East",
  "Upper West",
  "Volta",
  "Western",
  "Central",
];
export const regionEnum = pgEnum("region", REGION);

const ADDRESS_TYPE = ["home", "work", "other"];
export const addressTypeEnum = pgEnum("address_type", ADDRESS_TYPE);
