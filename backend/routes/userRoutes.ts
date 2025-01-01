import express, { Request, Response, Router } from "express";
import { getContainer } from "../db";
import crypto from "crypto";

const router: Router = express.Router();

// Function to generate a unique ID using SHA-256 hash
function generateUniqueId(email: string): string {
  return crypto.createHash("sha256").update(email).digest("hex");
}

// API to handle signup with an array of usera
router.post("/signup", async (req: Request, res: Response): Promise<void> => {
  const {
    containerName,
    users,
  }: { containerName: string; users: Array<Record<string, any>> } = req.body; // Expect `users` as an array

  console.log("Request Body:", req.body);
  console.log("Users Array:", req.body.users);

  if (!containerName || !Array.isArray(users)) {
    res
      .status(400)
      .json({ message: "Container name and an array of users are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);
    const results: Array<{ email: string; status: string; userId?: string; message?: string }> = [];

    for (const user of users) {
      const {
        username,
        password,
        name,
        age,
        gender,
        address,
        city,
        state,
        pincode,
        mobileNumber,
        email,
      } = user;

      if (!email) {
        results.push({ email, status: "failed", message: "Email is required!" });
        continue;
      }

      const userId = generateUniqueId(email); // Generate a unique ID

      try {
        const userItem = {
          id: userId, // Unique ID
          username,
          password,
          name,
          age,
          gender,
          address: `${address}, ${city}, ${state}, ${pincode}`, // Combine address fields
          mobileNumber,
          email,
          createdAt: new Date().toISOString(),
        };

        await container.items.upsert(userItem); // Store user in DB
        results.push({ email, status: "success", userId });
      } catch (error: any) {
        results.push({ email, status: "failed", message: error.message });
      }
    }

    res.status(200).json({ results });
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to retrieve a user by unique ID
router.get("/get", async (req: Request, res: Response): Promise<void> => {
  const { containerName, userId }: { containerName?: string; userId?: string } = req.query;

  if (!containerName || !userId) {
    res
      .status(400)
      .json({ message: "Container name and userId are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);

    const { resources: users } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.id = @id",
        parameters: [{ name: "@id", value: userId }],
      })
      .fetchAll();

    if (users.length === 0) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(users[0]);
  } catch (error: any) {
    console.error("Error retrieving user:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
