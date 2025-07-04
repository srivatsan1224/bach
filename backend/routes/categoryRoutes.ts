
import express, { Request, Response } from "express";

const router = express.Router();

// Get all categories
router.get("/", async (req: Request, res: Response) => {
  try {
    const categories = [
      { id: "1", name: "Electronics", icon: "📱", itemCount: 150 },
      { id: "2", name: "Furniture", icon: "🪑", itemCount: 200 },
      { id: "3", name: "Appliances", icon: "🏠", itemCount: 80 },
      { id: "4", name: "Fitness", icon: "💪", itemCount: 60 }
    ];

    res.status(200).json(categories);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
