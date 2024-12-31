import express, { Request, Response, Router } from "express";
import { getContainer, createContainerIfNotExists } from "../db";

const router: Router = express.Router();

router.post("/submit-form", async (req: Request, res: Response): Promise<void> => {
  const formData = req.body;

  if (!formData) {
    res.status(400).json({ message: "Form data is required!" });
    return;
  }

  try {
    console.log("Received form data:", formData);

    // Define the container name as HousingProperty
    const containerName = "HousingProperty";

    // Ensure the container exists
    const container = await createContainerIfNotExists(containerName);

    // Insert the form data into the HousingProperty container
    const { resource } = await container.items.create(formData);

    res.status(201).json({
      message: "Form data submitted successfully",
      data: resource,
    });
  } catch (error: any) {
    console.error("Error saving form data:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Generic CREATE API
router.post("/create", async (req: Request, res: Response): Promise<void> => {
  const { containerName, data }: { containerName: string; data: any } = req.body;

  if (!containerName || !data) {
    res.status(400).json({ message: "Container name and data are required!" });
    return;
  }

  try {
    const container = await createContainerIfNotExists(containerName);
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
  const { containerName, queryTemplate, params } = req.body;

  if (!containerName || !queryTemplate) {
    res.status(400).json({ message: "Container name and query template are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);
    const parsedQuery = {
      query: queryTemplate,
      parameters: params || [],
    };

    const { resources } = await container.items.query(parsedQuery).fetchAll();

    res.status(200).json({ items: resources });
  } catch (error: any) {
    console.error("Error reading items:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Generic UPDATE API
router.put("/update", async (req: Request, res: Response): Promise<void> => {
  const { containerName, id, updateFields } = req.body;

  if (!containerName || !id || !updateFields) {
    res.status(400).json({
      message: "Container name, item ID, and update data are required!",
    });
    return;
  }

  try {
    const container = await getContainer(containerName);
    const { resources: items } = await container.items.query({
      query: "SELECT * FROM c WHERE c.id = @id",
      parameters: [{ name: "@id", value: id }],
    }).fetchAll();

    if (!items.length) {
      res.status(404).json({ message: "Item not found!" });
      return;
    }

    const updatedItem = { ...items[0], ...updateFields };
    const { resource } = await container.items.upsert(updatedItem);

    res.status(200).json({
      message: "Item updated successfully",
      property: resource,
    });
  } catch (error: any) {
    console.error("Error updating item:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Generic DELETE API
router.delete("/delete", async (req: Request, res: Response): Promise<void> => {
  const { containerName, id } = req.body;

  if (!containerName || !id) {
    res.status(400).json({ message: "Container name and item ID are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);
    await container.item(id).delete();

    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting item:", error.message);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default router;
