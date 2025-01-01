import { Router } from "express";
import { addCategoryItem, getItemsByCategory } from "../controllers/categoryController";

const router = Router();

router.post("/", addCategoryItem); // Add item to category
router.get("/:category", getItemsByCategory); // Get items by category

export default router;
