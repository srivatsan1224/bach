import { Request, Response } from "express";
import { CosmosService } from "../services/cosmosService";

const rentalContainer = CosmosService.getRentalContainer();

// Fetch items by category with filters
export const getItemsByCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.params; // Get category from route params
    const { search, minPrice, maxPrice } = req.query; // Get filters from query params

    let query = "SELECT * FROM c WHERE c.category = @category";
    const parameters: { name: string; value: string }[] = [{ name: "@category", value: category }];

    // Add search filter
    if (search) {
      query += " AND CONTAINS(c.name, @search)";
      parameters.push({ name: "@search", value: search as string });
    }

    // Add price range filter
    if (minPrice) {
      query += " AND c.price >= @minPrice";
      parameters.push({ name: "@minPrice", value: `${minPrice}` });
    }
    if (maxPrice) {
      query += " AND c.price <= @maxPrice";
      parameters.push({ name: "@maxPrice", value: `${maxPrice}` });
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

// Fetch a specific item by ID
export const getItemById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { category } = req.query;

    if (!category) {
      res.status(400).json({ error: "Category is required as the partition key." });
      return;
    }

    const item = await CosmosService.getItemById(rentalContainer, id, category as string);
    //console.log("Fetched Item:", item);
    if (item) {
      res.status(200).json(item);
    } else {
      res.status(404).json({ error: "Item not found." });
    }
  } catch (error) {
    console.error("Error fetching item by ID:", error);
    res.status(500).json({ error: "An error occurred while fetching the item." });
  }
};
