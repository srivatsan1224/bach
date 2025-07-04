
import { Container } from "@azure/cosmos";
import { cosmosClient } from "../utils/dbClient";

const databaseId = "RentalService";
const containerId = "RentalItems";

let rentalContainer: Container;

const initializeContainer = async (): Promise<Container> => {
  if (!rentalContainer) {
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ["/category"] }
    });
    rentalContainer = container;
  }
  return rentalContainer;
};

export const createRentalItem = async (itemData: any): Promise<any> => {
  try {
    const container = await initializeContainer();
    const newItem = {
      id: `rental_${Date.now()}`,
      ...itemData,
      createdDate: new Date().toISOString()
    };
    const { resource } = await container.items.create(newItem);
    return resource;
  } catch (error) {
    console.error("Error creating rental item:", error);
    throw error;
  }
};

export const getAllRentalItems = async (): Promise<any[]> => {
  try {
    const container = await initializeContainer();
    const { resources } = await container.items.readAll().fetchAll();
    return resources;
  } catch (error) {
    console.error("Error fetching rental items:", error);
    throw error;
  }
};

export const getRentalItemById = async (itemId: string): Promise<any | null> => {
  try {
    const container = await initializeContainer();
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @itemId",
      parameters: [{ name: "@itemId", value: itemId }]
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.length > 0 ? resources[0] : null;
  } catch (error) {
    console.error("Error fetching rental item by ID:", error);
    throw error;
  }
};

export const updateRentalItem = async (itemId: string, updateData: any): Promise<any | null> => {
  try {
    const container = await initializeContainer();
    const existingItem = await getRentalItemById(itemId);
    
    if (!existingItem) {
      return null;
    }

    const updatedItem = { ...existingItem, ...updateData };
    const { resource } = await container.item(itemId, existingItem.category).replace(updatedItem);
    return resource;
  } catch (error) {
    console.error("Error updating rental item:", error);
    throw error;
  }
};

export const deleteRentalItem = async (itemId: string): Promise<boolean> => {
  try {
    const container = await initializeContainer();
    const existingItem = await getRentalItemById(itemId);
    
    if (!existingItem) {
      return false;
    }

    await container.item(itemId, existingItem.category).delete();
    return true;
  } catch (error) {
    console.error("Error deleting rental item:", error);
    throw error;
  }
};
