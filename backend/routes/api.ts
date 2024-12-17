import express, { Request, Response, Router } from "express";
import { getContainer, createContainerIfNotExists } from "../db";

const router: Router = express.Router();

// Generic CREATE API
router.post("/create", async (req: Request, res: Response): Promise<void> => {
  const { containerName, data }: { containerName: string; data: any } = req.body;

  if (!containerName || !data) {
    res.status(400).json({ message: "Container name and data are required!" });
    return;
  }

  try {
    // Ensure the container exists
    const container = await createContainerIfNotExists(containerName);

    // Create the item in the container
    const { resource } = await container.items.create(data);

    res.status(201).json({
      message: "Item created successfully",
      item: resource,
    });
  } catch (error: any) {
    console.error("Error creating item:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Generic READ API
router.post("/read", async (req: Request, res: Response): Promise<void> => {
  const {
    containerName,
    queryTemplate,
    params,
  }: { containerName: string; queryTemplate: string; params?: Array<{ name: string; value: any }> } = req.body;

  if (!containerName || !queryTemplate) {
    res
      .status(400)
      .json({ message: "Container name and query template are required!" });
    return;
  }

  try {
    const parsedQuery = {
      query: queryTemplate,
      parameters: params || [],
    };

    const container = await getContainer(containerName);
    const { resources: items } = await container.items.query(parsedQuery).fetchAll();

    res.status(200).json({ items });
  } catch (error: any) {
    console.error("Error reading items:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generic UPDATE API
router.put("/update", async (req: Request, res: Response): Promise<void> => {
  const { containerName, id, updateFields }: { containerName: string; id: string; updateFields: any } = req.body;

  if (!containerName || !id || !updateFields) {
    res
      .status(400)
      .json({
        message: "Container name, item ID, and update data are required!",
      });
    return;
  }

  try {
    const container = await getContainer(containerName);

    // Query the itemiub
    const { resources: items } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [{ name: "@id", value: id }],
      })
      .fetchAll();

    if (items.length === 0) {
      res.status(404).json({ message: "Item not found!" });
      return;
    }

    // Merge existing item with updates
    const updatedItem = { ...items[0], ...updateFields };

    // Update the item in the database
    const response = await container.items.upsert(updatedItem);

    const { resource } = response;
    res.status(200).json({
      message: "Item updated successfully",
      property: resource,
    });
  } catch (error: any) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generic DELETE API
router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
  const { containerName, id }: { containerName: string; id: string } = req.body;

  if (!containerName || !id) {
    res
      .status(400)
      .json({ message: "Container name and item ID are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);
    await container.item(id).delete();
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
