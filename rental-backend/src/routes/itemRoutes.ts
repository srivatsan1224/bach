import * as express from "express";
import { getItemsByCategory, getItemById } from "../controllers/itemController";

const router = express.Router();

// Fetch items by category with filters
router.get("/category/:category", async (req, res, next) => {
  try {
    await getItemsByCategory(req, res); // Handles fetching items by category with optional filters
  } catch (error) {
    next(error);
  }
});

// Fetch a specific item by ID (requires `category` as a query parameter)
router.get("/:id", async (req, res, next) => {
  try {
    await getItemById(req, res); // Fetch item by ID and category
  } catch (error) {
    next(error);
  }
});


export default router;
