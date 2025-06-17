// src/services/orderService.ts
import { CosmosService } from "./cosmosService";
import { ItemService } from "./itemService";
import { CartService } from "./cartService";
import { Order, OrderItem, CartItem } from "../models/rentalModel";
import { AppError, BadRequestError } from "../utils/errorHandler";
import { v4 as uuidv4 } from 'uuid';

const ordersContainer = CosmosService.getOrdersContainer(); // Partition Key: /userId

export const OrderService = {
  async processCheckout(userId: string): Promise<Order> {
    const cartItems: CartItem[] = await CartService.getCart(userId);

    if (!cartItems || cartItems.length === 0) {
      throw new BadRequestError("Your cart is empty. Nothing to checkout.");
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    // 1. Validate stock and prepare order items
    for (const cartItem of cartItems) {
      const availabilityCheck = await ItemService.checkItemAvailability(
        cartItem.productId,
        cartItem.category,
        cartItem.quantity
      );

      if (!availabilityCheck.available || !availabilityCheck.item) {
        throw new AppError(
          `Item "${cartItem.name}" (ID: ${cartItem.productId}) is no longer available in the requested quantity or does not exist. Please remove it from your cart or reduce quantity.`,
          400 // Bad Request, as client should ideally prevent this or re-validate
        );
      }
      // Use current price from the rental item for the order
      const currentPrice = availabilityCheck.item.price;
      totalAmount += currentPrice * cartItem.quantity;

      orderItems.push({
        productId: cartItem.productId,
        name: availabilityCheck.item.name, // Use current name
        price: currentPrice,               // Use current price
        quantity: cartItem.quantity,
        category: availabilityCheck.item.category, // Use current category
        imageUrl: availabilityCheck.item.imageUrl,
      });
    }

    // 2. (Simulate Payment) - In a real app, payment processing happens here.
    console.log(`OrderService: Mock payment successful for user ${userId}, amount ${totalAmount}`);

    // 3. Create the Order document
    const now = new Date().toISOString();
    const newOrder: Order = {
      id: uuidv4(), // Generate a unique order ID
      userId,       // Partition Key
      items: orderItems,
      totalAmount,
      orderDate: now,
      paymentStatus: 'mock_paid',
      createdAt: now,
      updatedAt: now,
    };

    const createdOrder = await CosmosService.createItem(ordersContainer, newOrder) as Order;

    // 4. Adjust stock for each item *after* successful order creation (or payment)
    // This part needs careful error handling. If one stock adjustment fails,
    // the order is created but stock might be inconsistent.
    // For production, consider a more transactional approach or compensating transactions.
    try {
      for (const item of orderItems) {
        await ItemService.adjustItemStock(item.productId, item.category, -item.quantity); // Decrement stock
      }
    } catch (stockError: any) {
      // Log critical error: Order created, but stock adjustment failed. Manual intervention might be needed.
      console.error(
        `CRITICAL: Order ${createdOrder.id} created, but failed to adjust stock for item ${stockError.message_referencing_item_id || 'unknown'}. Error: ${stockError.message}`
      );
      // Depending on policy, you might:
      // - Attempt to flag the order for review.
      // - Attempt to revert payment (if real payment).
      // For now, we'll just log and the order remains.
    }

    // 5. Clear the user's cart
    await CartService.clearCart(userId);

    return createdOrder;
  },

  // Future methods like getOrderById, getUserOrders etc.
  async getOrderById(orderId: string, userId: string): Promise<Order | null> {
    // userId is the partition key
    return CosmosService.getItemById(ordersContainer, orderId, userId) as Promise<Order | null>;
  },

  async getUserOrders(userId: string): Promise<Order[]> {
    const querySpec = {
      query: "SELECT * FROM o WHERE o.userId = @userId ORDER BY o.createdAt DESC",
      parameters: [{ name: "@userId", value: userId }]
    };
    return CosmosService.queryItems(ordersContainer, querySpec) as Promise<Order[]>;
  }
};