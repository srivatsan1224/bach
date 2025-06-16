import { Request, Response, NextFunction } from "express";
import { CosmosService } from "../services/cosmosService";
import { AppError, NotFoundError, BadRequestError } from "../utils/errorHandler";
import { RentalItem } from "../models/rentalModel"; // Assuming RentalItem interface is defined

const rentalContainer = CosmosService.getRentalContainer();

// Helper to decide if contact info should be shown (currently always true for mock)
const shouldShowContactInfo = (_req: Request): boolean => {
  // TODO: Replace with actual authentication check
  // For now, always return true as if user is authenticated
  return true;
};

// Function to selectively include contact info
const G_rental_item_with_contact_info = (item: RentalItem | any, showContact: boolean): Partial<RentalItem> => {
    if (!item) return {};
    const { ownerContactInfo, ...restOfItem } = item;
    if (showContact && ownerContactInfo) {
        return { ...restOfItem, ownerContactInfo };
    }
    return restOfItem;
};


export const filterItemsByCriteria = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { categoryName } = req.params;
    const { search, minPrice, maxPrice, ratings, rentalType } = req.query;

    if (!categoryName) {
        return next(new BadRequestError("Category name parameter is required."));
    }

    let query = "SELECT * FROM c WHERE c.category = @categoryName";
    const parameters: { name: string; value: string | number }[] = [
      { name: "@categoryName", value: categoryName as string },
    ];

    if (search) {
      query += " AND CONTAINS(LOWER(c.name), LOWER(@search))";
      parameters.push({ name: "@search", value: search as string });
    }
    if (minPrice) {
      query += " AND c.price >= @minPrice";
      parameters.push({ name: "@minPrice", value: Number(minPrice) });
    }
    if (maxPrice) {
      query += " AND c.price <= @maxPrice";
      parameters.push({ name: "@maxPrice", value: Number(maxPrice) });
    }
    if (ratings) {
      query += " AND c.ratings >= @ratings";
      parameters.push({ name: "@ratings", value: Number(ratings) });
    }
    if (rentalType) {
      query += " AND c.rentalType = @rentalType";
      parameters.push({ name: "@rentalType", value: rentalType as string });
    }

    const querySpec = { query, parameters };
    const items: RentalItem[] = await CosmosService.queryItems(rentalContainer, querySpec);

    const showContact = shouldShowContactInfo(req);
    const processedItems = items.map(item => G_rental_item_with_contact_info(item, showContact));

    res.status(200).json(processedItems);
  } catch (error) {
    next(error);
  }
};

export const getItemById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    const { category } = req.query; // Partition key

    if (!category) {
      return next(new BadRequestError("Category query parameter (partitionKey) is required."));
    }
    if (!id) {
        return next(new BadRequestError("Item ID parameter is required."));
    }

    const item: RentalItem | null = await CosmosService.getItemById(rentalContainer, id, category as string);

    if (!item) {
      return next(new NotFoundError("Item not found."));
    }

    const showContact = shouldShowContactInfo(req);
    const processedItem = G_rental_item_with_contact_info(item, showContact);

    res.status(200).json(processedItem);
  } catch (error) {
    next(error);
  }
};

// ... (Other item CRUD methods will be added here later)
// For example, when adding/updating an item, you'd allow `ownerContactInfo` to be set.