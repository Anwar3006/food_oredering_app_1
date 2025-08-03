import { AddressRepository } from "../repositories/address.repository.js";
import { OrderRepository } from "../repositories/order.repository.js";

export const generateOrderNumber = (orderLength) => {
  const year = new Date().getFullYear();
  const prefix = "ORD";
  const suffix = orderLength.toString().padStart(8, "0");

  return `${prefix}-${year}-${suffix}`;
};

export const calculateTotalOrderAmount = (order, customizationTotal) => {
  const { totalItems, totalPrice, deliveryFee, discountAmount, taxAmount } =
    order;
  const totalAmount =
    Number(totalPrice) +
    Number(customizationTotal) +
    Number(deliveryFee) +
    Number(taxAmount) -
    Number(discountAmount);
  return totalAmount;
};

export const OrderService = {
  createOrder: async (order) => {
    const {
      userId,
      items,
      totalItems,
      totalPrice,
      deliveryFee,
      discountAmount,
      taxAmount,
      specialInstructions,
    } = order;

    const orderNumber = generateOrderNumber(await OrderRepository.orderCount());

    // Calculate customization totals for all items
    const customizationTotal = items.reduce((sum, item) => {
      const itemCustomizationTotal =
        item.customizations?.reduce((total, cus) => {
          return total + (cus.customization?.price || 0) * (cus.quantity || 1);
        }, 0) || 0;
      return sum + itemCustomizationTotal * item.quantity;
    }, 0);

    //get user address
    // const addresses = await AddressRepository.getAllAddressForUser(userId);

    const orderData = {
      userId,
      orderNumber,
      deliveryAddressId: 2,
      subtotal: totalPrice + customizationTotal,
      deliveryFee: deliveryFee || 0,
      taxAmount: taxAmount || 0,
      discountAmount: discountAmount || 0,
      totalAmount: calculateTotalOrderAmount(order, customizationTotal),
      specialInstructions: specialInstructions || "",
    };

    const orderItemArray = items.map((item) => {
      const customizationSubtotal =
        item.customizations?.reduce((total, cus) => {
          const price = cus.customization?.price || 0;
          const quantity = cus.quantity || 1;
          return total + price * quantity;
        }, 0) || 0;

      //item subtotal
      console.log("customizationSubtotal: ", customizationSubtotal);
      const itemSubtotal = (item.price + customizationSubtotal) * item.quantity;

      return {
        menuItemId: item.menuItemId,
        itemName: item.name,
        itemPrice: item.price,
        quantity: item.quantity,
        customizations: item.customizations,
        subtotal: itemSubtotal,
      };
    });

    const orderReturned = await OrderRepository.createOrder(
      orderData,
      orderItemArray
    );
    console.log("order: ", order);

    return orderReturned;
  },
};
