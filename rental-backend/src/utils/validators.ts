import { body, param, query, validationResult, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AppError, BadRequestError } from "./errorHandler";

// Middleware to handle validation results
export const handleValidationErrors = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(err => `${(err as any).path || (err as any).param}: ${err.msg}`).join(', ');
    return next(new BadRequestError(`Validation failed: ${errorMessages}`));
  }
  next();
};

// --- Cart Validators ---
export const addItemToCartValidators: ValidationChain[] = [
  body("id").isString().notEmpty().withMessage("Item ID must be a non-empty string."),
  body("name").isString().notEmpty().withMessage("Item name must be a non-empty string."),
  body("price").isNumeric().withMessage("Price must be a number.").toFloat(),
  body("quantity").isNumeric().isInt({ min: 1 }).withMessage("Quantity must be an integer greater than 0.").toInt(),
  body("category").isString().notEmpty().withMessage("Category must be a non-empty string."),
  body("imageUrl").optional().isURL().withMessage("Image URL must be a valid URL."),
]; // handleValidationErrors will be applied in the route

export const removeItemFromCartValidators: ValidationChain[] = [
  param("id").isString().notEmpty().withMessage("Item ID in path must be a non-empty string."),
];

// --- Item/Rental Item Validators ---
const baseItemValidators: ValidationChain[] = [
  body("name").isString().notEmpty().withMessage("Item name must be a non-empty string."),
  body("category").isString().notEmpty().withMessage("Category must be a non-empty string."),
  body("description").isString().notEmpty().withMessage("Description must be a non-empty string."),
  body("price").isNumeric().withMessage("Price must be a number.").toFloat(),
  body("originalPrice").optional().isNumeric().withMessage("Original price must be a number.").toFloat(),
  body("discount").optional().isNumeric().withMessage("Discount must be a number.").toFloat(),
  body("availability")
    .isIn([true, false, "available", "rented", "maintenance"])
    .withMessage("Availability must be a boolean or one of: available, rented, maintenance."),
  body("imageUrl").optional().isURL().withMessage("Image URL must be a valid URL."),
  body("specifications").optional().isObject().withMessage("Specifications must be an object."),
  body("offers").optional().isArray().withMessage("Offers must be an array.")
    .custom((offersArray: any[]) => offersArray.every(offer => typeof offer === 'string'))
    .withMessage("Each offer must be a string."),
  body("ratings").optional().isNumeric().isFloat({ min: 0, max: 5 }).withMessage("Ratings must be a number between 0 and 5.").toFloat(),
  body("rentalType").optional().isIn(["short-term", "long-term", "event"]).withMessage("Invalid rentalType. Must be short-term, long-term, or event."),
];

export const addRentalItemValidators: ValidationChain[] = [
  body("id").optional().isString().withMessage("ID, if provided, must be a string."),
  ...baseItemValidators,
];

// Used by itemController for adding items directly (might be similar to rental items)
export const addItemValidators: ValidationChain[] = [
    body("id").isString().notEmpty().withMessage("Item ID must be a non-empty string."),
    ...baseItemValidators,
];


export const getItemByIdValidators: ValidationChain[] = [
  param("id").isString().notEmpty().withMessage("Item ID in path must be a non-empty string."),
  query("category").isString().notEmpty().withMessage("Category query parameter is required and must be a string."),
];

// Validator for the consolidated getItemsByCategory
export const filterItemsValidators: ValidationChain[] = [
  param("categoryName").isString().notEmpty().withMessage("Category name in path must be a non-empty string."), // If using /category/:categoryName
  // If using query param for category: query("category").isString().notEmpty().withMessage("Category query parameter is required."),
  query("search").optional().isString().withMessage("Search query must be a string."),
  query("minPrice").optional().isNumeric().withMessage("Minimum price must be a number.").toFloat(),
  query("maxPrice").optional().isNumeric().withMessage("Maximum price must be a number.").toFloat(),
  query("ratings").optional().isNumeric().isFloat({ min: 0, max: 5 }).withMessage("Ratings must be a number between 0 and 5.").toFloat(),
  query("rentalType").optional().isIn(["short-term", "long-term", "event"]).withMessage("Invalid rentalType."),
];