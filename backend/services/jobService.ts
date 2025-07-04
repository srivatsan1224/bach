
import { Container } from "@azure/cosmos";
import { cosmosClient } from "../utils/dbClient";
import { Job } from "../models/jobModel";

const databaseId = "ParttimeJobs";
const containerId = "Jobs";

let jobContainer: Container;

const initializeContainer = async (): Promise<Container> => {
  if (!jobContainer) {
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ["/location"] }
    });
    jobContainer = container;
  }
  return jobContainer;
};

export const createJob = async (jobData: Omit<Job, "id" | "postedDate">): Promise<Job> => {
  try {
    const container = await initializeContainer();
    const newJob: Job = {
      id: `job_${Date.now()}`,
      postedDate: new Date().toISOString(),
      ...jobData,
    };
    const { resource } = await container.items.create(newJob);
    return resource as Job;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const getAllJobs = async (filters?: {
  location?: string;
  type?: string;
  salaryMin?: number;
  salaryMax?: number;
}): Promise<Job[]> => {
  try {
    const container = await initializeContainer();
    let querySpec = {
      query: "SELECT * FROM c ORDER BY c.postedDate DESC",
      parameters: [] as any[]
    };

    if (filters) {
      const conditions: string[] = [];
      
      if (filters.location) {
        conditions.push("CONTAINS(LOWER(c.location), LOWER(@location))");
        querySpec.parameters.push({ name: "@location", value: filters.location });
      }
      
      if (filters.type) {
        conditions.push("c.type = @type");
        querySpec.parameters.push({ name: "@type", value: filters.type });
      }
      
      if (filters.salaryMin) {
        conditions.push("c.salary >= @salaryMin");
        querySpec.parameters.push({ name: "@salaryMin", value: filters.salaryMin });
      }
      
      if (filters.salaryMax) {
        conditions.push("c.salary <= @salaryMax");
        querySpec.parameters.push({ name: "@salaryMax", value: filters.salaryMax });
      }

      if (conditions.length > 0) {
        querySpec.query = `SELECT * FROM c WHERE ${conditions.join(" AND ")} ORDER BY c.postedDate DESC`;
      }
    }

    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw error;
  }
};

export const getJobById = async (jobId: string): Promise<Job | null> => {
  try {
    const container = await initializeContainer();
    const querySpec = {
      query: "SELECT * FROM c WHERE c.id = @jobId",
      parameters: [{ name: "@jobId", value: jobId }]
    };
    const { resources } = await container.items.query(querySpec).fetchAll();
    return resources.length > 0 ? resources[0] : null;
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    throw error;
  }
};

export const updateJob = async (jobId: string, updateData: Partial<Job>): Promise<Job | null> => {
  try {
    const container = await initializeContainer();
    const existingJob = await getJobById(jobId);
    
    if (!existingJob) {
      return null;
    }

    const updatedJob = { ...existingJob, ...updateData, id: jobId };
    const { resource } = await container.item(jobId, existingJob.location).replace(updatedJob);
    return resource as Job;
  } catch (error) {
    console.error("Error updating job:", error);
    throw error;
  }
};

export const deleteJob = async (jobId: string): Promise<boolean> => {
  try {
    const container = await initializeContainer();
    const existingJob = await getJobById(jobId);
    
    if (!existingJob) {
      return false;
    }

    await container.item(jobId, existingJob.location).delete();
    return true;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw error;
  }
};

export const getJobFromDatabaseById = getJobById;
