import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  cosmos: {
    endpoint: process.env.COSMOS_DB_ENDPOINT || "",
    key: process.env.COSMOS_DB_KEY || "",
    databaseId: process.env.DATABASE_ID || "",
    containerId: process.env.CONTAINER_ID || "",
  },
  port: process.env.PORT || 3002,
};
