
export interface Application {
  id: string;
  jobId: string;
  jobLocation: string; // Partition key
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  resume?: string; // URL or base64 string
  coverLetter?: string;
  applicationDate: string;
  status: "submitted" | "under-review" | "accepted" | "rejected";
}
