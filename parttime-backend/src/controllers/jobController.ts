import { Request, Response } from "express";
import { Job } from "../models/jobModel";
import { addJobToDatabase } from "../services/jobService";
import { getJobsFromDatabase } from "../services/jobService";
import { getJobFromDatabaseById } from "../services/jobService";
import { deleteJobFromDatabaseById } from "../services/jobService";
import { updateJobInDatabaseById } from "../services/jobService";
export const createJob = async (req: Request, res: Response): Promise<void> => {
    try {
      //console.log("Request body received:", req.body);
      const jobData: Job = req.body;
  
      // Set default values
      jobData.status = "active";
      jobData.postedDate = new Date().toISOString();
      jobData.views = 0;
  
      //console.log("Saving job to database...");
  
      // Save the job to the database
      const createdJob = await addJobToDatabase(jobData);
  
      //console.log("Job saved successfully:", createdJob);
  
      // Send response back to client
      res.status(201).json({
        //message: "Job created successfully",
        data: createdJob,
      });
    } catch (error) {
      console.error("Error in createJob:", error);
  
      if (error instanceof Error) {
        res.status(500).json({
          message: "Failed to create job",
          error: error.message,
        });
      } else {
        res.status(500).json({
          message: "Unknown error occurred",
        });
      }
    }
  };
  
  
  export const getJobs = async (req: Request, res: Response): Promise<void> => {
    try {
      // Get query parameters for pagination
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
  
      // Get filters and search keyword
      const location = req.query.location as string | undefined;
      const jobType = req.query.jobType as string | undefined;
      const companyName = req.query.companyName as string | undefined;
      const search = req.query.search as string | undefined; // New search parameter
  
      // Prepare filters
      const filters: { [key: string]: any } = {};
      if (location) filters.location = location;
      if (jobType) filters.jobType = jobType;
      if (companyName) filters.companyName = companyName;
  
      // Fetch jobs using the service
      const jobs = await getJobsFromDatabase({
        page,
        limit,
        filters,
        search, // Pass the search term
      });
  
      res.status(200).json({
        message: "Jobs retrieved successfully",
        data: jobs,
      });
    } catch (error) {
      console.error("Error in getJobs:", error);
  
      res.status(500).json({
        message: "Failed to retrieve jobs",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };
  
  
  export const getJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { location } = req.query; // Ensure location is received
  
      if (!id || !location) {
        res.status(400).json({ message: "Job ID and location (partition key) are required." });
        return;
      }
  
      const job = await getJobFromDatabaseById(id, location as string);
  
      if (!job) {
        res.status(404).json({ message: "Job not found." });
        return;
      }
  
      res.status(200).json({
        message: "Job retrieved successfully",
        data: job,
      });
    } catch (error) {
      console.error("Error in getJobById:", error);
      res.status(500).json({
        message: "Failed to retrieve job",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };
  
  
  
  export const deleteJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
  
      //console.log("Delete Request Received - ID:", id);
  
      if (!id) {
        res.status(400).json({ message: "Job ID is required." });
        console.log("Error: Job ID missing");
        return;
      }
  
      // Fetch the job to get the location (partition key)
      const existingJob = await getJobFromDatabaseById(id, undefined); // Fetch job without partition key
      if (!existingJob || !existingJob.location) {
        res.status(404).json({ message: "Job not found." });
        console.log("Error: Job not found.");
        return;
      }
  
      const location = existingJob.location;
      //console.log("Using Location (Partition Key) for Deletion:", location);
  
      // Delete the job using the partition key
      const deleteResult = await deleteJobFromDatabaseById(id, location);
      if (!deleteResult) {
        res.status(404).json({ message: "Job not found or already deleted." });
        console.log("Error: Job not found or already deleted.");
        return;
      }
  
      res.status(200).json({ message: "Job deleted successfully." });
      //console.log("Job deleted successfully:", id);
    } catch (error) {
      console.error("Error in deleteJobById:", error);
  
      res.status(500).json({
        message: "Failed to delete job",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };
  
  
  
  
  export const updateJobById = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;
      const { location: newLocation, ...updatedData } = req.body;
  
      console.log("Update Request Received - ID:", id, "New Location:", newLocation);
  
      if (!id) {
        res.status(400).json({ message: "Job ID is required." });
        console.log("Error: Job ID missing");
        return;
      }
  
      // Fetch the existing job to get the current location
      const existingJob = await getJobFromDatabaseById(id, undefined); // Allow query-based fetch
      if (!existingJob) {
        res.status(404).json({ message: "Job not found." });
        console.log("Error: Job not found.");
        return;
      }
  
      // Use new location if provided, otherwise default to the existing job's location
      const location = newLocation || existingJob.location;
      if (!location) {
        res.status(400).json({ message: "Partition Key (location) is required." });
        console.log("Error: Partition Key (location) missing.");
        return;
      }
  
      //console.log("Using Location (Partition Key):", location);
  
      // Update the job in the database
      const updatedJob = await updateJobInDatabaseById(id, location, updatedData);
  
      if (!updatedJob) {
        res.status(404).json({ message: "Job not found or failed to update." });
        console.log("Error: Job not found or failed to update.");
        return;
      }
  
      res.status(200).json({
        message: "Job updated successfully.",
        data: updatedJob,
      });
      //console.log("Job updated successfully:", updatedJob);
    } catch (error) {
      console.error("Error in updateJobById:", error);
  
      res.status(500).json({
        message: "Failed to update job",
        error: error instanceof Error ? error.message : "Unknown error occurred",
      });
    }
  };
  