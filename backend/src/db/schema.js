// User, Account and Session Schema will be provisioned by BetterAuth and automatically added to the database

export { customizationTypeEnum } from "./schema/enums.schema.js";

export { user, account, session, verification } from "./schema/auth-schema.js";
export { categoryTable } from "./schema/category.schema.js";
export { customizationTable } from "./schema/customization.schema.js";
export { menuItemTable } from "./schema/menu_item.schema.js";
export { menuCustomizationTable } from "./schema/menu_customization.schema.js";

export * as relations from "./relations.js";
