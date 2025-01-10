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
        name,
        email,
        mobileNumber,
        password,
      } = user;

      if (!name || !email || !mobileNumber || !password) {
        results.push({
          email: email || "N/A",
          status: "failed",
          message: "Name, email, mobile number, and password are required!",
        });
        continue;
      }

      const userId = generateUniqueId(email); // Generate a unique ID

      try {
        const userItem = {
          id: userId, // Unique ID
          name,
          email,
          mobileNumber,
          password,
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
// API to handle login with email and password
// API to handle login with email and password
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { containerName, email, password }: { containerName: string; email: string; password: string } = req.body;

  if (!containerName || !email || !password) {
    res.status(400).json({ message: "Container name, email, and password are required!" });
    return;
  }

  try {
    const container = await getContainer(containerName);

    // Query the user by email
    const { resources: users } = await container.items
      .query({
        query: "SELECT * FROM c WHERE c.email = @email",
        parameters: [{ name: "@email", value: email }],
      })
      .fetchAll();

    if (users.length === 0) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    const user = users[0];

    // Check if the password matches
    if (user.password !== password) {
      res.status(401).json({ message: "Invalid password!" });
      return;
    }

    res.status(200).json({
      message: "Login successful!",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// API to add an item to the cart
router.post("/add-to-cart", async (req: Request, res: Response) => {
  const { containerName, userId, product } = req.body;

  if (!containerName || !userId || !product) {
      res.status(400).json({ message: "Container name, userId, and product are required!" });
      return;
  }

  try {
      const container = await getContainer(containerName);

      // Query the user by userId
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

      const user = users[0];
      const cart = user.cart || [];
      cart.push(product);

      // Update the user's cart
      await container.item(user.id, user.email).replace({ ...user, cart });

      res.status(200).json({ message: "Product added to cart successfully!" });
  } catch (error: any) {
      console.error("Error adding to cart:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

router.post("/google-login", async (req: Request, res: Response) => {
  const { containerName, user } = req.body;

  if (!containerName || !user || !user.email || !user.name) {
      res.status(400).json({ message: "Container name and valid user details (email, name) are required!" });
      return;
  }

  try {
      const container = await getContainer(containerName);

      // Check if the user already exists
      const { resources: existingUsers } = await container.items
          .query({
              query: "SELECT * FROM c WHERE c.email = @email",
              parameters: [{ name: "@email", value: user.email }],
          })
          .fetchAll();

      if (existingUsers.length > 0) {
          // User already exists, return their details
          res.status(200).json({ message: "Login successful!", user: existingUsers[0] });
          return;
      }

      // Create a new user document
      const userId = generateUniqueId(user.email); // Generate a unique ID
      const newUser = {
          id: userId,
          name: user.name,
          email: user.email,
          picture: user.picture || "", // Optional profile picture
          createdAt: new Date().toISOString(),
      };

      // Insert the new user into the database
      await container.items.create(newUser);

      res.status(200).json({ message: "User created successfully!", user: newUser });
  } catch (error: any) {
      console.error("Error during Google login:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
});



export default router;
