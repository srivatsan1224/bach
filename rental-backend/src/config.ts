import * as dotenv from "dotenv";

dotenv.config();

interface AppConfig {
  nodeEnv: string;
  port: number;
  cosmosDbEndpoint: string;
  cosmosDbKey: string;
  cosmosDbDatabaseId: string;
  cosmosDbRentalContainerId: string;
  cosmosDbCartContainerId: string;
  cosmosDbOrdersContainerId: string; // Added for future order management
  corsAllowedOrigins: string[];
}

const parseCorsOrigins = (origins?: string): string[] => {
  if (!origins) {
    return ["http://localhost:3000", "http://localhost:5174"]; // Default development origins
  }
  return origins.split(',').map(origin => origin.trim());
};

const config: AppConfig = {
  nodeEnv: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "5000", 10),
  cosmosDbEndpoint: process.env.COSMOS_DB_ENDPOINT || "",
  cosmosDbKey: process.env.COSMOS_DB_KEY || "",
  cosmosDbDatabaseId: process.env.COSMOS_DB_DATABASE_ID || "Bachelors",
  cosmosDbRentalContainerId: process.env.COSMOS_DB_RENTAL_CONTAINER_ID || "rental_items",
  cosmosDbCartContainerId: process.env.COSMOS_DB_CART_CONTAINER_ID || "cart",
  cosmosDbOrdersContainerId: process.env.COSMOS_DB_ORDERS_CONTAINER_ID || "orders",
  corsAllowedOrigins: parseCorsOrigins(process.env.CORS_ALLOWED_ORIGINS),
};

if (!config.cosmosDbEndpoint || !config.cosmosDbKey) {
  console.error("FATAL ERROR: Cosmos DB Endpoint or Key is not defined in .env file.");
  //process.exit(1); // Exit if essential DB config is missing
}

export default config;