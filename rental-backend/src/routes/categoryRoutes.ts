import { Router } from "express";
import { addCategoryItem, getAllCategories } from "../controllers/categoryController";
import { addItemValidators, handleValidationErrors } from "../utils/validators"; // Assuming a generic addItem validator for now

const router = Router();

// Route to add an item to a category (or more generally, add an item which has a category field)
router.post(
    "/", // Endpoint: /api/category
    addItemValidators, // Use appropriate validators for adding an item
    handleValidationErrors,
    addCategoryItem
);

// Route to get all distinct category names
router.get(
    "/", // Endpoint: /api/category
    getAllCategories
);


export default router;