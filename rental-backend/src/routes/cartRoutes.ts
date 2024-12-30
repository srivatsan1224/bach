import { Router } from "express";
import { addItemToCart, getCartItems, removeItemFromCart } from "../controllers/cartController";

const router = Router();

// Add an item to the cart
router.post("/", addItemToCart);

// Get all cart items
router.get("/", getCartItems);

// Remove an item from the cart
router.delete("/:id", async (req, res) => {
  await removeItemFromCart(req, res);
});

export default router;
