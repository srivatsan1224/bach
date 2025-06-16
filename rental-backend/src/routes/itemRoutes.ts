import * as express from "express";
import { filterItemsByCriteria, getItemById } from "../controllers/itemController";
import { filterItemsValidators, getItemByIdValidators, handleValidationErrors } from "../utils/validators"; // Import validators

const router = express.Router();

// Fetch items by category with filters. Example: /api/item/filter/Electronics?search=tv&minPrice=100
router.get(
    "/filter/:categoryName", // categoryName is a route parameter
    filterItemsValidators,    // Apply validation rules
    handleValidationErrors,   // Middleware to handle any validation errors
    filterItemsByCriteria
);

// Fetch a specific item by ID (requires `category` as a query parameter for partition key)
// Example: /api/item/some-item-id?category=Electronics
router.get(
    "/:id",
    getItemByIdValidators,
    handleValidationErrors,
    getItemById
);

// We will add POST, PUT, DELETE routes here later for CRUD operations

export default router;