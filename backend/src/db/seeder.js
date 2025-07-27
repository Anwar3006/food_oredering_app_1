import { db } from "./db/dbClient.js";
import {
  categoryTable,
  customizationTable,
  menuItemTable,
  menuCustomizationTable,
} from "./schema/index.js";

// Categories data
export const categoriesData = [
  {
    name: "Burgers",
    description: "Juicy beef and chicken burgers with fresh toppings",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
  },
  {
    name: "Pizza",
    description: "Hand-tossed pizzas with premium ingredients",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
  },
  {
    name: "Fried Chicken",
    description: "Crispy fried chicken pieces and wings",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
  },
  {
    name: "Sandwiches",
    description: "Fresh sandwiches and wraps made to order",
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400",
  },
  {
    name: "Sides",
    description: "Delicious sides and appetizers",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
  },
  {
    name: "Beverages",
    description: "Refreshing drinks and shakes",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",
  },
  {
    name: "Desserts",
    description: "Sweet treats and ice cream",
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
  },
];

// Customizations data
export const customizationsData = [
  // Burger customizations
  { name: "Extra Cheese", price: 150, type: "topping" },
  { name: "Bacon", price: 200, type: "topping" },
  { name: "Avocado", price: 180, type: "topping" },
  { name: "Mushrooms", price: 100, type: "topping" },
  { name: "Onions", price: 50, type: "topping" },
  { name: "Pickles", price: 30, type: "topping" },
  { name: "Lettuce", price: 25, type: "topping" },
  { name: "Tomato", price: 40, type: "topping" },

  // Sizes
  { name: "Small", price: 0, type: "size" },
  { name: "Medium", price: 150, type: "size" },
  { name: "Large", price: 300, type: "size" },
  { name: "Extra Large", price: 450, type: "size" },

  // Pizza specific
  { name: "Thin Crust", price: 0, type: "crust" },
  { name: "Thick Crust", price: 100, type: "crust" },
  { name: "Stuffed Crust", price: 200, type: "crust" },

  // Sauces
  { name: "Ketchup", price: 25, type: "sauce" },
  { name: "Mayo", price: 25, type: "sauce" },
  { name: "BBQ Sauce", price: 30, type: "sauce" },
  { name: "Hot Sauce", price: 20, type: "sauce" },
  { name: "Ranch", price: 35, type: "sauce" },
  { name: "Garlic Sauce", price: 30, type: "sauce" },

  // Sides
  { name: "French Fries", price: 250, type: "side" },
  { name: "Onion Rings", price: 300, type: "side" },
  { name: "Coleslaw", price: 200, type: "side" },
  { name: "Mashed Potatoes", price: 220, type: "side" },

  // Bread types
  { name: "White Bun", price: 0, type: "bread" },
  { name: "Whole Wheat Bun", price: 50, type: "bread" },
  { name: "Sesame Bun", price: 30, type: "bread" },
  { name: "Brioche Bun", price: 100, type: "bread" },

  // Spice levels
  { name: "Mild", price: 0, type: "spice" },
  { name: "Medium", price: 0, type: "spice" },
  { name: "Hot", price: 0, type: "spice" },
  { name: "Extra Hot", price: 50, type: "spice" },
];

