import { Router } from "express";
import { addItemToCart, getCartItems, removeItemFromCart } from "../controllers/cartController";
import { addItemToCartValidators, removeItemFromCartValidators, handleValidationErrors } from "../utils/validators";

const router = Router();

router.post(
    "/",
    addItemToCartValidators,
    handleValidationErrors,
    addItemToCart
);

router.get("/", getCartItems);

router.delete(
    "/:id", // ID of the item in the cart
    removeItemFromCartValidators,
    handleValidationErrors,
    removeItemFromCart
);

export default router;