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

    //get user address
    // const addresses = await AddressRepository.getAllAddressForUser(userId);

    const totalAmountPayable =
      totalPrice + deliveryFee + taxAmount - discountAmount;

    const orderData = {
      userId,
      orderNumber,
      deliveryAddressId: 2,
      subtotal: totalPrice,
      deliveryFee: deliveryFee || 0,
      taxAmount: taxAmount || 0,
      discountAmount: discountAmount || 0,
      totalAmount: totalAmountPayable,
      specialInstructions: specialInstructions || "",
    };

    console.log("Order Data: ", JSON.stringify(orderData, null, 2));

    const orderItemArray = items.map((item) => {
      const customizationSubtotal =
        item.customizations?.reduce((total, cus) => {
          const price = cus.customization?.price || 0;
          const quantity = cus.quantity || 1;
          return total + price * quantity;
        }, 0) || 0;

      //item subtotal
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

    return {
      orderNumber: orderReturned.order.orderNumber,
      status: orderReturned.order.status,
      subtotal: orderReturned.order.subtotal,
      deliveryFee: orderReturned.order.deliveryFee,
      taxAmount: orderReturned.order.taxAmount,
      discountAmount: orderReturned.order.discountAmount,

      totalAmount: orderReturned.order.totalAmount,
      totalItems: totalItems,
    };
  },

  updateOrder: async (id, data) => {
    return await OrderRepository.updateOrder(id, data);
  },
};
