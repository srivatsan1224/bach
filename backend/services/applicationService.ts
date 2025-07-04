
import { Container } from "@azure/cosmos";
import { cosmosClient } from "../utils/dbClient";
import { Application } from "../models/applicationModel";
import { getJobFromDatabaseById } from "./jobService";

const databaseId = "ParttimeJobs";
const containerId = "Applications";

let applicationContainer: Container;

const initializeContainer = async (): Promise<Container> => {
  if (!applicationContainer) {
    const { database } = await cosmosClient.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({
      id: containerId,
      partitionKey: { paths: ["/jobLocation"] }
    });
    applicationContainer = container;
  }
  return applicationContainer;
};

export const submitApplication = async (applicationData: {
  jobId: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resume?: string;
  coverLetter?: string;
}): Promise<Application> => {
  try {
    const container = await initializeContainer();
    
    // Get job details to extract location for partition key
    const job = await getJobFromDatabaseById(applicationData.jobId);
    if (!job) {
      throw new Error("Job not found");
    }

    const newApplication: Application = {
      id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      jobId: applicationData.jobId,
      jobLocation: job.location, // Use job location as partition key
      applicantName: applicationData.applicantName,
      applicantEmail: applicationData.applicantEmail,
      applicantPhone: applicationData.applicantPhone,
      resume: applicationData.resume,
      coverLetter: applicationData.coverLetter,
      applicationDate: new Date().toISOString(),
      status: "submitted"
    };

    const { resource } = await container.items.create(newApplication);
    return resource as Application;
  } catch (error) {
    console.error("Error in submitApplication service:", error);
    throw error;
  }
};