// Menu items data
export const menuItemsData = [
  // Burgers
  {
    name: "Classic Beef Burger",
    description:
      "Juicy beef patty with lettuce, tomato, onion and our special sauce",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    price: 899,
    calories: 650,
    protein: 35,
    category_name: "Burgers",
  },
  {
    name: "Chicken Deluxe",
    description:
      "Grilled chicken breast with avocado, bacon and ranch dressing",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1606755456206-1f6ac2d83671?w=400",
    price: 1099,
    calories: 580,
    protein: 40,
    category_name: "Burgers",
  },
  {
    name: "Double Cheeseburger",
    description:
      "Two beef patties with double cheese, pickles and special sauce",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551615593-502f644c91bd?w=400",
    price: 1299,
    calories: 890,
    protein: 55,
    category_name: "Burgers",
  },

  // Pizza
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella and fresh basil",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    price: 1199,
    calories: 720,
    protein: 28,
    category_name: "Pizza",
  },
  {
    name: "Pepperoni Supreme",
    description:
      "Loaded with pepperoni, mushrooms, bell peppers and extra cheese",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
    price: 1499,
    calories: 850,
    protein: 35,
    category_name: "Pizza",
  },
  {
    name: "BBQ Chicken Pizza",
    description: "Grilled chicken with BBQ sauce, red onions and cilantro",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?w=400",
    price: 1399,
    calories: 780,
    protein: 42,
    category_name: "Pizza",
  },

  // Fried Chicken
  {
    name: "Original Fried Chicken",
    description: "8-piece bucket of our signature crispy fried chicken",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400",
    price: 1899,
    calories: 1200,
    protein: 80,
    category_name: "Fried Chicken",
  },
  {
    name: "Spicy Wings",
    description: "12 buffalo wings with your choice of spice level",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1527477396000-e27163b481c2?w=400",
    price: 1299,
    calories: 720,
    protein: 45,
    category_name: "Fried Chicken",
  },
  {
    name: "Chicken Tenders",
    description: "5 pieces of hand-breaded chicken tenders with dipping sauce",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=400",
    price: 999,
    calories: 540,
    protein: 38,
    category_name: "Fried Chicken",
  },

  // Sandwiches
  {
    name: "Club Sandwich",
    description: "Triple-decker with turkey, bacon, lettuce, tomato and mayo",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1553909489-cd47e0ef937f?w=400",
    price: 799,
    calories: 620,
    protein: 32,
    category_name: "Sandwiches",
  },
  {
    name: "Grilled Chicken Wrap",
    description:
      "Grilled chicken with vegetables and ranch wrapped in tortilla",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400",
    price: 899,
    calories: 480,
    protein: 35,
    category_name: "Sandwiches",
  },

  // Sides
  {
    name: "Loaded Fries",
    description: "Crispy fries topped with cheese, bacon bits and green onions",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400",
    price: 599,
    calories: 450,
    protein: 12,
    category_name: "Sides",
  },
  {
    name: "Onion Rings",
    description: "Golden crispy onion rings with tangy dipping sauce",
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=400",
    price: 499,
    calories: 380,
    protein: 8,
    category_name: "Sides",
  },
  {
    name: "Mozzarella Sticks",
    description: "6 pieces of breaded mozzarella with marinara sauce",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?w=400",
    price: 699,
    calories: 520,
    protein: 24,
    category_name: "Sides",
  },

  // Beverages
  {
    name: "Chocolate Milkshake",
    description:
      "Thick and creamy chocolate milkshake topped with whipped cream",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400",
    price: 499,
    calories: 380,
    protein: 8,
    category_name: "Beverages",
  },
  {
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with mint",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400",
    price: 299,
    calories: 120,
    protein: 0,
    category_name: "Beverages",
  },
  {
    name: "Iced Coffee",
    description: "Cold brew coffee with your choice of milk and sweetener",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=400",
    price: 399,
    calories: 80,
    protein: 2,
    category_name: "Beverages",
  },

  // Desserts
  {
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with vanilla ice cream",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400",
    price: 599,
    calories: 420,
    protein: 6,
    category_name: "Desserts",
  },
  {
    name: "Apple Pie",
    description: "Classic apple pie with cinnamon and caramel sauce",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=400",
    price: 499,
    calories: 350,
    protein: 4,
    category_name: "Desserts",
  },
];

