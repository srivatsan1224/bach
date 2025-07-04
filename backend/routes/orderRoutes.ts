
import express, { Request, Response } from "express";

const router = express.Router();

// Create new order
router.post("/", async (req: Request, res: Response) => {
  try {
    const order = {
      id: Date.now().toString(),
      ...req.body,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    res.status(201).json({ message: "Order created successfully", order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get orders for user
router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    // Mock data - replace with actual service
    const orders = [
      {
        id: "1",
        userId,
        items: [{ itemId: "1", itemName: "MacBook Pro", quantity: 1, price: 2000 }],
        total: 2000,
        status: "delivered",
        createdAt: "2024-01-15T10:00:00Z"
      }
    ];

    res.status(200).json(orders);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
