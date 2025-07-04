
import { CosmosClient } from "@azure/cosmos";
import dotenv from "dotenv";

dotenv.config();

const endpoint = process.env.COSMOS_DB_ENDPOINT || "https://bachelors.documents.azure.com:443/";
const key = process.env.COSMOS_DB_KEY || "0Zd3B6ssDdIa0YkE9NymkNLRB6A6NEYo59Etf7ZvnhQWYEWjJEf4H6i3Q4smPEJJeC0Ygx8tqHqdACDbZGmYXA==";

export const cosmosClient = new CosmosClient({ endpoint, key });
