import { Request, Response } from "express";
import { CosmosService } from "../services/cosmosService";

const rentalContainer = CosmosService.getRentalContainer(); // Get rental container

export const addRentalItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      id, 
      category, 
      name, 
      description, 
      price, 
      originalPrice, 
      discount, 
      availability, 
      imageUrl, 
      specifications, 
      offers, 
      ratings, 
      rentalType 
    } = req.body;

    // Validate required fields
    if (!category || !name || !description || !price || !availability) {
      res.status(400).json({ error: "Missing required fields: category, name, description, price, availability." });
      return;
    }

    // Create a new rental item object with the exact structure you provided
    const newItem = {
      id: `${category.substring(0, 3)}-${new Date().getTime()}`, // Generate ID if not provided
      category,
      name,
      description,
      price,
      originalPrice: originalPrice || price, // Default to price if originalPrice not provided
      discount: discount || 0,
      availability,
      imageUrl: imageUrl || "",
      specifications: specifications || {}, // Ensure empty object if not provided
      offers: offers || [],
      ratings: ratings || 0,
      rentalType: rentalType || "short-term",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to Cosmos DB
    const createdItem = await CosmosService.createItem(rentalContainer, newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error adding rental item:", error);
    res.status(500).json({ error: "An error occurred while adding the rental item." });
  }
};
