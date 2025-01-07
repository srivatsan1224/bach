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
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cosmos_1 = require("@azure/cosmos");
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = 5000;
app.use(body_parser_1.default.json());
// Azure Cosmos DB Configuration
const client = new cosmos_1.CosmosClient({
    endpoint: process.env.COSMOS_ENDPOINT || '',
    key: process.env.COSMOS_KEY || '',
});
const databaseId = process.env.DATABASE_ID || 'Bachelors';
const restaurantsContainerId = 'Restaurants';
const foodItemsContainerId = 'FoodItems';
// Create a new restaurant
app.post('/api/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, phone, rating, image } = req.body;
    try {
        const { database } = yield client.databases.createIfNotExists({ id: databaseId });
        const { container } = yield database.containers.createIfNotExists({ id: restaurantsContainerId });
        const { resource } = yield container.items.create({ name, address, phone, rating, image });
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// List all restaurants
app.get('/api/restaurants', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { database } = yield client.databases.createIfNotExists({ id: databaseId });
        const { container } = yield database.containers.createIfNotExists({ id: restaurantsContainerId });
        const { resources } = yield container.items.readAll().fetchAll();
        res.status(200).json(resources);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Add a food item to a restaurant
app.post('/api/restaurants/:id/food', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, ingredients, cost, rating, image } = req.body;
    try {
        const { database } = yield client.databases.createIfNotExists({ id: databaseId });
        const { container } = yield database.containers.createIfNotExists({ id: foodItemsContainerId });
        const { resource } = yield container.items.create({
            restaurantId: id,
            name,
            ingredients,
            cost,
            rating,
            image,
        });
        res.status(201).json(resource);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Get food items for a restaurant
app.get('/api/restaurants/:id/food', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const { database } = yield client.databases.createIfNotExists({ id: databaseId });
        const { container } = yield database.containers.createIfNotExists({ id: foodItemsContainerId });
        const querySpec = {
            query: 'SELECT * FROM c WHERE c.restaurantId = @id',
            parameters: [{ name: '@id', value: id }],
        };
        const { resources } = yield container.items.query(querySpec).fetchAll();
        res.status(200).json(resources);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
