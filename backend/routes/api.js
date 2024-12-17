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
const db_1 = require("../db");
const router = express_1.default.Router();
// Generic CREATE API
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, data } = req.body;
    if (!containerName || !data) {
        res.status(400).json({ message: "Container name and data are required!" });
        return;
    }
    try {
        // Ensure the container exists
        const container = yield (0, db_1.createContainerIfNotExists)(containerName);
        // Create the item in the container
        const { resource } = yield container.items.create(data);
        res.status(201).json({
            message: "Item created successfully",
            item: resource,
        });
    }
    catch (error) {
        console.error("Error creating item:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}));
// Generic READ API
router.post("/read", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, queryTemplate, params, } = req.body;
    if (!containerName || !queryTemplate) {
        res
            .status(400)
            .json({ message: "Container name and query template are required!" });
        return;
    }
    try {
        const parsedQuery = {
            query: queryTemplate,
            parameters: params || [],
        };
        const container = yield (0, db_1.getContainer)(containerName);
        const { resources: items } = yield container.items.query(parsedQuery).fetchAll();
        res.status(200).json({ items });
    }
    catch (error) {
        console.error("Error reading items:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Generic UPDATE API
router.put("/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, id, updateFields } = req.body;
    if (!containerName || !id || !updateFields) {
        res
            .status(400)
            .json({
            message: "Container name, item ID, and update data are required!",
        });
        return;
    }
    try {
        const container = yield (0, db_1.getContainer)(containerName);
        // Query the item
        const { resources: items } = yield container.items
            .query({
            query: "SELECT * FROM c WHERE c.id = @id",
            parameters: [{ name: "@id", value: id }],
        })
            .fetchAll();
        if (items.length === 0) {
            res.status(404).json({ message: "Item not found!" });
            return;
        }
        // Merge existing item with updates
        const updatedItem = Object.assign(Object.assign({}, items[0]), updateFields);
        // Update the item in the database
        const response = yield container.items.upsert(updatedItem);
        const { resource } = response;
        res.status(200).json({
            message: "Item updated successfully",
            property: resource,
        });
    }
    catch (error) {
        console.error("Error updating item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// Generic DELETE API
router.delete("/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { containerName, id } = req.body;
    if (!containerName || !id) {
        res
            .status(400)
            .json({ message: "Container name and item ID are required!" });
        return;
    }
    try {
        const container = yield (0, db_1.getContainer)(containerName);
        yield container.item(id).delete();
        res.status(200).json({ message: "Item deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting item:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.default = router;
