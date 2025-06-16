import { Request, Response, NextFunction } from "express";
import { CosmosService } from "../services/cosmosService";
import { AppError, BadRequestError, NotFoundError } from "../utils/errorHandler";

const cartContainer = CosmosService.getCartContainer(); // Partition Key should be /userId
const DEFAULT_MOCK_USER_ID = "default-mock-user"; // Hardcoded mock user ID

export const addItemToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = DEFAULT_MOCK_USER_ID; // Use hardcoded mock user ID

    const { id: productId, name, price, quantity, category, imageUrl } = req.body;

    if (!productId || !name || price === undefined || quantity === undefined || !category) {
        return next(new BadRequestError("Required fields missing for cart item: productId, name, price, quantity, category."));
    }

    const cartItemId = `${userId}-${productId}`; // Example composite ID for cart item

    const newItem = {
      id: cartItemId,       // Unique ID for the cart item (within this user's partition)
      userId: userId,       // PARTITION KEY
      productId,            // Reference to the actual product
      name,
      price,
      quantity,
      category,
      imageUrl: imageUrl || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
        const createdItem = await CosmosService.createItem(cartContainer, newItem);
        res.status(201).json(createdItem);
    } catch (error: any) {
        if (error.code === 409) { // Conflict - item already exists
            return next(new AppError("Item already in cart. Use update quantity endpoint.", 409));
        }
        throw error;
    }
  } catch (error) {
    next(error);
  }
};

export const getCartItems = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = DEFAULT_MOCK_USER_ID; // Use hardcoded mock user ID

    const querySpec = {
      query: "SELECT * FROM c WHERE c.userId = @userId",
      parameters: [{ name: "@userId", value: userId }]
    };
    const items = await CosmosService.queryItems(cartContainer, querySpec);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

export const removeItemFromCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = DEFAULT_MOCK_USER_ID; // Use hardcoded mock user ID
    const { cartItemId } = req.params;

    if(!cartItemId) {
        return next(new BadRequestError("Cart item ID parameter is required."));
    }

    await CosmosService.deleteItem(cartContainer, cartItemId, userId); // userId is the partitionKey
    res.status(204).send();
  } catch (error: any) {
    if (error instanceof NotFoundError || (error.message && error.message.includes("not found for deletion"))) {
        return next(new NotFoundError("Cart item not found."));
    }
    next(error);
  }
};

export const updateCartItemQuantity = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = DEFAULT_MOCK_USER_ID;
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        if (!cartItemId) {
            next(new BadRequestError("Cart item ID parameter is required."));
            return; // Add a simple return to exit the function
        }
        if (quantity === undefined || typeof quantity !== 'number' || quantity < 0) {
            next(new BadRequestError("Valid quantity (number >= 0) is required."));
            return; // Add a simple return
        }

        if (quantity === 0) {
            await CosmosService.deleteItem(cartContainer, cartItemId, userId);
            res.status(204).send();
            return; // Add a simple return
        }

        const updatedItem = await CosmosService.updateItem(cartContainer, cartItemId, userId, { quantity, updatedAt: new Date().toISOString() });

        if (!updatedItem) {
            next(new NotFoundError("Cart item not found or could not be updated."));
            return; // Add a simple return
        }
        res.status(200).json(updatedItem);
        // No explicit return needed here as it's the end of the try block's successful path
    } catch (error) {
        next(error);
        // No explicit return needed here either
    }
};