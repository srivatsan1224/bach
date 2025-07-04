
import express, { Request, Response } from "express";
import { createRentalItem, getAllRentalItems, getRentalItemById, updateRentalItem, deleteRentalItem } from "../services/rentalService";

const router = express.Router();

// Create rental item
router.post("/items", async (req: Request, res: Response) => {
  try {
    const item = await createRentalItem(req.body);
    res.status(201).json({ message: "Rental item created successfully", item });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all rental items
router.get("/items", async (req: Request, res: Response) => {
  try {
    const items = await getAllRentalItems();
    res.status(200).json(items);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get rental item by ID
router.get("/items/:id", async (req: Request, res: Response) => {
  try {
    const item = await getRentalItemById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Rental item not found" });
    }
    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Update rental item
router.put("/items/:id", async (req: Request, res: Response) => {
  try {
    const updatedItem = await updateRentalItem(req.params.id, req.body);
    if (!updatedItem) {
      return res.status(404).json({ message: "Rental item not found" });
    }
    res.status(200).json({ message: "Rental item updated successfully", item: updatedItem });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete rental item
router.delete("/items/:id", async (req: Request, res: Response) => {
  try {
    const success = await deleteRentalItem(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Rental item not found" });
    }
    res.status(200).json({ message: "Rental item deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
