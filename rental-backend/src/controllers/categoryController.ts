// Add an item to a category
import { Request, Response } from "express";
import { CosmosService } from "../services/cosmosService";

const rentalContainer = CosmosService.getRentalContainer();

// Add an item to a category
export const addCategoryItem = async (req: Request, res: Response): Promise<void> => {
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
      ratings, // New field
      rentalType // New field
    } = req.body;

    // Create a new item object
    const newItem = {
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
      ratings, // Add ratings to the object
      rentalType, // Add rentalType to the object
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save the item to the database
    const createdItem = await CosmosService.createItem(rentalContainer, newItem);
    res.status(201).json(createdItem);
  } catch (error) {
    console.error("Error adding category item:", error);
    res.status(500).json({ error: "An error occurred while adding the item." });
  }
};


// Get items by category
export const getItemsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params; // Get category from route params
    const { search, minPrice, maxPrice, ratings, rentalType } = req.query; // Get filters from query params

    let query = "SELECT * FROM c WHERE c.category = @category";
    const parameters: { name: string; value: string | number }[] = [{ name: "@category", value: category }];

    // Add search filter
    if (search) {
      query += " AND CONTAINS(c.name, @search)";
      parameters.push({ name: "@search", value: search as string });
    }

    // Add price range filters
    if (minPrice) {
      query += " AND c.price >= @minPrice";
      parameters.push({ name: "@minPrice", value: Number(minPrice) });
    }
    if (maxPrice) {
      query += " AND c.price <= @maxPrice";
      parameters.push({ name: "@maxPrice", value: Number(maxPrice) });
    }

    // Add ratings filter
    if (ratings) {
      query += " AND c.ratings >= @ratings";
      parameters.push({ name: "@ratings", value: Number(ratings) });
    }

    // Add rentalType filter
    if (rentalType) {
      query += " AND c.rentalType = @rentalType";
      parameters.push({ name: "@rentalType", value: rentalType as string });
    }

    const querySpec = { query, parameters };

    // Execute query against Cosmos DB container
    const items = await CosmosService.queryItems(rentalContainer, querySpec);
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items by category:", error);

    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unknown error occurred" });
    }
  }
};
