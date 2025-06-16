import { Request, Response, NextFunction } from "express";
import { CosmosService } from "../services/cosmosService";
import { AppError, BadRequestError } from "../utils/errorHandler"; // Assuming AppError is in errorHandler.ts

const rentalContainer = CosmosService.getRentalContainer(); // Assuming categories are linked to rental items

// Add an item that belongs to a specific category.
// Note: This is very similar to a general addRentalItem.
// Consider if this needs to be distinct or merged.
export const addCategoryItem = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Basic validation, more robust validation should be via express-validator middleware
    const { id, category, name, description, price } = req.body;
    if (!id || !category || !name || !description || !price ) {
        return next(new BadRequestError("Required fields missing: id, category, name, description, price."));
    }

    const newItem = {
      ...req.body, // Assumes body matches the RentalItem structure
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const createdItem = await CosmosService.createItem(rentalContainer, newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    next(error);
  }
};

// Future: Get all distinct category names or category objects if they become separate entities
export const getAllCategories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        // This query fetches distinct category values from your rental_items.
        // Ensure you have an index on 'category' for performance if this is used frequently.
        const querySpec = {
            query: "SELECT DISTINCT c.category FROM c"
        };
        const results = await CosmosService.queryItems(rentalContainer, querySpec);
        const categories = results.map((item: { category: string }) => item.category);
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};