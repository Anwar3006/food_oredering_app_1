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

const ORDER_STATUS = [
  "pending",
  "confirmed",
  "preparing",
  "ready",
  "out_for_delivery",
  "delivered",
  "cancelled",
  "refunded"
];
export const orderStatusEnum = pgEnum("order_status", ORDER_STATUS);

const PAYMENT_METHOD = [
  "card",
  "mobile_money",
  "cash_on_delivery",
  "bank_transfer"
];
export const paymentMethodEnum = pgEnum("payment_method", PAYMENT_METHOD);

const PAYMENT_STATUS = [
  "pending",
  "processing",
  "completed",
  "failed",
  "cancelled",
  "refunded"
];
export const paymentStatusEnum = pgEnum("payment_status", PAYMENT_STATUS);
