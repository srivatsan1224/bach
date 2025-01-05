import { container } from "../utils/dbClient";
import { Job } from "../models/jobModel";
interface GetJobsParams {
    page: number;
    limit: number;
    filters: {
      location?: string;
      jobType?: string;
      companyName?: string;
    };
  }
export const addJobToDatabase = async (job: Job): Promise<Job> => {
  try {
    //console.log("Adding job to container:", job);

    // Explicitly type the response from container.items.create()
    const response = await container.items.create(job);
    const createdJob = response.resource;

    if (!createdJob) {
      throw new Error("Failed to create job in the database.");
    }

    //console.log("Job successfully added to the database:", createdJob);
    return createdJob as Job; // Type assertion to match the Job interface
  } catch (error) {
    console.error("Error in addJobToDatabase:", error);
    throw error; // Re-throw for the controller to handle
  }
};
export const getJobsFromDatabase = async ({
    page,
    limit,
    filters,
    search,
  }: {
    page: number;
    limit: number;
    filters: { [key: string]: any };
    search?: string; // Optional search parameter
  }): Promise<any[]> => {
    try {
      const querySpec: any = {
        query: "SELECT * FROM c WHERE 1=1",
        parameters: [],
      };
  
      // Add filters to the query
      Object.entries(filters).forEach(([key, value]) => {
        if (key === "location") {
          // Partial match for location
          querySpec.query += ` AND CONTAINS(c.${key}, @${key}, true)`; // Case-insensitive match
          querySpec.parameters.push({ name: `@${key}`, value });
        } else {
          // Exact match for other filters
          querySpec.query += ` AND c.${key} = @${key}`;
          querySpec.parameters.push({ name: `@${key}`, value });
        }
      });
  
      // Add search functionality
      if (search) {
        querySpec.query += ` AND CONTAINS(c.title, @search, true)`; // Case-insensitive search
        querySpec.parameters.push({ name: "@search", value: search });
      }
  
      // Add pagination
      querySpec.query += ` OFFSET @offset LIMIT @limit`;
      querySpec.parameters.push(
        { name: "@offset", value: (page - 1) * limit },
        { name: "@limit", value: limit }
      );
  
      const { resources } = await container.items.query(querySpec).fetchAll();
      return resources;
    } catch (error) {
      console.error("Error in getJobsFromDatabase:", error);
      throw error;
    }
  };
  
  
  
  export const getJobFromDatabaseById = async (
    id: string,
    partitionKey?: string // Optional partition key
  ): Promise<Job | null> => {
    try {
      //console.log("Fetching Job - ID:", id, "Partition Key:", partitionKey);
  
      let response;
  
      // If partition key is provided, fetch with it
      if (partitionKey) {
        response = await container.item(id, partitionKey).read();
      } else {
        // If partition key is not provided, use a query to find the job
        const query = {
          query: "SELECT * FROM c WHERE c.id = @id",
          parameters: [{ name: "@id", value: id }],
        };
  
        const { resources } = await container.items.query(query).fetchAll();
        response = resources.length > 0 ? resources[0] : null;
      }
  
      if (!response) {
        console.log("Error: Job not found in database for ID:", id);
        return null;
      }
  
      //console.log("Fetched Job from database:", response);
      return response as Job;
    } catch (error) {
      console.error("Error in getJobFromDatabaseById:", error);
      throw error;
    }
  };
  
  
  export const deleteJobFromDatabaseById = async (id: string, location: string): Promise<boolean> => {
    try {
      //console.log("Deleting job - ID:", id, "Partition Key (Location):", location);
  
      const { resource } = await container.item(id, location).delete(); // Pass both id and partition key
      //console.log("Job deleted successfully:", resource);
  
      return true; // Job successfully deleted
    } catch (error) {
      console.error("Error deleting job:", error);
      return false; // Deletion failed
    }
  };
  

  export const updateJobInDatabaseById = async (
    id: string,
    location: string,
    updatedData: Partial<Job> // Partial allows passing only fields to update
  ): Promise<Job | null> => {
    try {
      //console.log("Updating Job - ID:", id, "Location:", location, "Updated Data:", updatedData);
  
      // Fetch the item and update it
      const { resource: existingJob } = await container.item(id, location).read();
  
      if (!existingJob) {
        console.log("Error: Job not found in database for ID:", id);
        return null;
      }
  
      const updatedJob = { ...existingJob, ...updatedData }; // Merge existing and new data
      const { resource: result } = await container
        .item(id, location) // Partition key is location
        .replace(updatedJob);
  
      //console.log("Job successfully updated:", result);
      return result;
    } catch (error) {
      console.error("Error in updateJobInDatabaseById:", error);
      return null;
    }
  };
  
  