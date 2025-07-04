
import express, { Request, Response } from "express";

const router = express.Router();

// Get all restaurants
router.get("/restaurants", async (req: Request, res: Response) => {
  try {
    // Mock data for now - replace with actual database calls
    const restaurants = [
      {
        id: "1",
        name: "Tasty Bites",
        cuisine: "Indian",
        rating: 4.5,
        deliveryTime: "30-45 mins",
        image: "https://example.com/restaurant1.jpg"
      },
      {
        id: "2",
        name: "Pizza Corner",
        cuisine: "Italian",
        rating: 4.2,
        deliveryTime: "25-40 mins",
        image: "https://example.com/restaurant2.jpg"
      }
    ];
    res.status(200).json(restaurants);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get restaurant by ID
router.get("/restaurants/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // Mock data - replace with actual database call
    const restaurant = {
      id,
      name: "Tasty Bites",
      cuisine: "Indian",
      rating: 4.5,
      deliveryTime: "30-45 mins",
      menu: [
        { id: "1", name: "Chicken Biryani", price: 250, category: "Main Course" },
        { id: "2", name: "Paneer Butter Masala", price: 200, category: "Main Course" }
      ]
    };
    res.status(200).json(restaurant);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Place food order
router.post("/orders", async (req: Request, res: Response) => {
  try {
    const order = {
      id: Date.now().toString(),
      ...req.body,
      status: "confirmed",
      orderTime: new Date().toISOString()
    };
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
