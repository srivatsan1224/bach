"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getContainer = getContainer;
exports.createContainerIfNotExists = createContainerIfNotExists;
exports.setupDatabaseAndContainer = setupDatabaseAndContainer;
const cosmos_1 = require("@azure/cosmos");
const config_1 = __importDefault(require("./config"));
// Initialize Cosmos Client
const client = new cosmos_1.CosmosClient({
    endpoint: config_1.default.endpoint,
    key: config_1.default.key,
});
const databaseId = config_1.default.database.id;
const database = client.database(databaseId);
// Function to get the container dynamically based on the container name passed
function getContainer(containerName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!containerName) {
            throw new Error("Container name is required!");
        }
        try {
            const container = database.container(containerName);
            return container;
        }
        catch (error) {
            console.error("Error getting container:", error);
            throw new Error("Failed to retrieve container");
        }
    });
}
// Function to create a container dynamically if it doesn't exist
function createContainerIfNotExists(containerName) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!containerName) {
            throw new Error("Container name is required!");
        }
        try {
            // Correctly define the partition key
            const partitionKey = {
                paths: ["/email"],
                kind: cosmos_1.PartitionKeyKind.Hash // Use the PartitionKeyKind enum
            };
            const { container } = yield database.containers.createIfNotExists({
                id: containerName,
                partitionKey, // Specify the partition key
            });
            return container;
        }
        catch (error) {
            console.error(`Failed to create or access container '${containerName}':`, error);
            throw new Error(`Failed to ensure container '${containerName}' exists`);
        }
    });
}
// Function to setup database and containers
function setupDatabaseAndContainer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.databases.createIfNotExists({ id: databaseId });
            console.log("Database is ready.");
            const containerNames = ["Users", "properties"];
            for (const containerName of containerNames) {
                try {
                    yield createContainerIfNotExists(containerName);
                }
                catch (error) {
                    console.error(`Failed to create container '${containerName}':`, error);
                }
            }
        }
        catch (error) {
            console.error("Error setting up database:", error);
            throw new Error("Database setup failed");
        }
    });
}
