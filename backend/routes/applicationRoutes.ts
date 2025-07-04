
import express, { Request, Response } from "express";
import { submitApplication } from "../services/applicationService";

const router = express.Router();

// Submit application
router.post("/", async (req: Request, res: Response) => {
  try {
    const application = await submitApplication(req.body);
    res.status(201).json({ 
      message: "Application submitted successfully", 
      application 
    });
  } catch (error: any) {
    console.error("Error in application submission:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
