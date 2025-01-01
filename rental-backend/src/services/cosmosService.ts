import { CosmosClient } from "@azure/cosmos";
import * as dotenv from "dotenv";

dotenv.config();

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT!,
  key: process.env.COSMOS_DB_KEY!,
});

const database = client.database("Bachelors");
const rentalContainer = database.container("rental_items");
const cartContainer = database.container("cart"); // Add cart container

export const CosmosService = {
  getRentalContainer: () => rentalContainer,
  getCartContainer: () => cartContainer, // Add method to get the cart container

  // Fetch a single item by ID and category
  getItemById: async (container: any, id: string, category: string) => {
    try {
      const { resource } = await container.item(id, category).read();
      return resource;
    } catch (error) {
      console.error(`Error fetching item with ID ${id} and category ${category}:`, error);
      return null;
    }
  },

  // Query items
  queryItems: async (container: any, querySpec: any) => {
    try {
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error) {
      console.error("Error querying items:", error);
      return [];
    }
  },

  // Create a new item
  createItem: async (container: any, newItem: any) => {
    try {
      const { resource } = await container.items.create(newItem);
      return resource;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  },

  // Delete an item by ID and partition key
  deleteItem: async (container: any, id: string, partitionKey: string) => {
    try {
      await container.item(id, partitionKey).delete();
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },
};
