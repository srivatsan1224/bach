import { CosmosClient } from "@azure/cosmos";
import { config } from "../config";

const { endpoint, key, databaseId, containerId } = config.cosmos;

if (!endpoint || !key || !databaseId || !containerId) {
  console.error("Missing Cosmos DB configuration in environment variables.");
  process.exit(1);
}

// Initialize Cosmos DB client
const client = new CosmosClient({ endpoint, key });
const database = client.database(databaseId);
const container = database.container(containerId);

(async () => {
  try {
    //console.log("Initializing Cosmos DB...");
    await client.getDatabaseAccount(); // Check connection
    //console.log(`Connected to Cosmos DB: Database - ${databaseId}, Container - ${containerId}`);
  } catch (error) {
    console.error("Failed to connect to Cosmos DB:", error);
    process.exit(1);
  }
})();

export { client, database, container };