// Function to seed all data
export async function seedDatabase() {
  try {
    console.log("🌱 Starting database seeding...");

    // 1. Seed categories
    console.log("📂 Seeding categories...");
    const insertedCategories = await db
      .insert(categoryTable)
      .values(categoriesData)
      .returning();
    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // 2. Seed customizations
    console.log("🔧 Seeding customizations...");
    const insertedCustomizations = await db
      .insert(customizationTable)
      .values(customizationsData)
      .returning();
    console.log(`✅ Inserted ${insertedCustomizations.length} customizations`);

    // 3. Seed menu items with category IDs
    console.log("🍔 Seeding menu items...");
    const menuItemsWithCategoryIds = menuItemsData.map((item) => {
      const category = insertedCategories.find(
        (cat) => cat.name === item.category_name
      );
      const { category_name, ...itemData } = item;
      return {
        ...itemData,
        category_id: category.id,
      };
    });

    const insertedMenuItems = await db
      .insert(menuItemTable)
      .values(menuItemsWithCategoryIds)
      .returning();
    console.log(`✅ Inserted ${insertedMenuItems.length} menu items`);

    // 4. Seed menu customizations (linking menu items with their available customizations)
    console.log("🔗 Seeding menu customizations...");
    const menuCustomizations = [];

    // Add relevant customizations to each menu item
    insertedMenuItems.forEach((menuItem) => {
      const category = insertedCategories.find(
        (cat) => cat.id === menuItem.category_id
      );

      // Add size options to most items
      if (!["Beverages", "Desserts"].includes(category.name)) {
        const sizeCustomizations = insertedCustomizations.filter(
          (c) => c.type === "size"
        );
        sizeCustomizations.forEach((size) => {
          menuCustomizations.push({
            menu_item_id: menuItem.id,
            customization_id: size.id,
          });
        });
      }

      // Add specific customizations based on category
      switch (category.name) {
        case "Burgers":
          // Add toppings, bread, and sauce options
          const burgerCustomizations = insertedCustomizations.filter((c) =>
            ["topping", "bread", "sauce", "side"].includes(c.type)
          );
          burgerCustomizations.forEach((custom) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: custom.id,
            });
          });
          break;

        case "Pizza":
          // Add crust, toppings, and size options
          const pizzaCustomizations = insertedCustomizations.filter((c) =>
            ["crust", "topping", "sauce"].includes(c.type)
          );
          pizzaCustomizations.forEach((custom) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: custom.id,
            });
          });
          break;

        case "Fried Chicken":
          // Add spice levels and sides
          const chickenCustomizations = insertedCustomizations.filter((c) =>
            ["spice", "sauce", "side"].includes(c.type)
          );
          chickenCustomizations.forEach((custom) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: custom.id,
            });
          });
          break;

        case "Sandwiches":
          // Add bread, toppings, and sauces
          const sandwichCustomizations = insertedCustomizations.filter((c) =>
            ["bread", "topping", "sauce", "side"].includes(c.type)
          );
          sandwichCustomizations.forEach((custom) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: custom.id,
            });
          });
          break;

        case "Sides":
          // Add sauce options
          const sideCustomizations = insertedCustomizations.filter(
            (c) => c.type === "sauce"
          );
          sideCustomizations.forEach((custom) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: custom.id,
            });
          });
          break;

        case "Beverages":
          // Add size options for beverages
          const beverageSizes = insertedCustomizations.filter(
            (c) =>
              c.type === "size" && ["Small", "Medium", "Large"].includes(c.name)
          );
          beverageSizes.forEach((size) => {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: size.id,
            });
          });
          break;
      }
    });

    if (menuCustomizations.length > 0) {
      await db.insert(menuCustomizationTable).values(menuCustomizations);
      console.log(
        `✅ Inserted ${menuCustomizations.length} menu customization relationships`
      );
    }

    console.log("🎉 Database seeding completed successfully!");

    return {
      categories: insertedCategories.length,
      customizations: insertedCustomizations.length,
      menuItems: insertedMenuItems.length,
      menuCustomizations: menuCustomizations.length,
    };
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

// Run seeding if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  seedDatabase()
    .then((results) => {
      console.log("📊 Seeding results:", results);
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}
