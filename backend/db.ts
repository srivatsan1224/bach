import { CosmosClient, Container, Database, PartitionKeyDefinition, PartitionKeyKind } from "@azure/cosmos";
import config from "./config";

// Initialize Cosmos Client
const client = new CosmosClient({
  endpoint: config.endpoint,
  key: config.key,
});

const databaseId: string = config.database.id;
const database: Database = client.database(databaseId);

// Function to get the container dynamically based on the container name passed
export async function getContainer(containerName: string): Promise<Container> {
  if (!containerName) {
    throw new Error("Container name is required!");
  }

  try {
    const container = database.container(containerName);
    return container;
  } catch (error) {
    console.error("Error getting container:", error);
    throw new Error("Failed to retrieve container");
  }
}

// Function to create a container dynamically if it doesn't exist
export async function createContainerIfNotExists(
  containerName: string
): Promise<Container> {
  if (!containerName) {
    throw new Error("Container name is required!");
  }

  try {
    // Correctly define the partition key
    const partitionKey: PartitionKeyDefinition = { 
      paths: ["/email"], 
      kind: PartitionKeyKind.Hash // Use the PartitionKeyKind enum
    };

    const { container } = await database.containers.createIfNotExists({
      id: containerName,
      partitionKey, // Specify the partition key
    });

    return container;
  } catch (error) {
    console.error(`Failed to create or access container '${containerName}':`, error);
    throw new Error(`Failed to ensure container '${containerName}' exists`);
  }
}

// Function to setup database and containers
export async function setupDatabaseAndContainer(): Promise<void> {
  try {
    await client.databases.createIfNotExists({ id: databaseId });
    console.log("Database is ready.");

    const containerNames: string[] = ["Users"];
    for (const containerName of containerNames) {
      try {
        await createContainerIfNotExists(containerName);
      } catch (error) {
        console.error(`Failed to create container '${containerName}':`, error);
      }
    }
  } catch (error) {
    console.error("Error setting up database:", error);
    throw new Error("Database setup failed");
  }
}
