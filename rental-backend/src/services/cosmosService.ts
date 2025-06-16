import { CosmosClient, Container } from "@azure/cosmos";
import config from "../config"; // Use centralized config

const client = new CosmosClient({
  endpoint: config.cosmosDbEndpoint,
  key: config.cosmosDbKey,
});

const database = client.database(config.cosmosDbDatabaseId);

const getContainer = (containerId: string): Container => {
  return database.container(containerId);
};

export const CosmosService = {
  getRentalContainer: () => getContainer(config.cosmosDbRentalContainerId),
  getCartContainer: () => getContainer(config.cosmosDbCartContainerId),
  getOrdersContainer: () => getContainer(config.cosmosDbOrdersContainerId), // For future use

  getItemById: async (container: Container, id: string, partitionKey: string) => {
    try {
      const { resource } = await container.item(id, partitionKey).read();
      return resource;
    } catch (error: any) {
      if (error.code === 404) return null; // Item not found
      console.error(`Error fetching item with ID ${id} and partition key ${partitionKey}:`, error.message);
      throw error; // Re-throw to be handled by error middleware
    }
  },

  queryItems: async (container: Container, querySpec: any) => {
    try {
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error: any) {
      console.error("Error querying items:", error.message);
      throw error;
    }
  },

  createItem: async (container: Container, newItem: any) => {
    try {
      const { resource } = await container.items.create(newItem);
      return resource;
    } catch (error: any) {
      console.error("Error creating item:", error.message);
      throw error;
    }
  },

  deleteItem: async (container: Container, id: string, partitionKey: string) => {
    try {
      await container.item(id, partitionKey).delete();
    } catch (error: any) {
      if (error.code === 404) throw new Error(`Item with ID ${id} not found for deletion.`); // More specific
      console.error(`Error deleting item with ID ${id}:`, error.message);
      throw error;
    }
  },

  // Add updateItem method (will be used later in CRUD)
  updateItem: async (container: Container, id: string, partitionKey: string, itemUpdates: Partial<any>) => {
    try {
        const { resource: existingItem } = await container.item(id, partitionKey).read();
        if (!existingItem) {
            return null; // Or throw NotFoundError
        }
        // Merge updates with existing item
        const updatedItem = { ...existingItem, ...itemUpdates, updatedAt: new Date().toISOString() };
        const { resource } = await container.item(id, partitionKey).replace(updatedItem);
        return resource;
    } catch (error: any) {
        if (error.code === 404) return null;
        console.error(`Error updating item with ID ${id}:`, error.message);
        throw error;
    }
  },
};