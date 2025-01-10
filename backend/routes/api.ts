import express, { Request, Response, Router } from "express";
import multer from "multer";
import { BlobServiceClient } from "@azure/storage-blob";
import {
  getContainer,
  createContainerIfNotExists,
  getHousingPropertyContainer,
  createPropertyListing,
  getUserProperties,
  updatePropertyListing,
  deletePropertyListing,
} from "../db";

const router: Router = express.Router();
import dotenv from "dotenv";
dotenv.config();


// Environment variable
const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING || "";
const CONTAINER_NAME = "property-photos";

if (!AZURE_STORAGE_CONNECTION_STRING) {
  throw new Error("Azure Storage connection string is required.");
}

// Initialize BlobServiceClient
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);

// Configure multer for in-memory file uploads
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload-photos", upload.array("photos"), async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      res.status(400).json({ message: "No files uploaded" });
      return;
    }

    const filePaths: string[] = [];
    const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

    // Ensure the container exists
    await containerClient.createIfNotExists({
      access: "container",
    });

    // Upload files to Azure Blob Storage
    for (const file of req.files as Express.Multer.File[]) {
      const blobName = `${Date.now()}-${file.originalname}`;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      // Upload the file
      await blockBlobClient.uploadData(file.buffer);

      const blobUrl = blockBlobClient.url;
      filePaths.push(blobUrl);
    }

    const { email, propertyId } = req.body;

    if (!email || !propertyId) {
      res.status(400).json({ message: "Email and propertyId are required to associate photos" });
      return;
    }

    const housingPropertyContainer = await getHousingPropertyContainer();

    // Retrieve the existing property
    const { resource: existingProperty } = await housingPropertyContainer
      .item(propertyId, email)
      .read();

    if (!existingProperty) {
      res.status(404).json({ message: "Property not found" });
      return;
    }

    // Update the gallery with new photo paths
    const updatedProperty = {
      ...existingProperty,
      gallery: {
        ...(existingProperty.gallery || {}),
        photos: [...(existingProperty.gallery?.photos || []), ...filePaths],
      },
    };

    const { resource: updatedResource } = await housingPropertyContainer
      .item(propertyId, email)
      .replace(updatedProperty);

    console.log("Property updated with photos:", updatedResource);

    res.status(200).json({
      message: "Photos uploaded and added to property successfully",
      photos: filePaths,
      updatedProperty: updatedResource,
    });
  } catch (error: any) {
    console.error("Error uploading photos:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});


// Submit new property form
router.post("/submit-form", async (req: Request, res: Response): Promise<void> => {
  try {
    const formData = req.body;

    if (!formData || !formData.email) {
      res.status(400).json({ message: "Form data with a valid email is required!" });
      return;
    }

    const email = formData.email;

    // Store form data in the HousingProperty container
    const housingPropertyContainer = await getHousingPropertyContainer();

    const documentId = `${email}-${Date.now()}`;
    const newDocument = {
      id: documentId,
      email, // Partition key
      ...formData,
    };

    const { resource } = await housingPropertyContainer.items.create(newDocument);
    console.log("Form data stored successfully:", resource);

    // Additionally create a property listing
    const property = await createPropertyListing(email, formData);

    res.status(201).json({
      message: "Form data and property listing stored successfully",
      data: { formData: resource, property },
    });
  } catch (error: any) {
    console.error("Error processing form submission:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Get user's properties
router.get("/properties/:email", async (req: Request, res: Response): Promise<void> => {
  try {
    const { email } = req.params;
    console.log(`Fetching properties for email: ${email}`);

    if (!email) {
      res.status(400).json({ message: "Email is required!" });
      return;
    }

    const properties = await getUserProperties(email);
    console.log(`Properties retrieved:`, properties);

    if (!properties || properties.length === 0) {
      res.status(404).json({ message: `No properties found for email: ${email}` });
      return;
    }

    res.status(200).json({ properties });
  } catch (error: any) {
    console.error("Error retrieving properties:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Upload multiple photos


// Update property
router.put("/property/:propertyId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const { email, ...updateData } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required!" });
      return;
    }

    const updatedProperty = await updatePropertyListing(propertyId, email, updateData);
    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error: any) {
    console.error("Error updating property:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete property
router.delete("/property/:propertyId", async (req: Request, res: Response): Promise<void> => {
  try {
    const { propertyId } = req.params;
    const { email } = req.body;

    if (!email) {
      res.status(400).json({ message: "Email is required!" });
      return;
    }

    await deletePropertyListing(propertyId, email);
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting property:", error.message);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
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

export default router;