import { Request, Response } from "express";
import { CosmosService } from "../services/cosmosService";

const cartContainer = CosmosService.getCartContainer();

// Add an item to the cart
export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id, name, price, quantity, category, imageUrl } = req.body;

    // Validate required fields
    if (!id || !name || !price || !quantity || !category || !imageUrl) {
      res.status(400).json({ error: "All fields are required." });
      return;
    }

    const newItem = {
      id,
      name,
      price,
      quantity,
      category,
      imageUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdItem = await CosmosService.createItem(cartContainer, newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "An error occurred while adding the item to the cart." });
  }
};

// Get all items in the cart
export const getCartItems = async (_req: Request, res: Response): Promise<void> => {
  try {
    const querySpec = { query: "SELECT * FROM c" };

    const items = await CosmosService.queryItems(cartContainer, querySpec);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "An error occurred while fetching cart items." });
  }
};

// Remove an item from the cart
export const removeItemFromCart = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params; // Get item ID from route params

    // Use CosmosService to delete the item using id as the partition key
    await CosmosService.deleteItem(cartContainer, id, id); // Pass `id` as both ID and partition key
    return res.status(204).send(); // Respond with 204 No Content if deletion succeeds
  } catch (error) {
    console.error("Error removing item from cart:", error);

    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "An unknown error occurred while removing the item from the cart." });
    }
  }
};
