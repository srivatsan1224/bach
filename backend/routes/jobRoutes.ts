import express, { Request, Response } from "express";
import { createJob, getAllJobs, getJobById, updateJob, deleteJob } from "../services/jobService";
import { validateJobCreation, validateJobUpdate } from "../middlewares/validateJob";

const router = express.Router();

// Create a new job
router.post("/", validateJobCreation, async (req: Request, res: Response) => {
  try {
    const job = await createJob(req.body);
    res.status(201).json({ message: "Job created successfully", job });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Get all jobs with optional filtering
router.get("/", async (req: Request, res: Response) => {
  try {
    const { location, type, salaryMin, salaryMax } = req.query;
    const filters = {
      location: location as string,
      type: type as string,
      salaryMin: salaryMin ? parseInt(salaryMin as string) : undefined,
      salaryMax: salaryMax ? parseInt(salaryMax as string) : undefined,
    };
    const jobs = await getAllJobs(filters);
    res.status(200).json(jobs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", getJobs);

// Get job by ID
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const jobId = req.params.id;
        const job = await getJobById(jobId);

        if (!job) {
            res.status(404).json({ message: "Job not found" });
            return;
        }

        res.json(job);
    } catch (error) {
        console.error("Error fetching job by ID:", error);
        res.status(500).json({ message: "Error fetching job" });
    }
});

// Create new job
router.post("/", validateJob, createJob);
// Update job
router.put("/:id", validateJobUpdate, async (req: Request, res: Response) => {
  try {
    const updatedJob = await updateJob(req.params.id, req.body);
    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job updated successfully", job: updatedJob });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Delete job
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const success = await deleteJob(req.params.id);
    if (!success) {
      return res.status(404).json({ message: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;