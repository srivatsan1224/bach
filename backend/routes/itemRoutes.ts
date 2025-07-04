
import express, { Request, Response } from "express";

const router = express.Router();

// Get all items
router.get("/", async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    // Mock data - replace with actual service
    const items = [
      {
        id: "1",
        name: "MacBook Pro",
        category: "electronics",
        price: 2000,
        description: "High-performance laptop",
        image: "macbook.jpg",
        available: true
      },
      {
        id: "2",
        name: "Office Chair",
        category: "furniture",
        price: 200,
        description: "Ergonomic office chair",
        image: "chair.jpg",
        available: true
      }
    ];

    const filteredItems = category 
      ? items.filter(item => item.category === category)
      : items;

    res.status(200).json(filteredItems);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get item by ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    // Mock data - replace with actual service
    const item = {
      id,
      name: "MacBook Pro",
      category: "electronics",
      price: 2000,
      description: "High-performance laptop for professional use",
      images: ["macbook1.jpg", "macbook2.jpg"],
      specifications: {
        processor: "M2 Pro",
        memory: "16GB",
        storage: "512GB SSD"
      },
      available: true,
      rentalTerms: "Minimum 1 month rental"
    };

    res.status(200).json(item);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
