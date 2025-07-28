import { db } from "./dbClient.js";

import { categoryTable } from "./schema/category.schema.js";
import { customizationTable } from "./schema/customization.schema.js";
import { menuItemTable } from "./schema/menu_item.schema.js";
import { menuCustomizationTable } from "./schema/menu_customization.schema.js";

// Categories data
export const categoriesData = [
  {
    name: "Burgers",
    description: "Juicy beef and chicken burgers with fresh toppings",
    image:
      "https://static.vecteezy.com/system/resources/previews/022/911/694/non_2x/cute-cartoon-burger-icon-free-png.png",
  },
  {
    name: "Pizza",
    description: "Hand-tossed pizzas with premium ingredients",
    image:
      "https://static.vecteezy.com/system/resources/previews/038/776/933/non_2x/ai-generated-of-pizza-against-transparent-background-free-png.png",
  },
  {
    name: "Fried Chicken",
    description: "Crispy fried chicken pieces and wings",
    image:
      "https://static.vecteezy.com/system/resources/previews/046/543/481/non_2x/crispy-fried-chicken-in-bucket-free-png.png",
  },
  {
    name: "Sandwiches",
    description: "Fresh sandwiches and wraps made to order",
    image:
      "https://static.vecteezy.com/system/resources/previews/042/654/478/non_2x/ai-generated-grilled-cheese-sandwich-with-melting-cheese-free-png.png",
  },
  {
    name: "Sides",
    description: "Delicious sides and appetizers",
    image:
      "https://static.vecteezy.com/system/resources/previews/065/276/692/non_2x/creamy-mashed-potatoes-with-chives-and-pepper-for-comfort-food-free-png.png",
  },
  {
    name: "Beverages",
    description: "Refreshing drinks and shakes",
    image:
      "https://static.vecteezy.com/system/resources/previews/056/814/702/non_2x/reing-iced-drinks-with-lemon-and-mint-look-cool-and-free-png.png",
  },
  {
    name: "Desserts",
    description: "Sweet treats and ice cream",
    image:
      "https://static.vecteezy.com/system/resources/previews/041/329/757/non_2x/ai-generated-cold-coffee-dessert-cream-chocolate-biscuits-isolated-on-transparent-background-generative-ai-free-png.png",
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

// Menu items data with integer prices (in cents)
export const menuItemsData = [
  // Burgers
  {
    name: "Classic Cheeseburger",
    description: "Beef patty, cheese, lettuce, tomato",
    rating: 4.5,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/067/827/202/non_2x/gourmet-beef-burger-with-thick-flame-grilled-patty-and-fresh-toppings-free-png.png",
    price: 2599, // $25.99
    calories: 550,
    protein: 25,
    category_name: "Burgers",
    customizations: [
      "Extra Cheese",
      "French Fries",
      "Ketchup",
      "Onions",
      "Bacon",
      "Medium",
      "Sesame Bun",
    ],
  },
  {
    name: "BBQ Bacon Burger",
    description: "Beef patty with BBQ sauce, bacon, and crispy onions",
    rating: 4.7,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/041/456/331/large_2x/ai-generated-delicious-bacon-cheeseburger-with-fresh-vegetables-on-transparent-background-free-png.png",
    price: 2899, // $28.99
    calories: 680,
    protein: 32,
    category_name: "Burgers",
    customizations: [
      "Bacon",
      "BBQ Sauce",
      "French Fries",
      "Onions",
      "Large",
      "Brioche Bun",
      "Extra Cheese",
    ],
  },
  {
    name: "Chicken Deluxe Burger",
    description: "Grilled chicken breast with avocado and mayo",
    rating: 4.6,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/057/448/446/non_2x/a-delicious-chicken-breast-burger-topped-with-fresh-vegetables-on-a-toasted-sesame-seed-bun-burger-with-chicken-breast-free-png.png",
    price: 2699, // $26.99
    calories: 520,
    protein: 35,
    category_name: "Burgers",
    customizations: [
      "Avocado",
      "Mayo",
      "Lettuce",
      "Tomato",
      "Medium",
      "Whole Wheat Bun",
      "French Fries",
    ],
  },
  {
    name: "Double Cheeseburger",
    description: "Two beef patties with double cheese and pickles",
    rating: 4.8,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/058/269/747/non_2x/juicy-double-cheeseburger-with-lettuce-tomato-pickles-and-sesame-bun-free-png.png",
    price: 3299, // $32.99
    calories: 890,
    protein: 55,
    category_name: "Burgers",
    customizations: [
      "Extra Cheese",
      "Pickles",
      "Large",
      "Sesame Bun",
      "Onion Rings",
      "BBQ Sauce",
    ],
  },

  // Pizza
  {
    name: "Pepperoni Pizza",
    description: "Loaded with cheese and pepperoni slices",
    rating: 4.7,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/044/771/686/non_2x/a-tasty-pepperoni-pizza-free-png.png",
    price: 3099, // $30.99
    calories: 700,
    protein: 30,
    category_name: "Pizza",
    customizations: [
      "Extra Cheese",
      "Thin Crust",
      "Medium",
      "BBQ Sauce",
      "Mushrooms",
    ],
  },
  {
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, mozzarella and fresh basil",
    rating: 4.4,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/027/144/426/large_2x/margherita-pizza-ai-generated-free-png.png",
    price: 2899, // $28.99
    calories: 620,
    protein: 25,
    category_name: "Pizza",
    customizations: [
      "Extra Cheese",
      "Thin Crust",
      "Small",
      "Garlic Sauce",
      "Tomato",
    ],
  },
  {
    name: "Supreme Pizza",
    description: "Loaded with pepperoni, mushrooms, bell peppers and sausage",
    rating: 4.8,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/041/720/207/large_2x/ai-generated-delicious-pizza-with-pepperoni-mushrooms-and-cheese-on-transparent-background-free-png.png",
    price: 3499, // $34.99
    calories: 850,
    protein: 38,
    category_name: "Pizza",
    customizations: [
      "Extra Cheese",
      "Thick Crust",
      "Large",
      "Mushrooms",
      "Hot Sauce",
    ],
  },
  {
    name: "Hawaiian Pizza",
    description: "Ham and pineapple with mozzarella cheese",
    rating: 4.2,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/036/498/065/non_2x/ai-generated-delicious-hawaiian-pizza-on-transparent-background-free-png.png",
    price: 2999, // $29.99
    calories: 680,
    protein: 28,
    category_name: "Pizza",
    customizations: ["Extra Cheese", "Thin Crust", "Medium", "Ranch", "Bacon"],
  },

  // Fried Chicken
  {
    name: "Original Fried Chicken",
    description: "8-piece bucket of crispy fried chicken",
    rating: 4.6,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/053/486/293/non_2x/crispy-fried-chicken-leg-drumstick-free-png.png",
    price: 2499, // $24.99
    calories: 980,
    protein: 65,
    category_name: "Fried Chicken",
    customizations: [
      "Mild",
      "Coleslaw",
      "Mashed Potatoes",
      "Garlic Sauce",
      "Large",
    ],
  },
  {
    name: "Spicy Buffalo Wings",
    description: "12 buffalo wings with spicy sauce",
    rating: 4.7,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/058/173/685/non_2x/delicious-chicken-wings-coated-in-spicy-sauce-with-fresh-herbs-on-a-transparent-background-tasty-chicken-wings-on-isolated-on-background-free-png.png",
    price: 1999, // $19.99
    calories: 720,
    protein: 45,
    category_name: "Fried Chicken",
    customizations: ["Hot", "Ranch", "Extra Hot", "Medium", "French Fries"],
  },
  {
    name: "Chicken Tenders",
    description: "5 pieces of hand-breaded chicken tenders",
    rating: 4.5,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/068/187/010/non_2x/golden-crispy-fried-chicken-tenders-appetizer-isolated-on-transparent-background-free-png.png",
    price: 1699, // $16.99
    calories: 540,
    protein: 38,
    category_name: "Fried Chicken",
    customizations: ["BBQ Sauce", "Ranch", "French Fries", "Mild", "Medium"],
  },
  {
    name: "Nashville Hot Chicken",
    description: "Crispy chicken with Nashville hot seasoning",
    rating: 4.8,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/066/632/613/non_2x/crispy-fried-chicken-tenders-free-png.png",
    price: 2299, // $22.99
    calories: 680,
    protein: 42,
    category_name: "Fried Chicken",
    customizations: ["Extra Hot", "Coleslaw", "Hot Sauce", "Large", "Pickles"],
  },

  // Sandwiches
  {
    name: "Club Sandwich",
    description: "Triple-decker with turkey, bacon, lettuce, tomato",
    rating: 4.3,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/059/374/399/non_2x/savory-club-sandwich-with-turkey-bacon-lettuce-and-tomato-isolated-on-transparent-background-free-png.png",
    price: 1899, // $18.99
    calories: 620,
    protein: 32,
    category_name: "Sandwiches",
    customizations: [
      "Bacon",
      "Mayo",
      "Lettuce",
      "Tomato",
      "White Bun",
      "French Fries",
    ],
  },
  {
    name: "Grilled Chicken Wrap",
    description: "Grilled chicken with vegetables in tortilla wrap",
    rating: 4.4,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/057/448/497/non_2x/fresh-burritos-with-toppings-on-an-oval-plate-ideal-for-lunch-or-casual-dining-burrito-on-oval-transparent-plate-top-view-isolated-transparent-background-free-png.png",
    price: 1599, // $15.99
    calories: 480,
    protein: 35,
    category_name: "Sandwiches",
    customizations: [
      "Ranch",
      "Lettuce",
      "Tomato",
      "Avocado",
      "Medium",
      "French Fries",
    ],
  },
  {
    name: "Philly Cheesesteak",
    description: "Sliced steak with peppers, onions and cheese",
    rating: 4.6,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/050/277/775/non_2x/grilled-philly-cheesesteak-sandwich-with-onions-and-peppers-free-png.png",
    price: 2199, // $21.99
    calories: 720,
    protein: 38,
    category_name: "Sandwiches",
    customizations: [
      "Extra Cheese",
      "Onions",
      "Mushrooms",
      "Large",
      "French Fries",
      "Mayo",
    ],
  },

  // Sides
  {
    name: "Loaded Fries",
    description: "Crispy fries with cheese, bacon and green onions",
    rating: 4.2,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/057/754/918/non_2x/french-fries-in-a-red-container-with-cheese-and-onions-free-png.png",
    price: 1299, // $12.99
    calories: 450,
    protein: 12,
    category_name: "Sides",
    customizations: ["Extra Cheese", "Bacon", "Ranch", "Medium", "BBQ Sauce"],
  },
  {
    name: "Onion Rings",
    description: "Golden crispy onion rings with dipping sauce",
    rating: 4.1,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/060/119/815/non_2x/delicious-golden-brown-onion-rings-crispy-and-flavorful-free-png.png",
    price: 999, // $9.99
    calories: 380,
    protein: 8,
    category_name: "Sides",
    customizations: ["Ranch", "BBQ Sauce", "Medium", "Ketchup"],
  },
  {
    name: "Mozzarella Sticks",
    description: "6 pieces of breaded mozzarella with marinara",
    rating: 4.3,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/060/119/814/non_2x/delicious-crispy-cheese-sticks-with-marinara-sauce-free-png.png",
    price: 1199, // $11.99
    calories: 520,
    protein: 24,
    category_name: "Sides",
    customizations: ["Garlic Sauce", "Ranch", "Medium", "Hot Sauce"],
  },
  {
    name: "Buffalo Cauliflower",
    description: "Crispy cauliflower wings with buffalo sauce",
    rating: 4.0,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/059/020/038/large_2x/crispy-golden-buffalo-wings-served-a-side-of-creamy-ranch-dip-for-a-spicy-delicious-snack-free-png.png",
    price: 1099, // $10.99
    calories: 280,
    protein: 6,
    category_name: "Sides",
    customizations: ["Hot Sauce", "Ranch", "Medium", "Extra Hot"],
  },

  // Beverages
  {
    name: "Chocolate Milkshake",
    description: "Thick chocolate milkshake with whipped cream",
    rating: 4.5,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/057/174/949/non_2x/indulge-in-a-delicious-chocolate-milkshake-topped-with-whipped-cream-and-chocolate-shavings-on-a-bright-transparent-background-chocolate-milkshake-with-whipped-cream-on-transparent-background-free-png.png",
    price: 899, // $8.99
    calories: 380,
    protein: 8,
    category_name: "Beverages",
    customizations: ["Large", "Medium", "Small"],
  },
  {
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemonade with mint",
    rating: 4.2,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/068/186/345/non_2x/refreshing-glass-jar-drink-with-lemon-slices-mint-leaves-and-ice-cubes-with-a-striped-straw-isolated-on-transparent-background-free-png.png",
    price: 599, // $5.99
    calories: 120,
    protein: 0,
    category_name: "Beverages",
    customizations: ["Large", "Medium", "Small"],
  },
  {
    name: "Iced Coffee",
    description: "Cold brew coffee with milk and sweetener",
    rating: 4.4,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/027/735/650/non_2x/an-iced-coffee-with-whipped-cream-and-a-straw-free-png.png",
    price: 699, // $6.99
    calories: 80,
    protein: 2,
    category_name: "Beverages",
    customizations: ["Large", "Medium", "Small"],
  },
  {
    name: "Strawberry Smoothie",
    description: "Fresh strawberry smoothie with yogurt",
    rating: 4.3,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/059/051/487/non_2x/delicious-strawberry-smoothie-in-a-glass-with-fresh-strawberries-free-png.png",
    price: 799, // $7.99
    calories: 240,
    protein: 6,
    category_name: "Beverages",
    customizations: ["Large", "Medium", "Small"],
  },

  // Desserts
  {
    name: "Chocolate Brownie",
    description: "Warm chocolate brownie with vanilla ice cream",
    rating: 4.6,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/057/672/960/non_2x/chocolate-brownie-topped-with-strawberry-ice-cream-free-png.png",
    price: 999, // $9.99
    calories: 420,
    protein: 6,
    category_name: "Desserts",
    customizations: ["Medium", "Large"],
  },
  {
    name: "Apple Pie",
    description: "Classic apple pie with cinnamon and caramel",
    rating: 4.3,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/068/209/021/non_2x/slice-of-apple-pie-with-whipped-cream-on-transparent-background-free-png.png",
    price: 899, // $8.99
    calories: 350,
    protein: 4,
    category_name: "Desserts",
    customizations: ["Medium", "Large"],
  },
  {
    name: "Cheesecake",
    description: "Creamy New York style cheesecake with berry topping",
    rating: 4.7,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/065/900/564/non_2x/slice-of-decadent-chocolate-cake-rich-frosting-a-tempting-on-transparent-background-free-png.png",
    price: 1099, // $10.99
    calories: 450,
    protein: 8,
    category_name: "Desserts",
    customizations: ["Medium", "Large"],
  },
  {
    name: "Ice Cream Sundae",
    description: "Vanilla ice cream with chocolate sauce and cherry",
    rating: 4.4,
    image_url:
      "https://static.vecteezy.com/system/resources/previews/066/892/444/large_2x/delicious-ice-cream-sundae-with-chocolate-sauce-and-cherry-free-png.png",
    price: 799, // $7.99
    calories: 320,
    protein: 5,
    category_name: "Desserts",
    customizations: ["Medium", "Large", "Small"],
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
      const { category_name, customizations, ...itemData } = item;
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

    // 4. Seed menu customizations using the predefined customizations arrays
    console.log("🔗 Seeding menu customizations...");
    const menuCustomizations = [];

    // Use the customizations array from each menu item
    insertedMenuItems.forEach((menuItem, index) => {
      const originalItem = menuItemsData[index];
      if (originalItem.customizations) {
        originalItem.customizations.forEach((customizationName) => {
          const customization = insertedCustomizations.find(
            (c) => c.name === customizationName
          );
          if (customization) {
            menuCustomizations.push({
              menu_item_id: menuItem.id,
              customization_id: customization.id,
            });
          }
        });
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
